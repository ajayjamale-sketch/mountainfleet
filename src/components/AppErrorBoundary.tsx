import React, { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home, Ship } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
          <div className="max-w-lg text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 mb-8">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Something went wrong</h1>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
              An unexpected error occurred. Our team has been notified. You can try refreshing the page or navigating home.
            </p>

            {this.state.error && (
              <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 dark:border-rose-800/40 dark:bg-rose-950/30 p-4 text-left">
                <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mb-1">Error Details</p>
                <p className="text-xs text-rose-500 dark:text-rose-300 font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <RotateCcw size={16} />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-medium text-slate-900 dark:text-white transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Home size={16} />
                Go Home
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Ship size={14} />
              <span>MountainFleet · Error Recovery</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
