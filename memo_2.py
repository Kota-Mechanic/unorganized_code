# python

# try 1
from datetime import datetime

Date = [
    {
      "createdAt": "2022-05-23T18:09:37",
      "balance": 1000000
    },
    {
      "createdAt": "2022-05-23T14:18:39",
      "balance": 1000000
    },
    {
      "createdAt": "2022-05-23T11:43:55",
      "balance": 90
    },
    {
      "createdAt": "2022-05-18T12:18:33",
      "balance": 2000000
    },
    {
      "createdAt": "2022-05-18T12:17:58",
      "balance": 10000000
    },
    {
      "createdAt": "2022-05-10T12:08:10",
      "balance": 79086
    },
    {
      "createdAt": "2022-05-10T12:07:14",
      "balance": 1111
    },
    {
      "createdAt": "2022-05-02T11:28:03",
      "balance": 13200
    },
    {
      "createdAt": "2022-04-21T11:47:08",
      "balance": 3000
    },
    {
      "createdAt": "2022-04-21T11:46:16",
      "balance": 6800
    },
    {
      "createdAt": "2022-04-21T11:33:26",
      "balance": 6000
    },
    {
      "createdAt": "2022-04-21T11:22:37",
      "balance": 5000
    },
    {
      "createdAt": "2022-04-21T11:21:48",
      "balance": 8000
    },
    {
      "createdAt": "2022-04-21T11:18:39",
      "balance": 7000
    }
  ]

for i in Date:
    now = datetime.strptime(i['createdAt'], "%Y-%m-%dT%H:%M:%S")
    i['createdAt'] = now.strftime(("%Y-%m-%d"))

result = {}

for i in Date:
    total = result.get(i['createdAt'], 0) + i['balance']
    result[i['createdAt']] = total

DateNew = []

for attr, value in result.items():
    DateNew.append({'createdAt':attr,'balance':value})

print(DateNew)

""" output
[
  {
    'createdAt': '2022-05-23',
    'balance': 2000090
  },
  {
    'createdAt': '2022-05-18', 
    'balance': 12000000
  },
  {
    'createdAt': '2022-05-10', 
    'balance': 80197
  },
  {
    'createdAt': '2022-05-02', 
    'balance': 13200
  },
  {
    'createdAt': '2022-04-21', 
    'balance': 35800
  }
]
"""

"""
the result should be the above output, but the problem is 
what I want to do is to sum the balance per day using some loop like:
time = now - 24hr
time2 = 48hr ago - 24hrs ago
time3 = 72hr ago - 48hrs ago
then, I want to go through the history to the end from the beginning
but the problem is how to let that loop.... so please help me
"""