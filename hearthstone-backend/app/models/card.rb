class Card < ApplicationRecord
    def self.find_by_class(className)
        self.where(player_class: className)
    end
end
