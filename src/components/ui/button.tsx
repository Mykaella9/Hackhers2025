"use client"

import React, { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" // <-- added "outline"
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base = "px-4 py-2 rounded-xl font-medium transition"

  const color =
    variant === "primary"
      ? "bg-[#034F54] text-white hover:bg-[#023d3f]"
      : variant === "secondary"
      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
      : "bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100" // <-- outline styling

  return (
    <button className={`${base} ${color} ${className}`} {...props}>
      {children}
    </button>
  )
}
