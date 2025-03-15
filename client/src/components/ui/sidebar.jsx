

import * as React from 'react'
import { cn } from '@/lib/utils'

const Sidebar = React.forwardRef(({ className, children, ...props }, ref) => (
    <aside ref={ref} className={cn('w-64 bg-background border-r', className)} {...props}>
        {children}
    </aside>
))

Sidebar.displayName = 'Sidebar'

export { Sidebar }
