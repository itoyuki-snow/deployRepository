import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("エラーが発生しました:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h2>表示に失敗しました。</h2>
          <p>もう一度お試しください。</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
