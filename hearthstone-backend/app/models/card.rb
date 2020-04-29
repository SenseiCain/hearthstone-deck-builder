class Card < ApplicationRecord
    has_and_belongs_to_many :decks

    def self.find_by_class(className)
        self.where(player_class: className).order(:cost, :name)
    end
end
