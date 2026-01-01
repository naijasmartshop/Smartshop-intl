import React, { useState } from 'react';
import { Country } from '../types';
import { COUNTRIES } from '../constants';
import { Globe } from 'lucide-react';

interface Props {
    onSelect: (country: Country) => void;
}

const CountrySelector: React.FC<Props> = ({ onSelect }) => {
    const [selectedCode, setSelectedCode] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const country = COUNTRIES.find(c => c.code === selectedCode);
        if (country) {
            onSelect(country);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-bg relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-brand-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl"></div>

            <div className="bg-white p-8 md:p-12 rounded-[30px] shadow-2xl max-w-lg w-full z-10 border border-white/50 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-brand-light p-4 rounded-full mb-4 shadow-inner">
                        <Globe size={48} className="text-brand-green" />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to SmartShop</h1>
                    <p className="text-center text-gray-500">Please select your location to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Select Country
                        </label>
                        <select
                            id="country"
                            value={selectedCode}
                            onChange={(e) => setSelectedCode(e.target.value)}
                            className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-brand-green focus:border-transparent transition appearance-none cursor-pointer text-lg"
                            required
                        >
                            <option value="" disabled>Choose your country...</option>
                            {COUNTRIES.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.name} ({c.currency})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-8 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedCode}
                        className="w-full py-4 px-6 bg-brand-green hover:bg-brand-orange disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:-translate-y-1"
                    >
                        Start Shopping
                    </button>
                </form>
                
                <p className="mt-8 text-center text-xs text-gray-400">
                    By entering, you agree to our Terms & Conditions for international shipping.
                </p>
            </div>
        </div>
    );
};

export default CountrySelector;