# Python 
import time
from datetime import datetime, timedelta, timezone

Data_in_return = [
    [],
    [
      "2022-05-23T18:09:37",
      "2022-05-23T14:18:39",
      "2022-05-23T11:43:55"
    ],
    [
      "2022-05-18T12:18:33",
      "2022-05-18T12:17:58"
    ],
    [],
    [
      "2022-05-10T12:08:10",
      "2022-05-10T12:07:14"
    ]
]
    
Data_in_realform_using_string = [
    "[]",
    "[datetime.datetime(2022, 5, 23, 18, 9, 37), datetime.datetime(2022, 5, 23, 14, 18, 39), datetime.datetime(2022, 5, 23, 11, 43, 55)]",
    "[datetime.datetime(2022, 5, 18, 12, 18, 33), datetime.datetime(2022, 5, 18, 12, 17, 58)]",
    "[]",
    "[datetime.datetime(2022, 5, 10, 12, 8, 10), datetime.datetime(2022, 5, 10, 12, 7, 14)]"
]

print(Data_in_realform_using_string)
# what I want to do is to change ["2022-05-23T18:09:37","2022-05-23T14:18:39","2022-05-23T11:43:55"] to ["2022-05-23"]

