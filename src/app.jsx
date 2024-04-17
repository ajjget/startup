import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`); // initialize websocket. used also on play.js
      socket.onopen = (event) => {
        lastWinner = localStorage.getItem('socketNotification');
        setMessage(lastWinner || "Winners will have their name displayed here!");
      };
      socket.onclose = (event) => {
        setMessage("Socket closed.");
      };
      socket.onmessage = async (event) => {
        const eventContent = JSON.parse(await event.data.text());
        const newMessage = `${eventContent.player} has just brushed their teeth!`
        setMessage(newMessage);
        localStorage.setItem('socketNotification', newMessage);
      };
      socket.onerror = (error) => {
        console.error("WebSocket error: ", error);
        setMessage("WebSocket encountered an error.");
      };
      return () => {
        socket.close();
      };
  }, []);

  // display message on the websocket spot at the top of the page

    
  loadUsername();

  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>Whack-A-Plaque<sup></sup></h1>
          <div className='general_text' id="username_place">Logged in as {userName || "Please login!"}</div>
          <div className='general_text' id="websocket_place">{message}</div>
          <nav>
            <menu>
            <li>
                <NavLink className='page-options' to='index'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className='page-options' to='about'>
                  About
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink className='page-options' id="playButton" to='play'>
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink className='page-options' id="scoresButton" to='scores'>
                    Scores
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/play' element={<Play userName={userName} />} />
          <Route path='/scores' element={<Scores />} />
          <Route path='/about' element={<About />} />
          <Route path='/index' element={<Index />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div>
            <span className='name'>Andrea Gettys</span>
            <a className='text-reset' href='https://github.com/ajjget/startup'>
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
