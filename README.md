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



## JavaScript Deliverable

### Overview

I completely implemented the Whack-a-Plaque game logic in the JavaScript. Additionally, username and score data is stored in the page. When you navigate, you will still see your username at the top, and your score will be the same on the score page. Additionally, I added placeholders that mimic what API's and websockets will do.

### Functionality

   - The whack-a-plaque game logic was completely implemented and is entirely playable. Random teeth will pop up and add to your score when they are clicked. A wonderful end-game sequence shows up to signify a win. Play and reset buttons are fully functional.
   - Username and score data is stored in the JS database, which will later be replaced.
   - Username is stored and displayed right below "Whack-A-Plaque" on the top of the screen.
   - Database data, like username and scores, are stored and injected into the DOM.
   - Localstorage is used, so users can change pages and still have their data saved. You can see this with the username at the top, and the score on the scores page.
   - The top of the page has changing mock API and WebSocket calls.


## Services Deliverable

### Overview
The website now uses node.js. I added backend endpoints that updates scores and returns scores. I also added functionality to a fact generator API, which generates trivia about teeth.

### Functionality
   - Node.js/Express HTTP Service: Implemented
   - Static middleware for frontend: Implemented
   - Calls to third party endpoints: Implemented; see "Fun Fact" on "About" page
   - Backend service endpoints: I did services and Login together, so all of the MongoDB stuff is fully implemented right now.
   - Frontend calls service endpoints: Used fetch in login.js, play.js, and scores.js

## DB/Login Deliverable

### Overview
All data is stored on MongoDB. User data is stored, even when a user logs out and leaves the page. Score data is updated.

### Functionality
   - Supports new user registration: New users can register if a username is not taken
   - Supports existing user authentication: Returning users can log in with their password and access their pre-existing score data
   - Stores application data in MongoDB: Implemented
   - Stores and retrieves credentials in MongoDB: Implemented
   - Restricts application functionality based upon authentication: "Play" and "Scores" pages are not accessible unless user is logged in


## WebSocket Deliverable

### Overview
The WebSocket displays when some new user has brushed their teeth (AKA won a game).

### Functionality
   - Backend listens for WebSocket connection: Implemented (see in index.js and peerProxy.js)
   - Frontend makes WebSocket connection: Implemented (see in general.js)
   - Data send over WebSocket connection: The username of a winning player is sent in play.js, processed in peerProxy.js, and received in general.js
   - WebSocket data displayed in the application interface: See the top of the page, under either "Please log in" or "Logged in as {username}". The element underneath will immediately be updated via Websocket with the last player who won a game.


## React Deliverable

### Overview
Whack-A-Plaque is NOT as beautiful as it was before the React update, BUT it does entirely function while using (nearly) entirely jsx files and a React framework: Gameplay, WebSockets, MongoDB, and all.

### Functionality
   - Bundled using Vite: Implemented
   - Multiple functional react components: Everything is functional that was functional on the previous website
   - React router: Used in app.jsx to route the entire page
   - React hooks: Used nearly everywhere, especially in play.jsx. useState, useEffect, and useRef are used all throughout the website.

