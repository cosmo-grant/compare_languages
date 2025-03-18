arr = []

for i in range(3):
    arr.append(lambda : i)

print(arr[0]())
print(arr[1]())
print(arr[2]())
