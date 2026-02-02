---
title: "Kubernetes Commands – Practical Reference Guide"
weight: 1
description: "A concise kubernetes reference guide covering daily commands, workflows, and recovery patterns"
date: 2026-01-30
layout: "topic-content"
---

## 🚀 1. Getting Started with Kubectl

---

To begin using Kubernetes via the command line, you'll need:

- Access to your cluster via `kubeconfig` or enterprise login (e.g., SSO or oc CLI).
- A namespace/project to operate in.

```bash
# Log in to your cluster (company-specific methods may vary)
kubectl config use-context <cluster-context-name>

# Alternatively, using OpenShift CLI (for OpenShift users)
oc login <cluster-url>
oc project <namespace-name>
```

> If you’re unsure how to authenticate in your organization, consult internal platform team docs or your DevOps admin.

---

## 🔄 2. Restarting Kubernetes Pods

---

You can restart a pod by deleting it. Kubernetes (via ReplicaSet/Deployment) will automatically recreate it.

```bash
kubectl login <cluster> # login to the cluster, may vary as per organisation usage
oc project <namespace> # get into the name space using the below command, may vary as per organisation usage

# Step 1: Switch to correct namespace
kubectl config set-context --current --namespace=<your-namespace>

# Step 2: Get pod list
kubectl get pods

# Step 3: Delete the specific pod (restarts it)
kubectl delete pod <pod-name>
```

> 💡 No need to restart the entire deployment — just delete the crashing pod.

---

## 3. Common Kubernetes Commands

---

A practical reference table of daily-use kubectl and oc commands:

| #   | Command                                          | Description                                                                                      |
| --- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| 1   | `kubectl config use-context <context>`           | Switches to the specified cluster context                                                        |
| 2   | `kubectl get namespaces`                         | Lists all namespaces in the cluster                                                              |
| 3   | `oc project <namespace>`                         | (OpenShift) Switches to a specific namespace/project                                             |
| 4   | `kubectl get pods`                               | Lists all pods in the current namespace                                                          |
| 5   | `kubectl get deployments`                        | Lists all deployments in the namespace                                                           |
| 6   | `kubectl get deployment <name> -o yaml`          | Retrieves detailed YAML configuration of a deployment                                            |
| 7   | `kubectl get configmaps`                         | Lists all ConfigMaps in the namespace                                                            |
| 8   | `kubectl describe deployment <name>`             | Detailed description of deployment, including events and image details                           |
| 9   | `kubectl top pods --namespace <namespace>`       | Shows real-time CPU/memory usage of pods in the given namespace (metrics-server must be enabled) |
| 10  | `kubectl describe resourcequotas -n <namespace>` | Describes any enforced quota limits for that namespace                                           |

---

## 4. Resource Monitoring – Metrics Query (Prometheus)

---

To get detailed memory usage across pods in a namespace using Prometheus:

```promql
sum(
  container_memory_working_set_bytes{
    job="kubelet",
    metrics_path="/metrics/cadvisor",
    cluster="",
    namespace="d12345",
    container!="",
    image!=""
  }
) by (pod)
```

> 🔎 This PromQL query aggregates memory usage (working_set_bytes) by pod in a given namespace.

## ✅ Next Steps

- Learn how to create deployments and services
- Explore Helm for package management
- Setup kubectl aliases for productivity
- Investigate ArgoCD for GitOps-based deployment
