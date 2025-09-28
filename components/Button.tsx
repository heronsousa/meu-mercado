import { type VariantProps, cva } from 'class-variance-authority';
import { TouchableOpacity } from 'react-native';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-white",
        destructive: "bg-destructive",
        ghost: "bg-slate-700",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-2",
        lg: "h-18 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  labelClasses?: string;
}
function Button({
  labelClasses,
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

export { Button, buttonVariants };

