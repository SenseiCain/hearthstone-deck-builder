class Card < ApplicationRecord
    def self.find_by_class(className)
        # TODO - retuning 10 cost in between 1 & 2
        self.where(player_class: className).order(:cost, :name)
    end
end
