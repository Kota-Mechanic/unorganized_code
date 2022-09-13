li= [
    "2022-05-18T12:18:33"[0:10],
    "2022-05-23T10:20:00"
]
print(li[:1])

a = 0
b = 24
s =[]

for i in range(10):
    a += 24
    b += 24
    q = [{"createdAt"}, b, a]
    s.append(q)

print(s)
s = {'k1': 1, 'k2': 2, 'k3': 3}
d = dict([('k1', 1), ('k2', 2), ('k3', 3)])
print(d, s)

import calendar
cal = calendar.Calendar()
month = 5

for day in cal.itermonthdays(2022, month):
    if day != 0:
        print(str(s), day)