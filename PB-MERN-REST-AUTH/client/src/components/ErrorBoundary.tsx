/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ErrorBoundary.tsx
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
 
  static getDerivedStateFromError(error: any) {
    console.log("ErrorBoundary caught an error:", error);
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // Log error if needed
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in this page.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;