import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const delayRef = useRef(0);
  const [delay, setDelay] = useState(1);
  const [frameQueue, setFrameQueue] = useState([]);
  const [usingFrontCamera, setUsingFrontCamera] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    delayRef.current = delay;
    setFrameQueue([]);
  }, [delay]);

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: usingFrontCamera ? "user" : "environment"
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        requestAnimationFrame(drawFrame);
      })
      .catch(err => {
        console.error("Error accessing the camera:", err);
        setError('Error accessing the camera. Please ensure it is connected and permissions are granted.');
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [usingFrontCamera, delay]);

  const drawFrame = () => {
    if (canvasRef.current && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!video.paused && !video.ended) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        invertColors(imageData);
        frameQueue.push(imageData);
        if (frameQueue.length > delayRef.current) {
          ctx.putImageData(frameQueue.shift(), 0, 0);
        }
      }
      requestAnimationFrame(drawFrame);
    }
  };

  const invertColors = (imageData) => {
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
  };

  const flipCamera = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setUsingFrontCamera(prev => !prev);
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div className="App">
      <div className="controls">
        <label htmlFor="delayInput">Delay (frames): </label>
        <input
          id="delayInput"
          type="number"
          value={delay}
          onChange={e => setDelay(Number(e.target.value))}
          min="0"
        />
        <button onClick={flipCamera} disabled={isFlipping}>
          {isFlipping ? 'Flipping...' : 'Flip Camera'}
        </button>
      </div>
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="videoElement"
          style={{ transform: isFlipping ? 'rotateY(180deg)' : 'none' }}
        ></video>
        <canvas 
          ref={canvasRef} 
          className="canvasElement"
          style={{ transform: isFlipping ? 'rotateY(180deg)' : 'none' }}
        ></canvas>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
