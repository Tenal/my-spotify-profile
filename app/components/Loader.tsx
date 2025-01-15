"use client"

import React from "react"

interface IBarProps {
    delay?: string
}

export function Loader() {
    return (
        <div className="flex justify-center items-center w-full h-[90vh]">
            <style jsx global>{`
                @keyframes dance {
                    from {
                        height: 10px;
                    }
                    to {
                        height: 100%;
                    }
                }
            `}</style>

            <div className="flex justify-center items-end overflow-hidden w-[100px] min-w-[100px] h-[50px] m-auto relative z-[2]">
                <Bar delay="250ms" />
                <Bar delay="715ms" />
                <Bar delay="475ms" />
                <Bar delay="25ms" />
                <Bar delay="190ms" />
            </div>
        </div>
    )
}

const Bar = ({ delay = "0ms" }: IBarProps) => (
    <div
        className="w-[10px] h-[5px] mx-[2px] bg-[hsl(var(--background-hover-extralight))]"
        style={{
            animationName: "dance",
            animationDuration: "400ms",
            animationDelay: delay,
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationTimingFunction: "linear",
        }}
    />
)
