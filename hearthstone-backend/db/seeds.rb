require 'json'

json_file = File.read('./db/cards.json')
json_data = JSON.parse(json_file)

heros_data = json_data["heros"][0..2]
cards_data = json_data["cards"][0..2]



# "cardId": "CS2_041",
# "dbfId": "149",
# "name": "Ancestral Healing",
# "cardSet": "Basic",
# "type": "Spell",
# "faction": "Neutral",
# "rarity": "Free",
# "cost": 0,
# "text": "Restore a minion\\nto full Health and\\ngive it <b>Taunt</b>.",
# "flavor": "I personally prefer some non-ancestral right-the-heck-now healing, but maybe that is just me.",
# "artist": "Dan Scott",
# "collectible": true,
# "playerClass": "Shaman",
# "howToGet": "Unlocked at Level 1.",
# "howToGetGold": "Unlocked at Level 15.",
# "img": "http://media.services.zam.com/v1/media/byName/hs/cards/enus/CS2_041.png",
# "imgGold": "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/CS2_041_premium.gif",
# "locale": "enUS",
# "mechanics": [
#     {
#         "name": "Taunt"
#     }
# ]

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