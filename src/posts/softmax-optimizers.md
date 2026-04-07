---
title: Softmax 优化器：从 softmax 到归一化梯度
date: 2026-03-20
category: 优化器
tags: [优化器, softmax, 归一化, 梯度]
summary: 深入分析 Muon 优化器的核心——msign 函数，探讨矩阵形式的 softmax 梯度与 Newton-Schulz 迭代的关系。
---

# Softmax 优化器：从 softmax 到归一化梯度

## 从向量到矩阵

在深度学习中，优化器的本质是梯度下降。在参数空间 $\Theta$ 中，我们希望找到：

$$
\theta^* = \arg\min_{\theta} \mathcal{L}(\theta)
$$

标准 SGD 的更新规则为：

$$
\theta_{t+1} = \theta_t - \eta_t \nabla \mathcal{L}(\theta_t)
$$

但对于矩阵参数（如线性层的权重 $W \in \mathbb{R}^{m \times n}$），简单地按坐标下降可能不是最有效的方式。

## msign 函数

Muon 优化器的核心运算是 **矩阵符号函数** msign。对于对称矩阵 $M = G G^T$，有：

$$
M = U \Sigma U^T, \quad \text{msign}(M) = U \cdot \text{diag}(\text{sign}(\sigma_i)) \cdot U^T
$$

直观上，msign 找到矩阵的"主特征向量方向"，并将对应特征值投影到 $\pm 1$。

## Newton-Schulz 迭代

直接计算 msign 需要 SVD，代价较高。Newton-Schulz 迭代提供了一种高效近似：

$$
X_{k+1} = \frac{1}{2} X_k (3I - X_k^T X_k)
$$

初始 $X_0 = G / \|G\|_F$，迭代数次后 $X_k \approx \text{msign}(GG^T)$。

## 代码实现

```python
def newton_schulz_iterate(G, num_iter=5):
    """Fast msign approximation via Newton-Schulz iteration."""
    X = G / (G.norm() + 1e-8)
    I = torch.eye(G.shape[0], device=G.device)
    for _ in range(num_iter):
        X = 0.5 * X @ (3 * I - X.T @ X)
    return X
```

## 稳定性分析

为什么 Muon 有效？从三个稳定性指标来看：

1. **前向稳定性**：$\|Wx\|_2 / \|x\|_2 = \Theta(1)$
2. **依赖稳定性**：$\|W(x_1 - x_2)\|_2 / \|x_1 - x_2\|_2 = \Theta(1)$
3. **更新稳定性**：$\|W\Delta\| / \|\Delta\| = \Theta(1)$

Muon 的梯度方向恰好满足矩阵参数的最速下降方向定义。
