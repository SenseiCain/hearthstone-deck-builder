# Hearthstone Deck Builder

This is an SPA that allows users to build decks for the popular Blizzard game, Hearthstone. The application is compromised of a standalone Rails API, and a front end webpage written in Vanilla JS. The API currently serves information on Cards, and Heros included in the current rotation of the game.

## Screenshot

<img src="https://raw.githubusercontent.com/SenseiCain/hearthstone-deck-builder/master/screenshot.png" width=500>

## Data Sources

The bulk of my data is coming from [omgvamp's API](https://rapidapi.com/omgvamp/api/hearthstone) hosted on [RapidAPI](https://rapidapi.com/), which sources information directly from [Blizzard](https://develop.battle.net/documentation/hearthstone/game-data-apis). By using this API instead of Blizzard's, I was able to circumvent client-side authorization.

Images are being sourced from [HearthstoneJSON](https://hearthstonejson.com/).

## Getting Started

Currently the application is only available to run locally.

One thing to first note; since the file is structured in a way that allows the Rails backend to act as a standalone API, the root directory for the API should be `./hearthstone-backend`. No commands are needed to be ran from the frontend directory, other than opening `index.html`.

First Fork & Clone this repo, then run the following commands in order from `./hearthstone-backend`.
```
bundle install
rails db:migrate
rails rapidapi:json
rails db:seed
```
The command `rails rapidapi:json` is a custom Rake task that sends a request to RapidAPI, filters through the JSON response, then creates a new JSON file locally that is then used to seed the DB.

Once configured, then you can start your server with `rails s`. Navigate to the `index.html` file in your browser, and you should be up & running!

## Endpoints - Heros

|   Name    |           Path            | HTTP Verb |                     Purpose                     |
| :-------: | :-----------------------: | :-------: | :---------------------------------------------: |
|   Index   |        /heros/            |    GET    |               Displays all heros                |
|   Show    |        /heros/:id         |    GET    |              Displays single hero               |

## Endpoints - Cards

|   Name    |           Path            | HTTP Verb |                     Purpose                     |
| :-------: | :-----------------------: | :-------: | :---------------------------------------------: |
|   Index   |        /cards/            |    GET    |               Displays all cards                |

## Future Goals

Deploy to Heroku.
More endpoints.
Ablity to save decks.
Carousel of images for Hero selection.
UI more in theme with Blizzard.

# Credits

Data - https://rapidapi.com/omgvamp/api/hearthstone

Images - https://hearthstonejson.com/
