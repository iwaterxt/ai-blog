---
title: MoE 负载均衡：从 Aux Loss 到最优分配
date: 2026-03-15
category: 大模型
tags: [MoE, 负载均衡, 优化, 稀疏激活]
summary: 探讨 MoE 架构中的核心问题——负载均衡，从辅助损失方法到 DeepSeek 的 Loss-Free 方案，最后给出最优分配的统一视角。
---

# MoE 负载均衡：从 Aux Loss 到最优分配

## MoE 的核心矛盾

Mixture of Experts（MoE）通过稀疏激活机制，在保持参数总量的同时降低计算成本：

$$
y = \sum_{i=1}^{N} G_i(x) \cdot E_i(x)
$$

其中 $G_i(x) \in \{0, 1\}$ 是门控函数，选择性激活第 $i$ 个 Expert。

**核心问题**：如果所有 token 都集中激活少数 Expert，会导致：
- 计算负载不均衡
- Expert 利用率低
- 部分 Expert 训练不足（称为 "Expert collapse"）

## 方法一：Aux Loss

最经典的方法，在主损失函数外添加辅助损失：

$$
\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{main}} + \lambda \cdot \mathcal{L}_{\text{aux}}
$$

Aux Loss 的目标是鼓励每个 Expert 被激活的概率接近平均值 $k/N$。

**缺点**：
- 超参 $\lambda$ 难调
- STE（Straight-Through Estimator）引入次优梯度
- 可能干扰主损失优化

## 方法二：Loss-Free（DeepSeek）

DeepSeek 提出的新思路，不再依赖正则项，而是将负载均衡建模为**等式约束下的优化问题**：

$$
\max_{x_{ij} \in \{0,1\}} \sum_{i,j} x_{ij} s_{ij} \quad \text{s.t.} \quad \sum_i x_{ij} = \frac{mk}{n}
$$

其中 $s_{ij}$ 是 token $i$ 对 Expert $j$ 的亲和度分数。

## 方法三：动态激活

最近的一些工作（如 ours: AttnRes）探索了动态调整激活 Expert 集合的思路，不再要求每个 token 固定激活 $k$ 个 Expert，而是让模型自适应决定。

## 对比总结

| 方法 | 优点 | 缺点 |
|------|------|------|
| Aux Loss | 实现简单，理论清晰 | 超参敏感，梯度次优 |
| Loss-Free | 无超参，梯度精确 | 实现复杂 |
| 动态激活 | 更灵活 | 仍在探索中 |

负载均衡是 MoE 落地的关键工程问题，值得持续关注。
