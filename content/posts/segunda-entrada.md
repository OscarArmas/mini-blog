---
title: "Building the MLOps Platform"
date: 2024-01-20
author: "Oscar Armas"
description: "Designing a centralized platform to standardize machine learning deployments across the organization using Databricks and Terraform."
tags: ["platform", "mlops", "infrastructure"]
category: "platform"
context: "Platform · MLOps"
metric: "0→1"
metric_unit: "Zero to One"
---

Building a platform from scratch is about standardization and developer experience.

## The Problem

Every data science team was deploying models differently. Some used Flask on EC2, others used Lambda, and some were just running notebooks manually.

## The Solution

We built a centralized platform on top of Databricks and AWS.

### Key Components

1.  **Feature Store**: Centralized feature definitions using Feast.
2.  **Model Registry**: MLflow for versioning and stage management.
3.  **Deployment Pipelines**: GitHub Actions + Terraform to provision serving infrastructure automatically.

```hcl
module "inference_service" {
  source = "./modules/inference"
  
  model_name = "fraud-detection"
  version    = "v2.1.0"
  min_instances = 2
  max_instances = 10
}
```

This reduced the "time-to-production" from weeks to hours.
