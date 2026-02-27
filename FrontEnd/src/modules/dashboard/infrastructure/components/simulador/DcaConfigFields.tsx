import React from 'react';

interface DcaConfigFieldsProps {
    dcaBuyAmount: string;
    setDcaBuyAmount: (val: string) => void;
    dcaIntervalBars: string;
    setDcaIntervalBars: (val: string) => void;
    dcaTpPct: string;
    setDcaTpPct: (val: string) => void;
    dcaSlPct: string;
    setDcaSlPct: (val: string) => void;
}

const DcaConfigFields: React.FC<DcaConfigFieldsProps> = ({
    dcaBuyAmount, setDcaBuyAmount,
    dcaIntervalBars, setDcaIntervalBars,
    dcaTpPct, setDcaTpPct,
    dcaSlPct, setDcaSlPct
}) => {
    return (
        <>
            {/* DCA Specific Fields */}
            <div>
                <label className="text-sm text-white font-medium block mb-2">Monto de Compra (USD)</label>
                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                    <input
                        type="number"
                        value={dcaBuyAmount}
                        onChange={(e) => setDcaBuyAmount(e.target.value)}
                        placeholder="100.00"
                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                    />
                    <span className="text-[#848E9C] text-sm font-medium">USDT</span>
                </div>
            </div>
            <div>
                <label className="text-sm text-white font-medium block mb-2">Intervalo de Barras</label>
                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                    <input
                        type="number"
                        value={dcaIntervalBars}
                        onChange={(e) => setDcaIntervalBars(e.target.value)}
                        placeholder="24"
                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                    />
                    <span className="text-[#848E9C] text-xs px-2">Barras</span>
                </div>
                <p className="text-[10px] text-[#848E9C] mt-1">Frecuencia de compra recurrente</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-white font-medium block mb-2">Take Profit (%)</label>
                    <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#02C076] transition-colors">
                        <input
                            type="number"
                            value={dcaTpPct}
                            onChange={(e) => setDcaTpPct(e.target.value)}
                            placeholder="10.0"
                            className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs text-white font-medium block mb-2">Stop Loss (%)</label>
                    <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F6465D] transition-colors">
                        <input
                            type="number"
                            value={dcaSlPct}
                            onChange={(e) => setDcaSlPct(e.target.value)}
                            placeholder="5.0"
                            className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DcaConfigFields;
