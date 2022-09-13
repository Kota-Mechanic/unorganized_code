Data = [
    {
      "creatt": "2022-02-28T13:05:24"
    },
    {
      "creat": "2022-02-21T23:49:33"
    },
    {
      "creat": "2022-02-21T11:08:23"
    },
    {
      "creat": "2022-02-19T10:06:46",
      "xxx": [
        "23",
        "1",
        "9"
      ]
    },
    {
      "creat": "2022-01-25T13:12:49",
      "xxx": [
        "2"
      ]
    }
]

def count_total_xxx(data):
    total = {}
    count = 0
    for dt in data:
        if "xxx" in dt:
            count = count + len(dt['xxx'])
    total['total'] = count
    return total

print(count_total_xxx(Data))