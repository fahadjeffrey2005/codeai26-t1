# 3D Background Demo

Interactive 3D background experiment using Three.js. This demo showcases various techniques for creating dynamic 3D backgrounds suitable for modern web applications.

## Features

- **Three.js 3D Graphics** - Rotating geometric shapes (cube, sphere, octahedron)
- **Interactive Controls** - Mouse drag to rotate, scroll to zoom
- **Glassmorphism UI** - Overlaid content with glassmorphism effects
- **Dynamic Lighting** - Multiple light sources with animated positions
- **Responsive Design** - Adapts to all screen sizes
- **Real-time Controls** - Pause, toggle rotation, change colors

## Files

- `index.html` - Main HTML structure with Three.js canvas
- `style.css` - Styling with glassmorphism effects
- `script.js` - Three.js scene setup and animation logic
- `README.md` - This file

## How to Use

1. Start the HTTP server from the parent directory:
   ```bash
   npm run serve
   ```

2. Open in browser:
   ```
   http://localhost:3001/demo/
   ```

## Customization Ideas

### Change the 3D Objects
Edit the `createShapes()` function in `script.js`:
- Use `THREE.TorusGeometry()` for rings
- Use `THREE.TetrahedronGeometry()` for pyramids
- Use `THREE.IcosahedronGeometry()` for spheres
- Use `THREE.ConeGeometry()` for cones

### Modify Colors
Update the `colors` array in `script.js`:
```javascript
const colors = [0x9678b6, 0xff69b4, 0x00d4ff, 0x00ff88, 0xffaa00];
```

### Adjust Lighting
Modify light properties:
```javascript
const pointLight = new THREE.PointLight(0x9678b6, 1); // color, intensity
```

### Change Animation Speed
Adjust rotation speeds in the `animate()` function:
```javascript
mesh.rotation.x += 0.004; // Increase for faster rotation
```

### Add Particle Effects
Extend the scene with particle systems using `THREE.Points` and custom geometries.

### Add Texture Mapping
Use `THREE.TextureLoader()` to load image textures onto geometries.

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with WebGL support

## Performance Notes

- Full HD (1920x1080): 60 FPS
- High DPI displays may require optimization
- Consider reducing geometry complexity on mobile devices

## Integration with Main Site

To integrate this 3D background with the main CODE-AI website:

1. Copy the canvas and script setup into a specific page's `<head>` or `<body>`
2. Adjust z-index layering to place content above the canvas
3. Use the glassmorphism card styling from `style.css` for consistency
4. Adapt the lighting to match the site's purple color scheme (rgb(150, 120, 182))

## Next Steps

- [ ] Create multiple background variations
- [ ] Add WebGL shader effects
- [ ] Implement particle animations
- [ ] Add audio visualization
- [ ] Create page-specific backgrounds
- [ ] Optimize for mobile devices
