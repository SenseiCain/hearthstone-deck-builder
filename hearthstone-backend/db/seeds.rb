require 'json'

json_file = File.read('./hearthstone-backend/db/cards.json')
json_data = JSON.parse(json_file)

heros_test = json_data["heros"][0..2]
cards_test = json_data["cards"][0..2]