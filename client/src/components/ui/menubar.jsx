/* eslint-disable max-len */

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '@/lib/utils'

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
    <MenubarPrimitive.Root
        ref={ref}
        className={cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', className)}
        {...props}/>
))

Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(
            'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
            className,
        )}
        {...props}/>
))

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
        ref={ref}
        className={cn('-mx-1 my-1 h-px bg-muted', className)}
        {...props}/>
))

MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({ className, ...props }) => {
    return (
        <span
            className={cn(
                'ml-auto text-xs tracking-widest text-muted-foreground',
                className,
            )}
            {...props}/>
    )
}

MenubarShortcut.displayname = 'MenubarShortcut'

export {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarSeparator,
    MenubarShortcut,
    MenubarGroup,
    MenubarPortal,
    MenubarSub,
    MenubarRadioGroup,
}
