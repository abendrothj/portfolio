"use client"

import { useEffect, useRef } from "react"

export default function BackgroundPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Pattern settings
    const gridSize = 30
    const dotSize = 1

    // Animation variables
    let frame = 0
    const animationSpeed = 0.2

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid pattern with occasional highlights
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Calculate distance from center for wave effect
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Create wave effect
          const wave = Math.sin(distance / 50 - frame / 30) + 1

          // Determine if this is a "special" node (binary/hex pattern)
          const isSpecial = Math.random() < 0.01

          if (isSpecial) {
            // Draw a small binary or hex character
            ctx.fillStyle = "rgba(100, 255, 100, 0.15)"
            ctx.font = "8px monospace"
            const chars = ["0", "1", "A", "F", "2", "E", "7", "D"]
            const char = chars[Math.floor(Math.random() * chars.length)]
            ctx.fillText(char, x, y)
          } else {
            // Draw regular dot with wave effect
            const opacity = 0.03 + wave * 0.03
            ctx.fillStyle = `rgba(150, 255, 150, ${opacity})`
            ctx.beginPath()
            ctx.arc(x, y, dotSize * wave, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      frame += animationSpeed
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full opacity-30" aria-hidden="true" />
}

