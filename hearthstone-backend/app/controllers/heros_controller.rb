class HerosController < ApplicationController
    def index
        heros = Hero.all
        render json: heros, except: [:updated_at, :created_at]
    end

    def show
        hero = Hero.find_by(id: params[:id])

        if hero
            render json: hero, except: [:updated_at, :created_at]
        else
            render json: { message: "Hero not found" }
        end
    end
end