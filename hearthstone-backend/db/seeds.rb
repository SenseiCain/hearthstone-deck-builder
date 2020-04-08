require 'json'

json_file = File.read('./db/cards.json')
json_data = JSON.parse(json_file)

heros_data = json_data["heros"]
cards_data = json_data["cards"]

heros_data.each do |obj|
    Hero.create(
        card_id: obj["cardId"],
        dbf_id: obj["dbfId"],
        name: obj["name"],
        player_class: obj["playerClass"],
        img: "https://art.hearthstonejson.com/v1/render/latest/enUS/512x/#{obj["cardId"]}.png"
    )
end

cards_data.each do |obj|
    Card.create(
        card_id: obj["cardId"],
        dbf_id: obj["dbfId"],
        name: obj["name"],
        card_set: obj["cardSet"],
        card_type: obj["type"],
        rarity: obj["rarity"],
        cost: obj["cost"],
        player_class: obj["playerClass"],
        img: "https://art.hearthstonejson.com/v1/render/latest/enUS/512x/#{obj["cardId"]}.png",
        mechanics: obj["mechanics"]
    )
end