"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RANGE_OPTIONS } from "@/lib/constants"
import { ListIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ITimeRangeSelectProps {
    currentRange: string
}

export function TimeRangeSelect({ currentRange }: ITimeRangeSelectProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("range", value)
        router.push(`?${params.toString()}`)
    }

    return (
        <Select value={currentRange} onValueChange={handleChange}>
            <SelectTrigger
                className={cn(
                    "max-w-[180px] bg-[hsl(var(--background))] rounded-md",
                    "flex justify-center sm:justify-end text-[hsl(var(--secondary))] border-none",
                    "hover:text-[hsl(var(--foreground))] transition-colors duration-200",
                    "focus:ring-0 focus:outline-none focus:border-none",
                    "[&>svg.lucide-chevron-down]:hidden"
                )}
            >
                <div className="flex items-center gap-1">
                    <SelectValue placeholder="Select time range" />
                    <ListIcon className="w-4 h-4 ml-2" />
                </div>
            </SelectTrigger>

            <SelectContent
                className={cn(
                    "w-[180px] text-[hsl(var(--foreground))] shadow-lg",
                    "border-0 rounded-md bg-[hsl(var(--background-hover))]"
                )}
            >
                {RANGE_OPTIONS.map(({ label, value }) => (
                    <SelectItem
                        key={value}
                        value={value}
                        className={cn(
                            "px-4 py-2 cursor-pointer text-sm transition-colors duration-200",
                            "hover:bg-[hsl(var(--background-hover-light))] !important",
                            currentRange === value &&
                                "text-[hsl(var(--accent))] text-sm"
                        )}
                    >
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
