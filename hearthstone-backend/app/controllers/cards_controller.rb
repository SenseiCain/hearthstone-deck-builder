class CardsController < ApplicationController
    def index
        if params[:class]
            cards = Card.find_by_class(params[:class])
        else
            cards = Card.all
        end

        render json: cards.order(:cost, :name)
    end
end