import { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Asegurarse de que el script no se inyecte múltiples veces en Strict Mode
        if (container.current && !container.current.querySelector('script')) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "es",
          "save_image": true,
          "style": "1",
          "symbol": "BINANCE:BTCUSDT",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#1E2329",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
            <div className="tradingview-widget-copyright">
                <a href="https://es.tradingview.com/symbols/BTCUSDT/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text text-[#848E9C] hover:text-[#F0B90B] transition-colors">Gráfico de BTCUSDT</span>
                </a>
                <span className="trademark text-[#848E9C]"> por TradingView</span>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
