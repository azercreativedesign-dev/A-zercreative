"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export const buttonVariants = ({ 
  variant = "primary", 
  size = "default" 
}: { 
  variant?: string; 
  size?: string 
} = {}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  
  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
    xl: "h-12 px-10 text-lg",
    icon: "h-10 w-10", 
  };

  return `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.default}`;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  size?: "default" | "sm" | "md" | "lg" | "xl" | "icon" 
  asChild?: boolean
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const combinedClassName = `${buttonVariants({ variant, size })} ${className}`;

    return (
      <Comp
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"