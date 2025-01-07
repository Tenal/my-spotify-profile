"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { RANGE_OPTIONS } from "@/lib/constants"

interface ITimeRangeLinksProps {
    currentRange: string
}

export function TimeRangeLinks({ currentRange }: ITimeRangeLinksProps) {
    return (
        <div className="flex gap-1 sm:gap-3 justify-center sm:justify-end">
            {RANGE_OPTIONS.map(({ label, value }) => {
                const isActive = value === currentRange
                return (
                    <Link
                        key={value}
                        href={`/artists?range=${value}`}
                        className={cn(
                            "px-3 py-2 rounded transition-colors duration-300 font-bold",
                            "text-xs sm:text-sm md:text-lg min-w-[90px] text-center whitespace-nowrap",
                            "text-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]",
                            isActive &&
                                "text-[hsl(var(--foreground))] underline"
                        )}
                    >
                        {label}
                    </Link>
                )
            })}
        </div>
    )
}
