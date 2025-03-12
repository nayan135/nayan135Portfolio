"use client"

import { Component, ReactNode, ErrorInfo } from "react"

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { 
    hasError: false 
  };
  
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
