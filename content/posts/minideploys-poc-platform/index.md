---
title: "MiniDeploys: Shipping PoCs Without Turning Them Into Infrastructure Projects"
date: 2026-11-19
weight: 1
author: "Oscar A"
description: "How I deploy short-lived internal PoCs on a shared foundation: one descriptor, one stack per app, and guidelines that people and coding agents can follow."
tags: ["Platform Engineering", "AWS", "AI"]
categories: ["platform"]
images: ["architecture.png"]
context: "Platform · PoCs"
home_section: "architecture"
home_order: 1
metric: "PoC"
metric_unit: "One Descriptor"
---

We are all using AI now. We have plenty of tools to generate apps and PoCs in a very simple and fast way, and people like data scientists, ML engineers and even product people are starting to program applications or want to run their own tests. For many of these tests, the pages that ChatGPT or Claude generate are enough, because they are static sites and they work pretty well to share inside an organization.

But then there is the other side: the PoCs that need services, databases and internal resources, and that many times people outside the infrastructure area want to deploy.

In the company where I work we started to see a good number of projects that needed databases and running instances behind a load balancer. The problem? Many of these people, even with agents, can’t deploy services in a secure way, because inside the company there are a lot of acceptance and security criteria before deploying anything, PoC or formal service. And we end up with these problems:

- Orphan services that nobody deletes.
- A bunch of roles and stacks duplicated across all the tests.
- A lot of time lost, error after error, creating the stacks and passing all the acceptance criteria, which of course an agent can’t catch on the first try.

![Three PoCs, each with its own load balancer and database, and nobody using them](before.png)

So as the person responsible for infrastructure, **how do I make sure people can experiment fast without spending so many resources?**

---

## The Problem

We have some points in mind for every PoC:

- Follow the SRE and security rules.
- How long it will live.
- When it has to be on. Many PoCs don’t need to run every day or on weekends.
- Which internal resources it needs.
- Deploy in a cost-efficient way.
- Whether it can share resources with other PoCs.

And after the deploy, how do we keep control? If the PoC does its job, do we delete the resources or move it to a formal service?

Basically it’s very similar to a container auto-deploy system, but less demanding and with some advantages: we can share resources, and a PoC is meant to disappear.

---

## Why Not Let the AI Do Everything?

Someone could tell me: we have AI, let it do everything. The detail is that these AIs don’t know our internal libraries or our internal criteria.

That’s why the proposal is to build a platform, or a guide as defined as possible, to solve these deploys only once, and then give the agents a simplified guide of how to deploy.

The platform is in charge of abstracting all these steps. Here I focus on the architecture of the proposal. Every company has its own requirements, but the architecture is very similar.

---

## The First Version: One Stack per PoC

What I’d call the PoC Platform needs basically three things: containers, shared resources and a shared base infrastructure.

The responsibility of the agent or the user is now only two things: a container image, and a file with the requirements of the PoC. For example:

```yaml
kind: PocService
metadata:
  name: hello-poc
spec:
  runtime:
    port: 8080
    healthCheckPath: /health
    cpu: '256'
    memory: '512'
  scaling:
    minTasks: 1
    maxTasks: 2
  resources:
    - type: documentdb
```

We have two PoCs running on Fargate today. Say the first one is mine and you’re bringing up the second. My app is already serving traffic, so there’s a load balancer sitting there that you can use too. There’s one detail for whoever sets up the platform. ECS Express Mode needs your service in the same subnets as that balancer. If you’re the person who just came here to try a demo, why would I send you off to find the subnet IDs? We already know which ones to use.

Now you’ve changed your app and want to try the new container. Go ahead, give your deploy the new image digest or tag. My demo can carry on running. We keep the code for both images in a monorepo at the moment, so it’s easy to assume they have to go out together. They have separate stacks. We’re also trying out separate repos, which means pointing each deploy at the image its team built over there.

![How a PoC gets its own private URL](architecture.png)

Once your service is up you can already open the address Express Mode gives you. So what’s that function doing in the diagram? That’s for the address we actually want to send to people, the one under our company domain. On every image deploy the CloudFormation stack runs a function to add our name to the load balancer rule and attach the certificates. Try the address Express gave you afterwards and it still works.

One more thing to look at in the YAML above is the request for DocumentDB. You can ask for a database, or for Redis if your app needs a cache. Each shared service has a stack of its own. Go ahead and delete the stack for `hello-poc` once you’re done with it. Its internal URL goes away along with the certificate configuration for that name. The team using the same database for their own PoC can keep working.

## Access Without Passing Secrets Around

Another thing to take into account: we have to manage the secrets to reach resources like databases.

Today both demos can reach the database over the shared network. Now suppose your team loads some data this week and takes the demo down next week. I need a way to take your app’s access away while the team across from you is still using the database.

Here’s what we’ve been trying with `hello-poc`. Its stack creates a database user and generates the password. When the container starts it gets the password from a secret and signs in with that user. Delete the stack and both the user and the secret are gone. What if you have to show the demo again a week later? Deploy it again. The data you spent time loading the first time is still in the database.

## Do we turn it off on Friday?

With the two PoCs we have now, I’d leave them running. People actually use them on weekends, for one thing. And even if everybody goes home on Friday and we stop both services, we still have a load balancer to pay for on Saturday. As we put more services on it, the compute for all those idle apps starts adding up. Then it’s worth finding out which ones can sleep through the weekend.

What I would like to try even with just two demos is an end date. Put an `expiresAt` tag on the stack and let the person responsible pick the day. A few days before it’s due to shut down, send them an email. Maybe the experiment is finished and we can take it down. Maybe they have one last demo booked for next week (there’s always one more demo). Give them time to renew it.

The test I want to run next needs somebody from another team. Give them the README, show them what goes in the YAML and let them try it with their own service. I’d expect them to have it running pretty quickly. If they have to come looking for me to ask which load balancer to use or how to set up security, I’ve left part of my job in their hands. Then I’d give a coding agent those same instructions and see if it can get a service up by itself.
