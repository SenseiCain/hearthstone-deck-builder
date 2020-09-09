# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_29_000217) do

  create_table "cards", force: :cascade do |t|
    t.string "card_id"
    t.string "dbf_id"
    t.string "name"
    t.string "card_set"
    t.string "card_type"
    t.string "rarity"
    t.integer "cost"
    t.string "player_class"
    t.string "img"
    t.string "mechanics"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "race"
  end

  create_table "cards_decks", id: false, force: :cascade do |t|
    t.integer "deck_id", null: false
    t.integer "card_id", null: false
  end

  create_table "deck_cards", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "decks", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "heros", force: :cascade do |t|
    t.string "card_id"
    t.string "dbf_id"
    t.string "name"
    t.string "player_class"
    t.string "img"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
