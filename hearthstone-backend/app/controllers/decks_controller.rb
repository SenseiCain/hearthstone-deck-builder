class DecksController < ApplicationController
    def create
        render json: { message: 'success' }
    end
end