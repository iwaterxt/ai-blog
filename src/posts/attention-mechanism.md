---
title: Attention Is All You Need 解读
date: 2026-03-28
category: 深度学习
tags: [attention, transformer, NLP]
summary: 详细解读 Transformer 架构的核心——Multi-Head Attention，从点积注意力出发，完整推导 Q、K、V 的意义与代码实现。
---

# Attention Is All You Need 解读

## 背景

2017年，Google 在论文《Attention Is All You Need》中提出了 Transformer 架构，彻底摒弃了 RNN/LSTM 的序列建模方式，仅用 Attention 机制就实现了 SOTA 效果。

## 点积注意力

Attention 的核心是 Scaled Dot-Product Attention：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

其中 $Q, K, V$ 分别代表 Query、Key、Value 矩阵。

### Q、K、V 的直观理解

可以这样形象地理解：

- **Query（查询）**：当前位置想要查询的内容
- **Key（键）**：每个位置的"索引标签"
- **Value（值）**：每个位置的原始信息

attention 分数就是 Query 和 Key 的匹配程度，然后根据这个分数对 Value 加权求和。

## Multi-Head Attention

单头注意力只能捕捉一种关联模式。多头注意力将其扩展：

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

其中 $\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$

## 代码实现

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x):
        B, T, C = x.size()
        q = self.W_q(x).view(B, T, self.num_heads, self.d_k).transpose(1, 2)
        k = self.W_k(x).view(B, T, self.num_heads, self.d_k).transpose(1, 2)
        v = self.W_v(x).view(B, T, self.num_heads, self.d_k).transpose(1, 2)

        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.d_k)
        attn = F.softmax(scores, dim=-1)
        out = torch.matmul(attn, v)

        return self.W_o(out.transpose(1, 2).contiguous().view(B, T, C))
```

## 总结

Transformer 的成功证明了：**全局建模 + 可并行 = 强大且高效**。Attention 机制让模型能够自由地建立任意位置之间的依赖关系，这是 RNN 的最大局限。

下一篇我们将探讨 **Layer Normalization** 在 Transformer 中的关键作用，以及 Pre-Norm vs Post-Norm 的实践差异。
