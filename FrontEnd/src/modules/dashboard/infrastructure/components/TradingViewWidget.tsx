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
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "60",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "es",
          "enable_publishing": false,
          "backgroundColor": "#1E2329",
          "gridColor": "#2B3139",
          "hide_top_toolbar": true,
          "hide_legend": false,
          "save_image": false,
          "hide_volume": true,
          "hide_side_toolbar": true,
          "allow_symbol_change": false,
          "calendar": false,
          "details": false,
          "hotlist": false,
          "withdateranges": false,
          "studies": []
        }`;
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
        </div>
    );
}

export default memo(TradingViewWidget);
