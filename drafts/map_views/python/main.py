d = {"a": [1], "b": [2]}
values = d.values()
d["c"] = [3]
d["a"].append(0)
print(values)
