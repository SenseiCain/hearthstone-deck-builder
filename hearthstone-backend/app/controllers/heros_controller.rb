class HerosController < ApplicationController
    def index
        heros = Hero.all
        render json: heros
    end

    def show
        hero = Hero.find_by(id: params[:id])

        if hero
            render json: hero
        else
            render json: { message: "Hero not found" }
        end
    end
end