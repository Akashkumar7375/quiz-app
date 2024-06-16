import React, { useEffect, useState } from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const checkFullScreen = () => {
    if (
      document.fullscreenElement 
     
    ) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  const requestFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } 
  };

  useEffect(() => {
    checkFullScreen();
    document.addEventListener('fullscreenchange', checkFullScreen);
    

    return () => {
      document.removeEventListener('fullscreenchange', checkFullScreen);
      
    };
  }, []);

  return (
    <div className="App">
      {!isFullScreen && (
        <div className="fullscreen-prompt">
          <h2>Please enable full screen to start the quiz.</h2>
          <button onClick={requestFullScreen}>Enable Full Screen</button>
        </div>
      )}
      {isFullScreen && <Quiz />}
    </div>
  );
}

export default App;