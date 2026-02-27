import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] text-center gap-3 p-6 bg-[#1E2329] rounded-xl border border-[#2B3139]">
                    <div className="text-[#F6465D] text-4xl">⚠</div>
                    <div className="text-white font-bold">Error al renderizar</div>
                    <div className="text-[#848E9C] text-sm max-w-xs">
                        {this.state.error?.message || 'Ocurrió un error inesperado. Por favor, recarga la página.'}
                    </div>
                    <button
                        onClick={() => this.setState({ hasError: false, error: undefined })}
                        className="mt-2 px-4 py-2 rounded-lg bg-[#2B3139] text-[#848E9C] hover:text-white hover:bg-[#3A4149] transition-all text-sm font-bold"
                    >
                        Reintentar
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
