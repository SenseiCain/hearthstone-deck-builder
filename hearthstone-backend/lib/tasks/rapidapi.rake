require 'net/http'
require 'openssl'
require 'json'

namespace :rapidapi  do
    desc "Retrieves data from RapidAPI and generates JSON file"
    task :json => :environment do
        # This is a script that referecenses an API hosted on RapidAPI.
        # The reponse data is filtered & formatted into a manner
        # thats easier to work with. The result of this script is to
        # create a JSON file that is later read & seeded into the DB.

        # DATA - https://rapidapi.com/omgvamp/api/hearthstone/endpoints
        # IMAGES - https://hearthstonejson.com/docs/images.html

        # --- API CALLS ---
        url_info = URI("https://omgvamp-hearthstone-v1.p.rapidapi.com/info")
        url_basic = URI("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards?locale=enUS&collectible=1")

        # Normally I wouldn't include my host/key credentials in an app like this,
        # but being that I primarily made this application to present to potential
        # employers, I figured I'd save you the hastle of creating an account :)
        # Will switch to dotenv once I've deployed to Heroku!
        rapidapi_host = 'omgvamp-hearthstone-v1.p.rapidapi.com'
        rapidapi_key = 'c2e6cd2352mshc152fd4126f9197p1e9892jsne99352339c02'

        http = Net::HTTP.new(url_info.host, url_info.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        # REQUEST INFO
        request_info = Net::HTTP::Get.new(url_info)
        request_info["x-rapidapi-host"] = rapidapi_host
        request_info["x-rapidapi-key"] = rapidapi_key
        info_json = http.request(request_info).read_body
        info_parsed = JSON.parse(info_json) # RUBY DATA

        # REQUEST BASIC SET
        request_basic = Net::HTTP::Get.new(url_basic)
        request_basic["x-rapidapi-host"] = rapidapi_host
        request_basic["x-rapidapi-key"] = rapidapi_key
        basic_json = http.request(request_basic).read_body
        basic_parsed = JSON.parse(basic_json) # RUBY DATA


        # --- DATA FILTERING ---
        # BASIC SET
        basic_heros = []
        basic_cards = []
        basic_parsed["Basic"].each do |hash|
            if hash["type"] == "Hero" && hash["cardSet"] == "Basic"
                basic_heros.push(hash)
            else
                basic_cards.push(hash)
            end
        end

        # CLASSIC SET
        classic_cards = basic_parsed["Classic"]

        # NON CLASSIC SETS THAT MAKE UP STANDARD
        standard_sets = info_parsed["standard"]

        # NON CLASSIC CARDS
        non_classic_cards = []
        basic_parsed.each do |key, value|
            if standard_sets.include?(key) && key != "Basic" && key != "Classic"
                non_classic_cards.push(value)
            end
        end.flatten

        # CREATE HASH
        total_hash = {
            heros: basic_heros,
            cards: [
                basic_cards,
                classic_cards,
                non_classic_cards.flatten
            ].flatten
        }

        # --- WRITE TO JSON FILE ---
        File.open("./db/cards.json", "w+") do |f|
            f.truncate(0)
            f.write(total_hash.to_json)
        end
    end
  end