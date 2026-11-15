# Interactive 3D Product Configurator & Viewer

A high-performance, responsive 3D interactive viewer built with React, React Three Fiber (R3F), Three.js, and Leva. Designed as part of an advanced frontend engineering capstone project.

## 🚀 What Was Built
- **Real-Time 3D Rendering:** Staged lighting, contact shadows, and environment presets (`city`, `sunset`, `studio`) rendering a custom optimized 3D asset (`chicken.glb`).
- **Interactive Micro-Interactions:** Click-to-scale mesh response, floating hover tooltips, and smooth OrbitControls.
- **Dynamic Customization:** Real-time material color overrides, wireframe toggles, and auto-rotation settings via an integrated control panel.
- **Mobile & Accessibility Optimizations:** Touch gestures fine-tuned (`enablePan={false}` to preserve vertical page scrolling), automatic Device Pixel Ratio capping (`dpr={[1, 2]}`), and lazy-loaded canvas wrappers with graceful low-power and `prefers-reduced-motion` fallbacks.

## 📊 Performance Notes (FE-10 Lens)
- **Model Size & Compression:** The raw 3D model was optimized using `@gltf-transform` with **Draco mesh compression**, reducing the asset size significantly below the 1.5 MB performance budget.
- **Bundle Splitting:** Heavy 3D libraries (Three.js and R3F) are isolated via `React.lazy()`. The core app bundle remains lightweight (~432 kB), while the 3D engine chunk loads asynchronously only when requested.
- **Frame Rate Protection:** Capping the device pixel ratio to `max 2` prevents high-density Retina and mobile displays from over-rendering pixels, maintaining a stable 60 FPS without heating up mobile GPUs.

## 🔮 What I’d Add With More Time
- **Snapshot Export:** A button allowing users to capture and download a PNG screenshot of their customized 3D configuration.
- **Part Swapping:** Expanded component hierarchy to swap out specific sub-meshes or accessories dynamically.
- **WebXR / AR Mode:** Augmented reality integration allowing users to place the model in their physical room via mobile browsers.