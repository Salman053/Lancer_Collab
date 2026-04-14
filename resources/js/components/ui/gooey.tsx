import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface GooeyProps {
    children?: React.ReactNode
    className?: string
    intensity?: "light" | "medium" | "heavy"
    variant?: "blob" | "morph" | "pulse" | "wave" | "spiral" | "bubble"
    interactive?: boolean
    speed?: "slow" | "normal" | "fast"
}

const GooeyFilter = ({ intensity = "medium", children, className, variant = "blob", interactive = true, speed = "normal" }: GooeyProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const intensityValues = {
        light: { strength: 5, blur: 8 },
        medium: { strength: 12, blur: 12 },
        heavy: { strength: 20, blur: 16 }
    }

    const speedValues = {
        slow: "20s",
        normal: "10s",
        fast: "5s"
    }

    useEffect(() => {
        if (!interactive || !containerRef.current) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect) {
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                setMousePosition({ x, y })
            }
        }

        const element = containerRef.current
        element?.addEventListener("mousemove", handleMouseMove)
        element?.addEventListener("mouseenter", () => setIsHovering(true))
        element?.addEventListener("mouseleave", () => setIsHovering(false))

        return () => {
            element?.removeEventListener("mousemove", handleMouseMove)
            element?.removeEventListener("mouseenter", () => setIsHovering(true))
            element?.removeEventListener("mouseleave", () => setIsHovering(false))
        }
    }, [interactive])

    const getGradientPositions = () => {
        if (interactive && isHovering) {
            return `${mousePosition.x}% ${mousePosition.y}%`
        }
        return "50% 50%"
    }

    const getBlobAnimation = () => {
        switch (variant) {
            case "morph":
                return `
          @keyframes morph {
            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          }
        `
            case "pulse":
                return `
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }
        `
            case "wave":
                return `
          @keyframes wave {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(2%, -2%) scale(1.02); }
            75% { transform: translate(-2%, 2%) scale(0.98); }
          }
        `
            case "spiral":
                return `
          @keyframes spiral {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }
        `
            case "bubble":
                return `
          @keyframes bubble {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3%) scale(1.03); }
          }
        `
            default:
                return `
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(2%, 3%) scale(1.02); }
            50% { transform: translate(-2%, -1%) scale(0.98); }
            75% { transform: translate(1%, -2%) scale(1.01); }
          }
        `
        }
    }

    const getAnimationName = () => {
        switch (variant) {
            case "morph": return "morph"
            case "pulse": return "pulse"
            case "wave": return "wave"
            case "spiral": return "spiral"
            case "bubble": return "bubble"
            default: return "blob"
        }
    }

    return (
        <>
            <style>
                {`
          ${getBlobAnimation()}
          
          @keyframes gradientShift {
            0%, 100% { 
              background-position: 0% 50%;
            }
            50% { 
              background-position: 100% 50%;
            }
          }
          
          .gooey-container {
            filter: url(#gooey-filter);
          }
          
          .gooey-blob {
            animation: ${getAnimationName()} ${speedValues[speed]} ease-in-out infinite;
          }
          
          .gooey-blob-interactive {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .gooey-gradient {
            background: radial-gradient(
              circle at ${getGradientPositions()},
              rgba(59, 130, 246, 0.8),
              rgba(139, 92, 246, 0.8),
              rgba(236, 72, 153, 0.8)
            );
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }
        `}
            </style>

            <svg className="absolute h-0 w-0">
                <defs>
                    <filter id="gooey-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation={intensityValues[intensity].blur}
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values={`
                ${intensityValues[intensity].strength} 0 0 0 0
                0 ${intensityValues[intensity].strength} 0 0 0
                0 0 ${intensityValues[intensity].strength} 0 0
                0 0 0 18 -7
              `}
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div
                ref={containerRef}
                className={cn("gooey-container relative overflow-hidden", className)}
            >
                {children || (
                    <>
                        {/* Default gooey blobs */}
                        <div className="absolute inset-0 gooey-gradient opacity-70" />

                        <div
                            className={cn(
                                "gooey-blob absolute rounded-full",
                                interactive && "gooey-blob-interactive"
                            )}
                            style={{
                                top: "20%",
                                left: "15%",
                                width: "40%",
                                height: "40%",
                                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                                filter: "blur(20px)",
                            }}
                        />

                        <div
                            className={cn(
                                "gooey-blob absolute rounded-full",
                                interactive && "gooey-blob-interactive"
                            )}
                            style={{
                                bottom: "15%",
                                right: "20%",
                                width: "45%",
                                height: "45%",
                                background: "linear-gradient(225deg, #EC4899, #F43F5E)",
                                filter: "blur(25px)",
                                animationDelay: "2s",
                            }}
                        />

                        <div
                            className={cn(
                                "gooey-blob absolute rounded-full",
                                interactive && "gooey-blob-interactive"
                            )}
                            style={{
                                top: "50%",
                                left: "50%",
                                width: "35%",
                                height: "35%",
                                background: "linear-gradient(90deg, #06B6D4, #3B82F6)",
                                filter: "blur(18px)",
                                transform: "translate(-50%, -50%)",
                                animationDelay: "4s",
                            }}
                        />
                    </>
                )}

                {/* Content overlay */}
                <div className="relative z-10">
                    {children && children}
                </div>
            </div>
        </>
    )
}

// Interactive Gooey Button Component
interface GooeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "gradient"
    size?: "sm" | "md" | "lg"
}

export const GooeyButton = ({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}: GooeyButtonProps) => {
    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    }

    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-purple-600 hover:bg-purple-700 text-white",
        gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
    }

    return (
        <div className="relative">
            <svg className="absolute h-0 w-0">
                <defs>
                    <filter id="gooey-button">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="12 0 0 0 0  0 12 0 0 0  0 0 12 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <button
                className={cn(
                    "relative rounded-lg font-semibold transition-all duration-300",
                    "hover:scale-105 active:scale-95",
                    "shadow-lg hover:shadow-xl",
                    sizeClasses[size],
                    variantClasses[variant],
                    className
                )}
                style={{ filter: "url(#gooey-button)" }}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
        </div>
    )
}

// Gooey Card Component
interface GooeyCardProps {
    children: React.ReactNode
    className?: string
    intensity?: "light" | "medium" | "heavy"
}

export const GooeyCard = ({ children, className, intensity = "medium" }: GooeyCardProps) => {
    return (
        <GooeyFilter intensity={intensity} variant="morph" speed="slow">
            <div className={cn(
                "relative rounded-2xl bg-white/10 backdrop-blur-xl p-6",
                "border border-white/20 shadow-2xl",
                className
            )}>
                {children}
            </div>
        </GooeyFilter>
    )
}

// Gooey Loading Spinner
export const GooeySpinner = () => {
    return (
        <div className="relative h-16 w-16">
            <svg className="absolute h-0 w-0">
                <defs>
                    <filter id="gooey-spinner">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="8 0 0 0 0  0 8 0 0 0  0 0 8 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="absolute inset-0" style={{ filter: "url(#gooey-spinner)" }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative h-12 w-12">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    animation: `spin 1.5s ease-in-out infinite`,
                                    animationDelay: `${i * 0.2}s`,
                                    transform: `rotate(${i * 120}deg)`,
                                    opacity: 0.6,
                                }}
                            >
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-white"
                                    style={{ transform: "translateY(-50%)" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Animated Gooey Background
export const GooeyBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
            <GooeyFilter
                intensity="heavy"
                variant="spiral"
                interactive={true}
                speed="normal"
                className="absolute inset-0"
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

// Gooey Menu Component
interface GooeyMenuItem {
    label: string
    icon?: React.ReactNode
    onClick?: () => void
}

interface GooeyMenuProps {
    items: GooeyMenuItem[]
    className?: string
}

export const GooeyMenu = ({ items, className }: GooeyMenuProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div className={cn("relative", className)}>
            <svg className="absolute h-0 w-0">
                <defs>
                    <filter id="gooey-menu">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="15 0 0 0 0  0 15 0 0 0  0 0 15 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="flex gap-2" style={{ filter: "url(#gooey-menu)" }}>
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.onClick}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "relative rounded-lg px-6 py-3 font-medium text-white transition-all duration-300",
                            "hover:scale-105 active:scale-95",
                            "bg-gradient-to-r from-blue-600 to-purple-600",
                            hoveredIndex === index && "shadow-lg shadow-purple-500/50"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                        {hoveredIndex === index && (
                            <div className="absolute inset-0 rounded-lg bg-white/20 animate-pulse" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GooeyFilter