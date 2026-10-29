import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in presentation deck:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-lg font-bold">
              ✦
            </div>
            <h2 className="text-xl font-display font-semibold text-white">
              AETHER · Ilha da Magia
            </h2>
            <p className="text-xs text-slate-300">
              Ocurrió un error al cargar la vista interactiva. Pulsa el botón para recargar la experiencia.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-rose-300 bg-black/40 p-3 rounded-lg overflow-x-auto text-left max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium rounded-xl text-xs transition-colors"
            >
              Reiniciar Experiencia
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
