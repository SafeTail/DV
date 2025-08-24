import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.BufferGeometry()
    const vertices = []
    for (let i = 0; i < 10000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2000)) // x
      vertices.push(THREE.MathUtils.randFloatSpread(2000)) // y
      vertices.push(THREE.MathUtils.randFloatSpread(2000)) // z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const material = new THREE.PointsMaterial({ color: 0xffffff })
    const stars = new THREE.Points(geometry, material)
    scene.add(stars)

    camera.position.z = 5

    const animate = function () {
      requestAnimationFrame(animate)
      stars.rotation.x += 0.0005
      stars.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return (
    <div className={darkMode ? "bg-black text-yellow-400 min-h-screen" : "bg-white text-black min-h-screen"}>
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold tracking-wider">Derailed Voyage</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-semibold shadow-lg">
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 }}
        className="text-center mt-20"
      >
        <h2 className="text-5xl font-extrabold">Ideas Off the Rails 🚀</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          A futuristic creative hub blending design, storytelling, and technology.
        </p>
      </motion.div>

      <footer className="absolute bottom-4 w-full text-center text-sm opacity-70">
        Made with ❤ by Env Sphere | envenv257@gmail.com <br />
        Founders: Nitish Bharadwaj & Khusbu Basati
      </footer>
    </div>
  )
}
