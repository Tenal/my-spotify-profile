"use client"

import React from "react"
import { ErrorMessage } from "@/components/ErrorMessage"

interface IErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface IErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error) {
        // if unauthorized, logout user
        if (
            error.message.includes("401") ||
            error.message.includes("UNAUTHORIZED")
        ) {
            window.location.href = "/api/auth/logout"
        }
    }

    render() {
        if (this.state.hasError && this.state.error) {
            if (
                this.state.error.message.includes("401") ||
                this.state.error.message.includes("UNAUTHORIZED")
            ) {
                return null
            }
            return <ErrorMessage message={this.state.error.message} />
        }
        return this.props.children
    }
}
