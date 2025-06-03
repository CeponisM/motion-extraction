# Motion Extraction App

A React-based web application that captures camera feed and applies real-time visual effects including color inversion and frame delay processing.
Idea found and explained here: https://www.youtube.com/watch?v=NSS6yAMZF78

## Features

- **Real-time Camera Feed**: Access and display live video from device cameras
- **Color Inversion**: Applies a negative/inverted color effect to the video feed
- **Frame Delay**: Configurable delay buffer that shows previous frames with adjustable timing
- **Camera Switching**: Toggle between front-facing and rear-facing cameras
- **Responsive Controls**: Intuitive interface for adjusting delay and camera settings

## Technologies Used

- React 18.2.0
- HTML5 Canvas API
- WebRTC getUserMedia API
- CSS3 for styling and animations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/CeponisM/motion-extraction.git
cd motion-extraction
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

### Basic Operation
1. Grant camera permissions when prompted by your browser
2. The app will automatically start displaying your camera feed with inverted colors
3. Use the controls to customize the experience

### Controls
- **Delay (frames)**: Adjust the number of frames to delay the display (0 = real-time)
- **Flip Camera**: Switch between front and rear cameras (if available)

### Frame Delay Effect
The frame delay creates a "ghost trail" or motion blur effect by showing previous frames. Higher delay values create more pronounced trailing effects, useful for:
- Motion visualization
- Artistic video effects
- Performance analysis
- Creative photography/videography

## Browser Compatibility

The app requires browsers that support:
- WebRTC getUserMedia API
- HTML5 Canvas
- ES6+ JavaScript features

**Supported Browsers:**
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Camera Permissions

The app requires camera access to function. Make sure to:
1. Allow camera permissions when prompted
2. Ensure your camera is not being used by other applications
3. Check browser settings if camera access is blocked

### Key Components

- **Video Element**: Captures live camera feed
- **Canvas Element**: Renders processed frames with effects
- **Frame Queue**: Manages delay buffer for temporal effects
- **Camera Controls**: Handles camera switching and configuration

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm eject` - Ejects from Create React App (irreversible)

### Code Structure

The main application logic handles:
- Camera stream initialization and management
- Real-time canvas rendering loop
- Frame buffering and delay processing
- Color inversion algorithms
- Camera switching with smooth transitions

## Troubleshooting

### Common Issues

**Camera not working:**
- Check browser permissions
- Ensure camera is not in use by another application
- Try refreshing the page
- Check if HTTPS is required (some browsers require secure context)

**Performance issues:**
- Lower the delay value
- Ensure good lighting conditions
- Close other resource-intensive applications

**Camera switching not working:**
- Some devices may only have one camera
- Try different browsers if switching fails

## Technical Details

### Frame Processing
The app uses a queue-based approach to manage frame delays:
1. Captures frames from video stream
2. Applies color inversion to each frame
3. Stores frames in a FIFO queue
4. Displays frames with specified delay

### Color Inversion Algorithm
```javascript
// Inverts RGB values: newValue = 255 - originalValue
data[i] = 255 - data[i];     // Red
data[i + 1] = 255 - data[i + 1]; // Green  
data[i + 2] = 255 - data[i + 2]; // Blue
// Alpha channel remains unchanged
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

Potential features for future development:
- Additional visual effects (blur, edge detection, etc.)
- Recording and export functionality
- Multiple delay channels
- Real-time performance optimization
- Mobile-specific optimizations
- Preset effect configurations
