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

    render() {
        if (this.state.hasError && this.state.error) {
            return <ErrorMessage message={this.state.error.message} />
        }
        return this.props.children
    }
}
