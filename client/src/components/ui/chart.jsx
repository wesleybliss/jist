

import * as React from 'react'
import { cn } from '@/lib/utils'

// const THEMES = { light: '', dark: '.dark' }

const Chart = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
))

Chart.displayName = 'Chart'

const ChartContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('[&_.recharts-tooltip-cursor]:fill-muted', className)} {...props} />
))

ChartContent.displayName = 'ChartContent'

const ChartTooltip = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('rounded-lg border bg-background p-2 shadow-md', className)}
        {...props}/>
))

ChartTooltip.displayName = 'ChartTooltip'

export { Chart, ChartContent, ChartTooltip }
