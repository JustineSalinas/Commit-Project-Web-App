import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#09090B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFAA] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#00FFAA] text-black hover:bg-[#00E599]",
        destructive:
          "bg-[#FF4757] text-white hover:bg-[#FF4757]/90",
        outline:
          "border border-[#27272A] bg-[#09090B] hover:bg-[#18181B] text-[#FAFAFA]",
        secondary:
          "bg-[#111113] text-[#FAFAFA] hover:bg-[#18181B] border border-[#1A1A1F]",
        ghost: "hover:bg-[#111113] hover:text-[#FAFAFA] text-[#A1A1AA]",
        link: "text-[#00FFAA] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
