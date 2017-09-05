---
layout: post
title: The effects of normalizing input on gradient descent
author: Rodrigo Silveira
---


# The effects of normalizing input on gradient descent

The following experiment explores the effects that normalizing the training data (as well as subsequent input used in inference) has on gradient descent. The common advice has been to normalize the input so that gradient descent converges faster. While I believe what has been said about it, I'm not sure I understand why this is.


```python
%matplotlib inline
import matplotlib.pyplot as plt
```


```python
X = [4, 8, 15, 16, 23, 42]
plt.plot(X)
```




    [<matplotlib.lines.Line2D at 0x108a6cda0>]




![png](/images/notebook/normalizing_input/output_2_1.png)



```python

```
