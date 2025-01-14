"use client"

import React from "react"
import { TriangleAlert } from "lucide-react"

interface IErrorMessageProps {
    message: string
}

export function ErrorMessage({ message }: IErrorMessageProps) {
    return (
        <p className="flex justify-start text-[hsl(var(--secondary))]">
            <TriangleAlert className="mr-3 text-yellow-500 w-16" /> {message}
        </p>
    )
}
