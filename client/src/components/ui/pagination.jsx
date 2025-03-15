import * as React from 'react'
// import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/components/ui/button'

const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}/>
)

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}/>
))

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
))

export { Pagination, PaginationContent, PaginationItem }
