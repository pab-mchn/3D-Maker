# 2D to 3D Shape & Logo Generator

This project transforms both **SVG vector logos** and **raster images (PNG, JPG)** into dynamic, animated **3D objects** using **React Three Fiber** and **Three.js**.


---

## ✨ Features

- 🖼️ **Image Uploader** for SVG, PNG, JPG, or WebP formats
- 🔷 **SVG to 3D Logo Generator** – Extrudes vector paths into interactive 3D models
- 🧱 **Image to Shape Generator** – Maps raster images onto geometric primitives (Box, Sphere, Pyramid)
- 🔄 Animated preview with rotation
- 🎨 Preserves original colors from SVG (when available)

---

## 🧱 Tech Stack

- **Next.js**
- **Three.js** for 3D rendering
- **@react-three/fiber** for React integration
- **three-stdlib** for SVGLoader
- **Tailwind CSS** for UI styling

---

## 🚀 How to Run

```bash
git clone https://github.com/pab-mchn/3D-Maker.git
cd 3D-Maker

npm install
npm run dev
```

Then open `http://localhost:3000` and start dragging your images!

---

## 🧠 How It Works

| File Type | Action |
|-----------|--------|
| `.svg` | Paths are extruded into 3D shapes with preserved color and grouped into a rotating object |
| `.png`, `.jpg`, `.webp` | Image is applied as a texture on a 3D geometric primitive (box, sphere, pyramid) 
