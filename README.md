# START-UP WHACK-A-PLAQUE PROJECT

## Elevator Pitch
Whack-A-Mole is a classic game that has entertained children for generations. Dentists and parents alike want to teach children to brush their teeth daily so they can have good dental hygiene.

The premise of this game is very simple. There is a 3x3 grid of teeth covered in plaque. A toothbrush is used as a mallet to bonk the undesirable teeth back into their place. As the user plays this game, they understand that it is important to brush our teeth to keep them clean. When the player reaches 30 points, the game will end and nine clean teeth will emerge from all the holes. There is no way to lose the game, because the intent is that every player is a winner. Plaque-covered teeth with continue to pop up until 32 points are reached, because most adults have 32 teeth in their mouth.

This game could encourage better hygiene habits from children, and could be played from a browser on a personal computer or simply in the waiting room of a dentist's office.

## Key Features & How They Use Each Technology
HTML will be used for the basic formatting of the website. Text will be used to explain the premise of the game and how it's played. 

CSS will be used to make the game look pretty. I will use it to design the teeth and the toothbrush.

JavaScript will be used to make the game work. It will log points and control when and where the teeth pop up. It will keep track of when the game ends. It will make the toothbrush follow the cursor.

Trivia API will be used to generate tooth-related trivia. The free version allows me to generate 10 facts a day, so the page will rotate through 10 different facts every day.

Websockets will send a message to all players when an increment of 1000 teeth have been cleaned.

## Rough Sketches

This is how Whack-A-Plaque will look midgame.
![Screenshot (203)](https://user-images.githubusercontent.com/112976867/236990774-04c57ea4-3875-4046-aed4-49b0b9bc2a15.png)

This is how Whack-A-Plaque will look upon completion.
![Screenshot (204)](https://user-images.githubusercontent.com/112976867/236990844-57266978-339e-4033-aabe-5d91cf14d9cf.png)

## HTML Deliverable
- HTML pages -- Four HTML pages to accomodate logging in, playing, showing previous plays, and information
- Links -- All of the pages are accessible from one another
- Textual Content -- All of the textual content is input, and there is no 3rd party service required (as this is mentioned nowhere except this assignment and I'm not terribly sure what it means)
- Login -- Placeholder included on home page
- Database data placeholder -- Shown on "scores" page, where number of games played is displayed
- WebSocket realtime communicator -- Shown on all pages, where a notification will be broadcast to all players at the top of the page
- API placeholder -- There will be a tooth fact API that displays random facts at the top of the page



## CSS Deliverable

### Overview

I wanted the website to be reminiscent of the inside of a mouth, as it is a game about brushing teeth. Though pink websites are generally horrible, the pink represents the gums in our mouths and is a fun color for a website aimed at children. Everything is center-aligned because it looks nice.

### Properly Styled CSS
- Header, footer, and main content body -- styled to use themed text colors and fonts. 
- Navigation elements -- styled to mimic other popular webpages, by being centered, spaced apart evenly, and having no underlines.
- Responsive to window resizing -- the navigational elements in the header use flex boxes, so they can respond to window resizing. website can be shifted larger and smaller while maintaining functionality.
- Application elements -- whitespace utilized to break up elements. all elements contrast against the background and are readable.
- Application text content -- consistent fonts.
- Application images -- centered.

### Application Images
![css1](https://github.com/ajjget/startup/assets/112976867/b8cb8b83-3cb0-4642-b603-fc43f1971b83)
![css2](https://github.com/ajjget/startup/assets/112976867/cc525436-9d14-482c-893e-3ef53197ddb1)
![css3](https://github.com/ajjget/startup/assets/112976867/1cf51aee-43cd-4c93-b2c6-2da6ee39a58f)
![css4](https://github.com/ajjget/startup/assets/112976867/86df6582-5c09-4a14-810f-60b1bd80d0a9)

