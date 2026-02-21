
import React from 'react';

interface CheckoutProgressBarProps {
    step: 1 | 2 | 3;
}

const CheckoutProgressBar: React.FC<CheckoutProgressBarProps> = ({ step }) => {
    return (
        <div className="mt-6 flex items-center space-x-4 text-sm">
            {/* Step 1: Registro */}
            <div className={`flex items-center ${step >= 1 ? 'text-[#F0B90B]' : 'text-[#474D57]'}`}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step > 1 ? 'bg-[#F0B90B] text-black font-bold' : (step === 1 ? 'border-2 border-[#F0B90B] text-[#F0B90B] font-bold' : 'border-2 border-[#2B3139] text-[#474D57] font-bold')} mr-2 text-xs`}>
                    {step > 1 ? '✓' : '1'}
                </span>
                Registro
            </div>

            <div className={`w-8 h-[1px] ${step >= 2 ? 'bg-[#F0B90B]' : 'bg-[#2B3139]'}`}></div>

            {/* Step 2: Pago */}
            <div className={`flex items-center ${step >= 2 ? 'text-[#F0B90B]' : 'text-[#474D57]'} ${step === 2 ? 'font-semibold' : ''}`}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step > 2 ? 'bg-[#F0B90B] text-black font-bold' : (step === 2 ? 'border-2 border-[#F0B90B] text-[#F0B90B] font-bold' : 'border-2 border-[#2B3139] text-[#474D57] font-bold')} mr-2 text-xs`}>
                    {step > 2 ? '✓' : '2'}
                </span>
                Pago
            </div>

            <div className={`w-8 h-[1px] ${step >= 3 ? 'bg-[#F0B90B]' : 'bg-[#2B3139]'}`}></div>

            {/* Step 3: Confirmación */}
            <div className={`flex items-center ${step >= 3 ? 'text-[#F0B90B]' : 'text-[#474D57]'} ${step === 3 ? 'font-semibold' : ''}`}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${step >= 3 ? 'border-2 border-[#F0B90B] text-[#F0B90B] font-bold' : 'border-2 border-[#2B3139] text-[#474D57] font-bold'} mr-2 text-xs`}>
                    3
                </span>
                Confirmación
            </div>
        </div>
    );
};

export default CheckoutProgressBar;
