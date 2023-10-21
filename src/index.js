import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import { Analytics} from '@vercel/analytics/react';

import {getStorage, ref, getDownloadURL} from 'firebase/storage';

import Header from './components/header.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';


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

//function to change the displayed page
export function changePage(newPage) {
  sessionStorage.setItem('currentPage', newPage);
  window.location.reload();
};

//function for when a button is hovered over
export function buttonExpand(id) {

  //edit the styles of the button
  const button = document.getElementById(id+'button');
  button.classList.add('expanded');

  //make the text slide in from the left
  const text = document.getElementById(id+'title');
  text.style.marginLeft = '25%';

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
    text.style.marginLeft = '1px';
    setTimeout(() => {
      dividor.style.visibility = 'hidden';
      dividor.style.transform = 'unset';
      setTimeout(() => {
        dividor.style.visibility = 'visible';
      }, 400);
    }, 750);
  };
};

//function to show "loading..." if content has not yet loaded
export function renderIfLoaded(content) {
  return content ? content : 'loading...';
};

//fadin the page and scroll to top
setTimeout(() => {
  window.scrollTo(0, 0);
  document.body.style.opacity = 1.0;
  document.body.style.visibility = 'visible';
}, 1000);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <div id="header">
      <Header/>
    </div>

    <div id="content" style={{marginTop: '100px'}}>
      <Content/>
    </div>

    <div id="footer">
      <Footer/>
    </div>

    <Analytics/>
  </React.Fragment>
);
