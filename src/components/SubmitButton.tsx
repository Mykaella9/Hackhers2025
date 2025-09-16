import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

type SubmitButtonProps = ComponentProps<typeof Button>

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  return (
    <Button variant="outline" {...props}>
      {children}
    </Button>
  )
}