require 'json'

json_file = File.read('./db/cards.json')
json_data = JSON.parse(json_file)

heros_data = json_data["heros"][0..2]
cards_data = json_data["cards"][0..2]



# "cardId": "HERO_09",
# "dbfId": "813",
# "name": "Anduin Wrynn",
# "cardSet": "Basic",
# "type": "Hero",
# "faction": "Neutral",
# "rarity": "Free",
# "health": 30,
# "collectible": true,
# "playerClass": "Priest",
# "img": "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_09.png",
# "imgGold": "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/HERO_09_premium.gif",
# "locale": "enUS"

heros_data.each do |obj|
    Hero.create(
        card_id: obj["cardId"],
        dbf_id: obj["bdfId"],
        name: obj["name"],
        player_class: obj["playerClass"],
        img: "https://art.hearthstonejson.com/v1/render/latest/enUS/512x/#{obj["cardId"]}.png"
    )
end