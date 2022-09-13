import numpy as np
import plotly
import plotly.graph_objects as go
import plotly.offline as pyo
from plotly.offline import init_notebook_mode

init_notebook_mode(connected=True)
x = np.random.randint(low=1, high=50, size=150)*0.1
y = np.random.randint(low=1, high=50, size=150)*0.1
fig = go.Figure(data=go.Scatter(x=x, y=y, mode='markers'))

fig.show()
