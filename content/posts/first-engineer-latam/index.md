---
title: "Engineering Culture & Leadership"
date: 2024-01-25
author: "Oscar Armas"
description: "Establishing engineering best practices, building internal tools, and contributing to staff-level technical decisions."
tags: ["leadership", "Staffing", "Design Systems"]
category: "leadership"
context: "LexisNexis · Leadership"
metric: "1st"
metric_unit: "ML Engineer"
---

As the first ML Engineer in the region, I quickly adapted to the team and became one of the trusted voices in technical decision-making.

## Bridging the Gap

Joining as the first engineer for LATAM, my initial goal was simple:  
**prove the level of software quality and delivery we could achieve from the region**... and we did.

---

## First Task: Deploying a Ray Serving PoC

My first assignment was to **deploy a PoC using Ray Serve**.  
Not a bad starting point, especially considering that the long-term goal was to standardize all deployments on Kubernetes.

Luckily, we had a dedicated team managing our EKS clusters, so I focused on designing the ideal workflow:

![Kuberay for ML inference & Processing](kuberay-inference.png)

With this setup, we were able to support both **bulk distributed inference** for heavy processing and **real-time inference** for customer-facing services.

During the second iteration, we added **Airflow integration** for bulk processing, enabling idempotent pipelines with clearer orchestration.

**Most challenging parts:**
- Cold starts of new nodes during autoscaling  
- Managing and observing failures when a worker node died suddenly  

---

## Second Task: Deploying NLP Classification & NER Services

We needed to ship two ML/NLP services:  
- Document Classification  
- Named Entity Recognition (NER)

Before touching any infrastructure, I evaluated **cost**, **traffic patterns**, and **deployment options** using the platforms available to us:

- Amazon SageMaker  
- AWS Lambda  
- ECS Fargate  
- KubeRay (Kubernetes)  
- Triton Inference Server  

As usual, data scientists prefer not to think much about infra, and the moment “NLP” is mentioned, everyone assumes *“this needs GPUs”*.  
Spoiler: **it didn’t**.

### My decision matrix
1. Expected traffic patterns  
2. Whether traffic was continuous 24/7  
3. CPU vs GPU requirements and whether the models were even optimized for GPU  
4. Artifact size and model type  

### Final outcome
Everyone initially wanted KubeRay…  
but we ended up deploying everything on **AWS Lambda**.

The models were lightweight some literally installable via `pip` so we shipped **fast, cheap, fully serverless inference**.

But it didn’t end there.

Because these services were **customer-facing**, we redesigned our Lambda deployment approach to make it:
- fully standardized  
- reproducible  
- aligned with SRE requirements  

→ **“Lambda Deployment Best Practices”** (internal doc)

---

## Third Task: Improving Hiring for Mid/Senior Engineers

Part of my role involved rethinking how we evaluated Data Scientists, ML Engineers, and Data Engineers.  

I iterated on a new framework focused on:
- real-world engineering maturity  
- problem-solving in modern ML systems  
- MLOps fundamentals  
- RAG and distributed systems  

Not leetcode tricks... **actual engineering**.

→ **“How to Hire Senior Engineers”** (playbook)

---

## Fourth Task: Hackathons & Internal Tools

### **AI Medusa**
A chatbot designed to guide DS/engineers on how to deploy
