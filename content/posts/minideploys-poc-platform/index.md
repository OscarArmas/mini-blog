---
title: "Deploying lot of PoCs without losing control"
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

So how would we solve all this? This is where sharing resources starts to make sense. If we keep giving every PoC its own database, cache and load balancer, every new demo gives us another set of services to look after. What I have in mind is a shared setup that can serve several PoCs at once.

On one side we’d have independent CloudFormation stacks for the resources themselves. A database would have its own stack, Redis would have another, and we’d have a stack for the shared load balancer. Together they’d serve a whole group of PoCs. On the other side we’d have the platform stacks that connect each new PoC to whatever it needs. Say your demo needs a database and an internal domain. The platform would set up access to the database, attach the certificate and tell the shared load balancer where to send requests for that domain.

![How a PoC gets its own private URL](architecture.png)

I’d also like us to be able to schedule when a service starts and when it shuts down. Suppose you bring us a PoC that needs to run for the next three months. You could set the end date when you deploy it and ask for an email when it shuts down, so you know when to renew it if you still need it.

The tricky part is getting the platform to do all of that behind the scenes. If a PoC asks for database access, what creates its user and how does the app get the secret it needs to connect? When another PoC joins the same load balancer, how do we map its domain to the right service? Those are the pieces we have to work out so the next team can bring us a demo and tell us what it needs.
