

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)

Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close
const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content
            ref={ref}
            className={cn(
                'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-[96%] flex-col rounded-t-[10px] border bg-background',
                className,
            )}
            {...props}>
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            {children}
        </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
))

DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }) => (
    <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
)

DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({ className, ...props }) => (
    <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
)

DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}/>
))

DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}/>
))

DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
    Drawer,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
