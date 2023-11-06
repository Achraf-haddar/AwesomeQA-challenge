import json

file_path = "data/awesome_tickets.json"

with open(file_path) as json_file:
    data = json.load(json_file)

print(data["messages"][0])
