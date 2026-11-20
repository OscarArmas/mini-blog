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

Building a PoC is not the hard part anymore. With AI tools, almost anyone can put together an app with a frontend and a backend in a couple of days: AI workflows, evaluation tools, chats, agents, internal experiments.

The hard part is what comes next. Somebody has to deploy it.

And that’s where the problems start:

- Services that stay on with nobody using them.
- Access to internal resources that nobody reviewed.
- Demos that are still alive months later, with no owner.

So as the person responsible for infrastructure, my question is simple: how do I let people experiment fast without paying for it later?

---

## The Problem

Imagine Ana, a data scientist with a working demo on her laptop. She needs a private URL for two weeks to show it to her team.

If I send her through the production process, the demo is old before it’s live. If I let her deploy however she wants, I get a new forgotten service every week.

These are the questions I want answered for every PoC:

- Does it follow our SRE and security rules?
- How long will it live?
- When does it need to be on? Most PoCs don’t need nights or weekends.
- Which internal resources does it need?
- What can it share with other PoCs?
- What happens after? If it works, do we delete it or move it to a formal service?

This looks a lot like any container auto-deploy system. The mechanics are the same. The difference is the lifecycle: a PoC is less demanding than production, it shares resources by default, and it’s supposed to disappear.

---

## The First Version: One Stack per PoC

I ask the user for a short descriptor: name, port, health check path, CPU, memory and scaling. That’s it.

A deploy needs three inputs:

- The descriptor.
- A container image pinned by digest, not by a tag that can change.
- The version of the infrastructure template.

The result is one stack per PoC. Each one has its own image, its own stack and its own private URL, and it deploys without touching the others. Below that there is a shared foundation that is deployed once: roles, network access to existing dependencies, and the domain automation.

The deploy doesn’t care where the code comes from. The app can live in the same repo or be built somewhere else and only hand over an image. That second mode is designed, but I haven’t exercised it yet.

Today there are two PoCs running like this on ECS Express Mode and Fargate, sharing the network and the load balancer.

![How a PoC gets its own private URL](architecture.png)

---

## What AWS Gives You, and What I Had to Add

A lot of what looks like platform work is already done by Express Mode. From an image it creates the service, the load balancer with HTTPS, the routing rules, autoscaling, logs and a canary deployment with a rollback alarm. It also reuses the same load balancer for services in the same network, up to 25 according to the docs, with no extra charge on top of the resources.

So what was left for me?

- **A real name.** Express gives you a generated URL. To give each PoC a name under the internal domain, a small function adds that name to the load balancer rule, attaches the certificate, and removes it when the stack is deleted.
- **A contract.** The descriptor means teams don’t need to understand the template.
- **Shared identity.** Roles and the security group live in the foundation, so nobody creates them per app.
- **Consistent tags.** All tags come from one identifier and are declared only at the stack level. Declaring them on the service too made the deploy fail with duplicated keys.

One detail I wish I knew before starting: the first service you create in a network defines the subnets of the shared load balancer, and the next ones have to match. Pick the wrong subnets on the first one and you delete it and start again.

---

## Scope Decisions: What I Left Out on Purpose

I kept the pilot small on purpose. These are the decisions, and how I’ll evaluate each one.

**Deploy isolation first, data isolation later.** The pilot proves that each app deploys and retires without affecting the others. Data access today is network-only and shared. Per-app credentials are a requirement before accepting any PoC with real data.

**Scheduling is a cost hypothesis, not a feature.** At list prices, the shared load balancer costs about the same as the compute of two small services, and it doesn’t turn off at night. Spoiler: with two PoCs, night shutdown saves very little. It only makes sense with more apps, so before building it I’ll measure three things: whether the service can reach zero tasks, what happens when you deploy while it’s off, and how long it takes to come back.

**Being off has a user cost.** A request outside the schedule gets an error, because nothing wakes the service when traffic arrives. That’s fine for a demo and not for a formal service, so the schedule will be optional per app.

**The custom domain modifies a managed resource.** I chose it because it’s the simplest way to give each app an internal name. The risk is that this behavior isn’t documented, so the rule is reapplied on every new image deploy and the generated URL stays as a fallback.

**The success metric is adoption, not deployment.** Two running apps prove the design. It becomes a platform the day another team, or their agent, deploys without my help in less than half a day.

---

## Built for Agents Too

There is one more reason I like this approach, and it’s not about cost.

Most PoCs today are written with coding agents. They are very good at writing the app. They are not good at knowing how *your* company deploys things.

And that’s not a model problem. It’s a context problem.

In a big company the knowledge is everywhere: repositories, documentation, pipelines, tracing, deployment systems. No agent has all of that, and probably never will. A big part of an engineer’s job today is pointing the agent to the right place.

A platform changes the question. The agent doesn’t need to understand our network, our roles, our DNS or our tagging rules. It needs to read one README and fill one descriptor with about ten fields.

Here’s what that means in practice:

- **Less context to load.** One contract instead of ten systems.
- **Rules in the template, not in the prompt.** An agent can’t forget to make the service private, because the descriptor doesn’t let it choose.
- **Same path for people and agents.** If a new engineer can follow the guideline, an agent can too.

I haven’t tested this yet. The next experiment is simple: give an agent only the README and the descriptor, and see if it can deploy a new PoC without me.

So we stop teaching every agent how the company works. We build the safe path once and let them follow it.

---

## Final Thoughts

1. Start with the contract: one descriptor, one image, one template version.
2. Share what is boring: network, load balancer, roles.
3. Keep separate what is risky: data access and credentials.
4. Give every PoC an owner and an end date.
5. Write the guideline so an agent can follow it.

Number four is the real difference with a production pipeline. Production assumes things live forever. A PoC should be born with an expiration date, and retire on its own if nobody renews it.

The goal isn’t to build another CI/CD system. It’s to make experiments cheap to start and easy to kill.
