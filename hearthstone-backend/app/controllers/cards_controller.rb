class CardsController < ApplicationController
    def index
        cards = Card.all[0..3]
        render json: cards
    end
end