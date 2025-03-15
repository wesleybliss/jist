

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle'

const ToggleGroup = React.forwardRef(({ className, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn('inline-flex space-x-px rounded-md border bg-muted p-1', className)}
        {...props}/>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => (
    <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}>
        {children}
    </ToggleGroupPrimitive.Item>
))

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
