import React, { Component } from 'react';
import Main from './components/Main'
import './App.css'

function showStatus(online) {
  const statusEl = document.querySelector('.network-status');

  if (online) {
    statusEl.classList.remove('warning');
    statusEl.classList.add('success');
    statusEl.innerText = `You're online! 😄`;
  } else {
    statusEl.classList.remove('success');
    statusEl.classList.add('warning');
    statusEl.innerText = `You're offline! 😢`;
  }
}

window.addEventListener('load', () => {
  // 1st, we set the correct status when the page loads
  navigator.onLine ? showStatus(true) : showStatus(false);

  // now we listen for network status changes
  window.addEventListener('online', () => {
    showStatus(true);
  });

  window.addEventListener('offline', () => {
    showStatus(false);
  });
});

class App extends Component {
  render() {
    return (
        <div>
        <span className="network-status blink"></span>
        <Main role="application" />

        </div>
    );
  }
}

export default App;
