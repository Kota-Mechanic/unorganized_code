import numpy as np
import plotly.graph_objects as go
import plotly.offline as pyo
from plotly.offline import init_notebook_mode
 
init_notebook_mode(connected=True)
 
# generating 150 random integers
# from 1 to 50
x = np.random.randint(low=1, high=50, size=150)*0.1
 
# generating 150 random integers
# from 1 to 50
y = np.random.randint(low=1, high=50, size=150)*0.1
 
# plotting scatter plot
fig = go.Figure(data=go.Scatter(x=x, y=y, mode='markers'))
 
fig.write_image("/Users/user/Documents/fig1.jpeg")
