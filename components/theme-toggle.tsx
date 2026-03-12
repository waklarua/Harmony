"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for system preference or stored preference
    const stored = localStorage.getItem("harmony-theme")
    if (stored === "dark" || stored === "light") {
      setTheme(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("harmony-theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 transition-transform duration-300"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon className="h-4 w-4 transition-all" /> : <Sun className="h-4 w-4 transition-all" />}
    </Button>
  )
}
