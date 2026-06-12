import { Component, type ErrorInfo, type ReactNode } from "react";

interface FullExperienceBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface FullExperienceBoundaryState {
  hasError: boolean;
}

export default class FullExperienceBoundary extends Component<
  FullExperienceBoundaryProps,
  FullExperienceBoundaryState
> {
  state: FullExperienceBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): FullExperienceBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
