class Deck < ApplicationRecord
    has_and_belongs_to_many :cards

    validate :validate_deck

    def validate_deck
        # Need to add validations for:
            # Only two copies of regular cards
            # Only one copy of legendary cards
            # Only one deck with same name & card combo
            
        if self.cards.length != 30
            errors.add(:length, "Must have 30 cards")
        end
    end
end
