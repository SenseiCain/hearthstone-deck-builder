class HerosController < ApplicationController
    def show
        hero = Hero.find_by(params[:id])
        render json: hero
    end
end