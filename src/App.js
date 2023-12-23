import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const delayRef = useRef(0);
  const [delay, setDelay] = useState(0);
  const [frameQueue, setFrameQueue] = useState([]);
  const [usingFrontCamera, setUsingFrontCamera] = useState(false);

  useEffect(() => {
    delayRef.current = delay;
    setFrameQueue([]); // Clear frameQueue when delay changes
  }, [delay]); // Update delayRef and clear frameQueue whenever delay changes

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
  }, [usingFrontCamera]); // Re-run effect when usingFrontCamera changes

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
      data[i] = 255 - data[i];       // Invert Red
      data[i + 1] = 255 - data[i + 1]; // Invert Green
      data[i + 2] = 255 - data[i + 2]; // Invert Blue
    }
    console.log("Inverted colors:", data.slice(0, 10)); // Log first few pixels
  };  

  const flipCamera = () => {
    setUsingFrontCamera(prev => !prev);
  };

  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      <div className="controls">
        <label htmlFor="delayInput">Delay (frames): </label>
        <input
          id="delayInput"
          type="number"
          value={delay}
          onChange={e => setDelay(Number(e.target.value))}
          min="0"
        />
        <button onClick={flipCamera}>Flip Camera</button>
      </div>
      <div>
        
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline // This is important for iOS devices
        className="videoElement"
        style={{ zIndex: 1 }} // Ensure it has a higher z-index
      ></video>
      <canvas ref={canvasRef} style={{ zIndex: 2 }} className="canvasElement"></canvas>
    </div>
  );
}

export default App;