import React from 'react';

class ErrorBoundary extends React.Component<any, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false, error: null as Error | null};
  }

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так :(</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
