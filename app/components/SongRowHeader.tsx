"use client"

import React from "react"
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"
import { Clock } from "lucide-react"

export function SongRowHeader() {
    return (
        <TooltipProvider>
            <div className="flex items-center w-full gap-4 px-3 pb-1 text-sm text-[hsl(var(--secondary))] border-b border-[hsl(var(--background-hover))]">
                <div className="w-4 h-4 flex items-center justify-center">
                    <p>#</p>
                </div>
                <div className="flex-1 min-w-0 text-left ml-16">
                    <p className="text-sm">Title</p>
                </div>
                <div className="hidden sm:block flex-1 text-left">
                    <p className="text-sm">Album</p>
                </div>
                <div className="hidden xs:flex min-w-[30px] justify-end">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Clock className="max-w-[18px]" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] border-none">
                            Duration
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}
