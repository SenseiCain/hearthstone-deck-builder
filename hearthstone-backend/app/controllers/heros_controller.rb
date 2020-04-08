class HerosController < ApplicationController
    def show
        hero = Hero.find_by(params[:id])
    end
end