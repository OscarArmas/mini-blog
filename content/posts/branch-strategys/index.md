---
title: "Branching Strategys and Monorepos"
date: 2024-01-25
author: "Oscar Armas"
description: ""
tags: ["CI/CD", "", "Design Systems"]
category: "leadership"
context: "LexisNexis · Leadership"
metric: "1st"
metric_unit: "ML Engineer"
---

One of the most complex task when you create projects or infreaestrcuture from Zero is defining guidelines for CI/CD

## 

Here I ill going to talk about some of my recommendatios when we work with startups or high entreprises.


Sigle repos: When we put all our code for ou project in ou repository
Mono repos: Mutiple projects live in the same repository


with startups whe usually use one repository for one project, and we put the deployment pipelines, infraestrcuture in the sabe repo, thats the recommendation.
We could ahve something like this

```
some-ai-project
├── .pipelines/              # CI/CD pipelines
│   ├── build.groovy
│   └── deploy.groovy
├── infrastructure/          # IaC
│   └── cloudformation.yaml
├── src/                     # Código fuente
│   ├── __init__.py
│   ├── handler.py           # Lambda entry point
│   ├── classifier.py        # Lógica principal
│   └── config/
│       └── patterns.txt
├── tests/                   # Tests
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_classifier.py
│   └── fixtures/
│       └── *.xhtml
├── azure-pipelines.yml
├── requirements.txt
├── requirements-dev.txt
└── pyproject.toml
```

Lets say we are at startup an we deide to start with the right leg, now we can deploy our model on our infra. the startup start escaling and creciendo, now new enginners going to the team, and now we do KT session to show the code and estructure we manage, so we get something like this:

![Descentrilized Infra for startups](startup_cicd.png)

As we see there are some engineers deploying code an infrestructure directly from the repository..
sound good for iterate fast..

But now what happens when Bob an entry level engineer joing and need to deploy some very simple services for the same project he decided to use lambda for hosting those sevices, but now we he note that we are creating a new repos for just a lambda that will need commits deploy and maybe not much maintance after that, soo he decided to consult the staff engineer abot hit and the staff proposes hi a new wy for manaing this... Monorepo, he propos taking easy this and just creating N folder for number of project you have on your repo, with multiple services for your project, al now other entrey level enginners could start working on the other services

Also we hire some clpud engineers and the start defining some standars an rules for deploying on the cloud, those are basically SRE startndars that all the temas who deplo to cloud neeed to fill.


now we can have somethi like this:

![Monorepo for multiple services](monorepo_01.png)

We are taliing this as a brief resume but each of those diagrams require a lof of effort, and  can manage tousands of projects with out problem if are being implemented, so lets go for the last level, when we are manaign lot of projects we ususally need to euse and define stndards for deploying differnt kind of models, for example we can have 5 teams deploying mdoels on sagmaker, but all of those can be using differnte ways some people can be manage better practices, than the others, so the idea is taht we can generae a define a platform and guidelines for deploying on that startegy, there ala very intersting ways of deploying infraestructure for diffdent kind of models, for example Ray and triton are some of the mos interesints way i have found fo deploying huge infernce services and distributed jobs...

We can define a standar of guidelines , resources and tools for deploying those services
So now we have more requirementes SRE requirements and the requirementes we need for each one of the platforms, for example witch artifacsts and structure we need, how manage S3 structure, rollout strategys, autoscale, monitoring etc... The idea is that we can replicate that platforma for every team or vertical, or using one forthe general company, but this is a relly interesting projects for work:

![Monorepo for multiple services](enterprise_cicd.png)

 really tehre are a los of things we can add to each platform, really really check the image at the end of the post I will post all teh requrements we nned to mnage for deploying lambdas in a ay that could be valid for customer front