import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.scss';
import { Analytics} from '@vercel/analytics/react';

import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx'
import ScrollToTop from './components/multiPageComponents/scrollToTop.jsx';


//DEV FUNCTION to get firebase url
function getFromFirebase(path) {
  const storage = getStorage();
  getDownloadURL(ref(storage, path))
    .then((url) => {
      console.clear();
      console.log(url);
      return;
    });
};

//function for when a button is hovered over
export function buttonExpand(id) {
  
  //desktop button
  if (!isMobile()) {

    //edit the styles of the button
    const button = document.getElementById(id+'button');
    button.classList.add('expanded');
  
    //make the text slide in from the left
    const text = document.getElementById(id+'title');
    text.classList.add('inMiddle')
  
    //make the arrow spin in
    const arrow = document.getElementById(id+'arrow');
    arrow.classList.add('shown')
  
    //wait until the mouse is no longer over the button and then reset all styles
    button.onmouseleave = () => {
      button.classList.remove('expanded');
      text.classList.remove('inMiddle');
      arrow.classList.remove('shown');
    };
  }

  //mobile button
  else {
    //edit the styles of the button
    const button = document.getElementById(id+'button');
    button.classList.add('expanded');

    //make the text slide in from the left
    const text = document.getElementById(id+'title');
    text.style.marginLeft = '50%';

    //make the dividor line spin in
    const dividor = document.getElementById(id+'divider');
    setTimeout(() => {
      dividor.style.opacity = 1.0;
      setTimeout(() => {
        dividor.style.transform = 'scale(10, 5)';
      }, 250)
    }, 500);

    //wait until the mouse is no longer over the button and then reset all styles
    button.onmouseleave = () => {
      button.classList.remove('expanded');
      text.style.marginLeft = '25%';
      setTimeout(() => {
        dividor.style.visibility = 'hidden';
        dividor.style.transform = 'unset';
        setTimeout(() => {
          dividor.style.visibility = 'visible';
        }, 400);
      }, 750);
    };
  }
};

//function to show "loading..." if content has not yet loaded
export function renderIfLoaded(content) {
  return content ? content : 'loading...';
};

//mobile detection script
export function isMobile () {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  if (windowHeight > windowWidth) {
    sessionStorage.setItem('mobile', true);
  }
  else {
    sessionStorage.setItem('mobile', false);
  };
  return windowHeight > windowWidth ? true : false;
};

//function to convert a string out of camel case
export function convertOutOfCamelCase(stringToConvert) {
  let str = stringToConvert.charAt(0).toUpperCase() + stringToConvert.slice(1);
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return str;
};

//function for sending a message to the payment discord
export function sendToDiscord(message) {

  //create a discord webhook session
  const request = new XMLHttpRequest();
  request.open("POST", process.env.REACT_APP_DISCORD_WEBHOOK_URL);
  
  //define the data being sent to the discord bot
  request.setRequestHeader('Content-Type', 'application/json');
  const messageJSON = {
      content: message
  };
  
  //send the message
  request.send(JSON.stringify(messageJSON));
};

//conditionally import the mobile styles
isMobile() === true ? import('./mobileStyles.scss') : <></>;

//initialise local and session storage
if (!sessionStorage.getItem('loggedIn')) {
  sessionStorage.setItem('loggedIn', 'false');
};

//add an event listener for when the window is resized for automatic mobile site toggling
window.onresize = function() {
  if((window.innerHeight > window.innerWidth && sessionStorage.getItem('mobile') == 'false') || (window.innerHeight < window.innerWidth && sessionStorage.getItem('mobile') == 'true')) {
    //change the site type
    window.location.reload();
  };
};

//attempt to log in the user
if (localStorage.getItem('hunterPCsAccountCredentials') && sessionStorage.getItem('loggedIn') != 'true') {
    const creds = JSON.parse(localStorage.getItem('hunterPCsAccountCredentials'));
    const auth = getAuth();
    signInWithEmailAndPassword(auth, creds.email, creds.password)
      .then((userCreds) => {
        sessionStorage.setItem('loggedIn', 'true');
        setTimeout(() => {
          window.location.reload();
        },  100);
    })
  
    .catch((error) => {
  
        //if the user entered the incorrect login details
        console.error('Automatic login error: '+error.message);
    });
};

//Now load the page header, footer and content
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.Fragment>
      <ScrollToTop/>
      <div id="header">
        <Header/>
      </div>

      <div id="content" style={isMobile() ? {marginTop: '25px'} : {marginTop: '100px'}}>
        <Content/>
      </div>

      <div id="footer">
        <Footer/>
      </div>

      <Analytics/>
    </React.Fragment>
  </BrowserRouter>
);
