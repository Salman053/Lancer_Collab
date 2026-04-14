import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun, Sparkles, Palette, RotateCw, Waves, Orbit } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

type AnimationVariant =
  | "circle"           // Default circular ripple effect
  | "fade"             // Smooth fade transition
  | "slide-up"         // Slides from bottom
  | "slide-down"       // Slides from top
  | "slide-left"       // Slides from right
  | "slide-right"      // Slides from left
  | "rotate"           // Rotates from center
  | "scale"            // Scales in/out
  | "blur"             // Blur effect
  | "flip"             // 3D flip effect
  | "bounce"           // Bouncy animation
  | "wave"             // Wave-like animation
  | "glow"             // Glowing effect
  | "spiral"           // Spiral expansion
  | "none"             // No animation

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: AnimationVariant
  showIconAnimation?: boolean
}

interface VariantConfig {
  icon: any
  easing: string
  pseudoElement: string
  customAnimation?: (x: number, y: number, maxRadius: number) => PropertyIndexedKeyframes | Keyframe[]
}

const variantConfigs: Record<AnimationVariant, VariantConfig> = {
  circle: {
    icon: Sparkles,
    easing: "ease-in-out",
    pseudoElement: "::view-transition-new(root)",
  },
  fade: {
    icon: Palette,
    easing: "ease-in-out",
    pseudoElement: "::view-transition-old(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { opacity: 1 },
      { opacity: 0 }
    ]
  },
  "slide-up": {
    icon: Sun,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "translateY(100%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 }
    ]
  },
  "slide-down": {
    icon: Moon,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "translateY(-100%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 }
    ]
  },
  "slide-left": {
    icon: RotateCw,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "translateX(100%)", opacity: 0 },
      { transform: "translateX(0)", opacity: 1 }
    ]
  },
  "slide-right": {
    icon: RotateCw,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "translateX(-100%)", opacity: 0 },
      { transform: "translateX(0)", opacity: 1 }
    ]
  },
  rotate: {
    icon: RotateCw,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "rotate(-180deg) scale(0.5)", opacity: 0 },
      { transform: "rotate(0) scale(1)", opacity: 1 }
    ]
  },
  scale: {
    icon: Sun,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "scale(0)", opacity: 0 },
      { transform: "scale(1)", opacity: 1 }
    ]
  },
  blur: {
    icon: Sparkles,
    easing: "ease-in-out",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { filter: "blur(8px)", opacity: 0 },
      { filter: "blur(0px)", opacity: 1 }
    ]
  },
  flip: {
    icon: Sun,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "rotateY(90deg)", opacity: 0 },
      { transform: "rotateY(0deg)", opacity: 1 }
    ]
  },
  bounce: {
    icon: Sun,
    easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "scale(0) translateY(100px)", opacity: 0 },
      { transform: "scale(1.1) translateY(-10px)", opacity: 1, offset: 0.7 },
      { transform: "scale(1) translateY(0)", opacity: 1 }
    ]
  },
  wave: {
    icon: Waves,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { clipPath: `inset(100% 0 0 0)`, opacity: 0 },
      { clipPath: `inset(0% 0 0 0)`, opacity: 1 }
    ]
  },
  glow: {
    icon: Sparkles,
    easing: "ease-in-out",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { filter: "brightness(0) blur(4px)", opacity: 0 },
      { filter: "brightness(1) blur(0px)", opacity: 1 }
    ]
  },
  spiral: {
    icon: Orbit,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x: number, y: number, maxRadius: number) => [
      { transform: "scale(0) rotate(-360deg)", opacity: 0 },
      { transform: "scale(1) rotate(0deg)", opacity: 1 }
    ]
  },
  none: {
    icon: Sun,
    easing: "linear",
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [{ opacity: 1 }]
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  variant = "circle",
  showIconAnimation = true,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const getCircleAnimation = useCallback((x: number, y: number, maxRadius: number) => {
    return {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ],
    }
  }, [])

  const getCustomAnimation = useCallback((
    variant: AnimationVariant,
    x: number,
    y: number,
    maxRadius: number
  ) => {
    const config = variantConfigs[variant]
    if (config?.customAnimation) {
      return config.customAnimation(x, y, maxRadius)
    }
    return getCircleAnimation(x, y, maxRadius)
  }, [getCircleAnimation])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (!button || isAnimating) return

    setIsAnimating(true)

    // Add icon animation class
    if (showIconAnimation) {
      button.classList.add("animate-icon-bounce")
      setTimeout(() => {
        button.classList.remove("animate-icon-bounce")
      }, 300)
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", newTheme ? "dark" : "light")
    }

    if (variant === "none" || typeof document.startViewTransition !== "function") {
      applyTheme()
      setIsAnimating(false)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        const config = variantConfigs[variant]
        const animation = getCustomAnimation(variant, x, y, maxRadius)

        document.documentElement.animate(
          animation as PropertyIndexedKeyframes | Keyframe[],
          {
            duration,
            easing: config?.easing || "ease-in-out",
            pseudoElement: config?.pseudoElement,
          }
        )

        // Reset animating state after animation completes
        setTimeout(() => {
          setIsAnimating(false)
        }, duration)
      })
    }
  }, [isDark, duration, variant, getCustomAnimation, showIconAnimation, isAnimating])

  const CurrentIcon = variantConfigs[variant]?.icon || Sun

  return (
    <>
      <style>{`
        @keyframes icon-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(15deg); }
        }
        
        @keyframes icon-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.5; }
        }
        
        .animate-icon-bounce {
          animation: icon-bounce 0.3s ease-in-out;
        }
        
        .animate-icon-spin {
          animation: icon-spin 0.5s ease-in-out;
        }
        
        .animate-icon-pulse {
          animation: icon-pulse 0.3s ease-in-out;
        }
        
        ::view-transition-old(root) {
          animation: none !important;
        }
        
        ::view-transition-new(root) {
          animation: none !important;
        }
      `}</style>

      <button
        type="button"
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          "relative overflow-hidden rounded-full p-2 transition-all duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isAnimating && "pointer-events-none",
          className
        )}
        disabled={isAnimating}
        {...props}
      >
        <div className="relative z-10">
          {isDark ? (
            <Sun className={cn("size-5", showIconAnimation && "transition-transform")} />
          ) : (
            <Moon className={cn("size-5", showIconAnimation && "transition-transform")} />
          )}
        </div>

        {/* Ripple effect on click */}
        {isAnimating && (
          <span className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20" />
        )}

        <span className="sr-only">Toggle theme</span>
      </button>
    </>
  )
}

// Export a variant selector component for easy switching
interface ThemeVariantSelectorProps {
  currentVariant: AnimationVariant
  onVariantChange: (variant: AnimationVariant) => void
}

export const ThemeVariantSelector = ({ currentVariant, onVariantChange }: ThemeVariantSelectorProps) => {
  const variants: { value: AnimationVariant; label: string; icon: any }[] = [
    { value: "circle", label: "Circle Ripple", icon: Sparkles },
    { value: "fade", label: "Fade", icon: Palette },
    { value: "slide-up", label: "Slide Up", icon: Sun },
    { value: "slide-down", label: "Slide Down", icon: Moon },
    { value: "slide-left", label: "Slide Left", icon: RotateCw },
    { value: "slide-right", label: "Slide Right", icon: RotateCw },
    { value: "rotate", label: "Rotate", icon: RotateCw },
    { value: "scale", label: "Scale", icon: Sun },
    { value: "blur", label: "Blur", icon: Sparkles },
    { value: "flip", label: "3D Flip", icon: Sun },
    { value: "bounce", label: "Bounce", icon: Sun },
    { value: "wave", label: "Wave", icon: Waves },
    { value: "glow", label: "Glow", icon: Sparkles },
    { value: "spiral", label: "Spiral", icon: Orbit },
    { value: "none", label: "No Animation", icon: Sun },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4">
      {variants.map((variant) => {
        const Icon = variant.icon
        return (
          <button
            key={variant.value}
            onClick={() => onVariantChange(variant.value)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
              currentVariant === variant.value
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            <Icon className="size-4" />
            <span>{variant.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default AnimatedThemeToggler