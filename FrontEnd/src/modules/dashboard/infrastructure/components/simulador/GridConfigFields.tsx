import React from 'react';

interface GridConfigFieldsProps {
    minPrice: string;
    setMinPrice: (val: string) => void;
    maxPrice: string;
    setMaxPrice: (val: string) => void;
    grids: string;
    setGrids: (val: string) => void;
    gridType: 'ARITMETICA' | 'GEOMETRICA';
    setGridType: (type: 'ARITMETICA' | 'GEOMETRICA') => void;
    investment: string;
    setInvestment: (val: string) => void;
}

const GridConfigFields: React.FC<GridConfigFieldsProps> = ({
    minPrice, setMinPrice, maxPrice, setMaxPrice,
    grids, setGrids, gridType, setGridType,
    investment, setInvestment
}) => {
    return (
        <>
            {/* Field 1: Price Range */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-white font-medium">Rango de precio</label>
                </div>
                <div className="flex gap-2 mb-1">
                    <div className="flex-1 bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min: 2.000"
                            className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                        />
                    </div>
                    <div className="flex-1 bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max: 3.000"
                            className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                        />
                    </div>
                </div>
                <div className="text-xs text-[#848E9C] text-right">Precio marca: 2.124 USDT</div>
            </div>

            {/* Field 2: Grid Quantity */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-white font-medium">Cantidad de grids</label>
                    <div className="flex bg-[#2B3139] rounded p-0.5">
                        <button
                            onClick={() => setGridType('ARITMETICA')}
                            className={`px-2 py-1 text-[10px] font-medium rounded ${gridType === 'ARITMETICA'
                                ? 'bg-[#1E2329] text-[#F0B90B] border border-[#F0B90B]/50'
                                : 'text-[#848E9C] hover:text-white'
                                }`}
                        >
                            Aritmética
                        </button>
                        <button
                            onClick={() => setGridType('GEOMETRICA')}
                            className={`px-2 py-1 text-[10px] font-medium rounded ${gridType === 'GEOMETRICA'
                                ? 'bg-[#1E2329] text-[#F0B90B] border border-[#F0B90B]/50'
                                : 'text-[#848E9C] hover:text-white'
                                }`}
                        >
                            Geométrica
                        </button>
                    </div>
                </div>
                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors">
                    <input
                        type="number"
                        value={grids}
                        onChange={(e) => setGrids(e.target.value)}
                        placeholder="12"
                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                    />
                </div>
            </div>

            {/* Investment (Grid Only) */}
            <div>
                <label className="text-sm text-white font-medium block mb-2">Inversión total</label>
                <div className="bg-[#2B3139] rounded flex items-center px-3 border border-transparent focus-within:border-[#F0B90B] transition-colors mb-1">
                    <input
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value)}
                        placeholder="1,000.00"
                        className="w-full bg-transparent py-2 text-white text-sm focus:outline-none placeholder-[#848E9C]"
                    />
                    <span className="text-[#848E9C] text-sm font-medium">USDT</span>
                </div>
                <div className="text-xs text-[#848E9C] text-right">Por grid: {(parseFloat(investment) / (parseInt(grids) || 1) || 0).toFixed(2)} USDT</div>
            </div>
        </>
    );
};

export default GridConfigFields;
