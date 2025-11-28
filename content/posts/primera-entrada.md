---
title: "Low-Latency Inference at Scale"
date: 2024-01-15
author: "Oscar Armas"
description: "How we architected a high-throughput prediction service handling 200+ RPS with <100ms latency using Go and Triton."
tags: ["mlops", "realtime", "golang"]
category: "realtime"
context: "Rappi · Real-Time"
metric: "<100ms"
metric_unit: "Latency p99"
---

This is a sample post demonstrating the "Real-Time" category style.

## The Challenge

Deploying heavy transformer models for real-time fraud detection requires a robust infrastructure. We needed to serve predictions in under 100ms to avoid blocking the user checkout flow.

### Architecture Choices

We moved from a Python-based Flask service to a high-performance Go gateway communicating with NVIDIA Triton Inference Server via gRPC.

```go
func (s *Server) Predict(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    // High-performance gRPC call to Triton
    resp, err := s.tritonClient.Infer(ctx, modelName, inputs)
    if err != nil {
        return nil, fmt.Errorf("inference failed: %w", err)
    }
    return processResponse(resp), nil
}
```

## Results

- **Latency**: Reduced p99 from 450ms to 85ms.
- **Throughput**: Increased capacity by 4x with the same hardware.
- **Cost**: Reduced compute costs by 30%.

This architecture became the standard for all real-time ML services in the company.
