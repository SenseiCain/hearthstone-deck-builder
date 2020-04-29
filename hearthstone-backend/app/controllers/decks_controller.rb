class DecksController < ApplicationController
    def create
        req_data = JSON.parse(request.body.read)
        cards = req_data.map{|obj| Card.find_by(card_id: obj["card_id"])}
        deck = Deck.new
        deck.cards << cards
        
        if deck.save
            render json: {message: 'success'}
        else
            render json: { message: 'failure' }
        end
    end
end