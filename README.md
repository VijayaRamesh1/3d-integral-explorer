# 3D Integral Explorer

An interactive 3D application to help students intuitively understand integral calculus through visualization and exploration.

## Live Demo

Explore the live application at: [https://VijayaRamesh1.github.io/3d-integral-explorer](https://VijayaRamesh1.github.io/3d-integral-explorer)

## Overview

3D Integral Explorer is an educational tool designed to make integral calculus intuitive and engaging. By visualizing mathematical concepts in 3D space, students can develop a deeper understanding of integrals, areas under curves, volumes of revolution, and their real-world applications.

## Features

- **3D Surface Visualization**: Explore multivariable functions with interactive 3D rendering
- **Area Under Curve Visualization**: Understand definite integrals through visual area representation
- **Educational Explanations**: Access concept-specific mathematical details and applications
- **Critical Point Detection**: Identify and understand key points like maxima, minima, and saddles
- **Interactive Controls**: Modify functions, ranges, and visualization settings in real-time
- **Accessibility Options**: High contrast mode, keyboard navigation, and screen reader support

## Technology Stack

- React for UI components and state management
- Three.js with React Three Fiber for 3D visualization
- MathJS for mathematical calculations
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/VijayaRamesh1/3d-integral-explorer.git

# Navigate to the project directory
cd 3d-integral-explorer

# Install dependencies
npm install

# Start the development server
npm start
```

### Deployment

The application is automatically deployed to GitHub Pages through GitHub Actions whenever changes are pushed to the main branch. If you want to deploy manually:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

## Usage

After starting the application, you'll be presented with the main interface. You can:

1. Select different modes (3D Surface or Area Under Curve) from the top tabs
2. Enter mathematical functions like `sin(x)` or `x^2 + y^2`
3. Click "Visualize" to render the function
4. Rotate, zoom, and pan to explore the visualization
5. Use "Show Explanation" to learn about the mathematical concepts
6. Enable high contrast mode or other accessibility features as needed

## Documentation

Detailed documentation for users and educators is available in the [DOCUMENTATION.md](./DOCUMENTATION.md) file. This includes:

- Comprehensive feature guides
- Mathematical concepts covered
- Lesson plan ideas for educators
- Example functions to explore
- Troubleshooting information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.