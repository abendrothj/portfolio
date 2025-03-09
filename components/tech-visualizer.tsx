"use client"

import { useEffect, useRef } from "react"

interface Skill {
  name: string
  level: number // 0-100
  category: "language" | "tool" | "concept"
  color: string
}

export default function TechVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = 400
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Skills data
    const skills: Skill[] = [
      { name: "Rust", level: 90, category: "language", color: "#dea584" },
      { name: "C/C++", level: 85, category: "language", color: "#659bd3" },
      { name: "Python", level: 80, category: "language", color: "#3572a5" },
      { name: "Java", level: 70, category: "language", color: "#b07219" },
      { name: "Linux", level: 85, category: "tool", color: "#f1c40f" },
      { name: "Git", level: 80, category: "tool", color: "#f34f29" },
      { name: "File Integrity", level: 95, category: "concept", color: "#27ae60" },
      { name: "Cybersecurity", level: 85, category: "concept", color: "#9b59b6" },
      { name: "Systems Programming", level: 90, category: "concept", color: "#e74c3c" },
      { name: "Performance Optimization", level: 80, category: "concept", color: "#3498db" },
    ]

    // Animation variables
    let animationProgress = 0
    const animationSpeed = 0.02
    let animationFrame: number

    // Draw radar chart
    const drawRadarChart = (progress: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.min(centerX, centerY) * 0.8

      // Draw background circles and labels
      ctx.strokeStyle = "rgba(150, 150, 150, 0.2)"
      ctx.fillStyle = "rgba(150, 150, 150, 0.7)"
      ctx.textAlign = "center"

      for (let i = 1; i <= 5; i++) {
        const radius = maxRadius * (i / 5)

        // Draw circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()

        // Draw level label on the top
        if (i < 5) {
          ctx.fillText(`${i * 20}%`, centerX, centerY - radius - 5)
        }
      }

      // Calculate points for each skill
      const angleStep = (Math.PI * 2) / skills.length
      const points: [number, number][] = []

      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2 // Start from top
        const skillRadius = maxRadius * (skill.level / 100) * progress

        const x = centerX + Math.cos(angle) * skillRadius
        const y = centerY + Math.sin(angle) * skillRadius

        points.push([x, y])

        // Draw skill name
        const labelRadius = maxRadius + 20
        const labelX = centerX + Math.cos(angle) * labelRadius
        const labelY = centerY + Math.sin(angle) * labelRadius

        ctx.save()
        ctx.translate(labelX, labelY)

        // Rotate text based on position
        if (angle > Math.PI / 2 && angle < (Math.PI * 3) / 2) {
          ctx.rotate(angle + Math.PI)
          ctx.textAlign = "right"
        } else {
          ctx.rotate(angle)
          ctx.textAlign = "left"
        }

        ctx.fillStyle = skill.color
        ctx.font = "bold 14px sans-serif"
        ctx.fillText(skill.name, 0, 0)

        // Draw small indicator of skill level
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(150, 150, 150, 0.7)"
        ctx.fillText(`${skill.level}%`, 0, 15)

        ctx.restore()
      })

      // Draw skill polygon
      ctx.beginPath()
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point[0], point[1])
        } else {
          ctx.lineTo(point[0], point[1])
        }
      })
      ctx.closePath()

      // Fill with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius)
      gradient.addColorStop(0, "rgba(45, 52, 54, 0.8)")
      gradient.addColorStop(1, "rgba(45, 52, 54, 0.2)")
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points at each skill
      points.forEach((point, index) => {
        ctx.beginPath()
        ctx.arc(point[0], point[1], 5, 0, Math.PI * 2)
        ctx.fillStyle = skills[index].color
        ctx.fill()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw lines from center to each point
      ctx.globalAlpha = 0.3
      points.forEach((point) => {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(point[0], point[1])
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 1
        ctx.stroke()
      })
      ctx.globalAlpha = 1
    }

    // Animation loop
    const animate = () => {
      if (animationProgress < 1) {
        animationProgress += animationSpeed
      } else {
        animationProgress = 1
      }

      drawRadarChart(animationProgress)

      if (animationProgress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-[400px] rounded-lg" aria-label="Skills radar chart" />
}

