import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, ViewState, Country } from './types';
import { PHONE_MODELS, COUNTRIES } from './constants';
import { ShoppingCart, ArrowLeft, CheckCircle, Smartphone } from 'lucide-react';
import CountrySelector from './components/CountrySelector';
import Shop from './components/Shop';
import Checkout from './components/Checkout';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>('COUNTRY_SELECT');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const updateQty = (id: string, delta: number) => {
        setCart(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, qty: Math.max(1, p.qty + delta) };
            }
            return p;
        }));
    };

    const clearCart = () => setCart([]);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setView('SHOP');
    };

    // Calculate Dynamic Prices based on Country
    // Nigeria: 70,000 - 100,000 NGN
    // Others: 500 - 1,000 USD (or equivalent currency symbol)
    const getPrice = (priceLevel: number): number => {
        if (selectedCountry?.code === 'NG') {
            const min = 70000;
            const max = 100000;
            return Math.round(min + (max - min) * priceLevel);
        } else {
            const min = 500;
            const max = 1000;
            return Math.round(min + (max - min) * priceLevel);
        }
    };

    const getCurrencySymbol = () => {
        if (selectedCountry?.code === 'NG') return '₦';
        if (selectedCountry?.currency === 'EUR') return '€';
        if (selectedCountry?.currency === 'GBP') return '£';
        if (selectedCountry?.currency === 'JPY') return '¥';
        return '$'; // Default to Dollar for international
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + (getPrice(item.priceLevel) * item.qty), 0);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800">
            {/* Header */}
            {view !== 'COUNTRY_SELECT' && (
                <header className="bg-brand-green text-white p-6 shadow-lg rounded-b-[25px] sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-wider flex items-center gap-2">
                                <Smartphone size={28} />
                                SmartShop <span className="text-brand-orange">Intl.</span>
                            </h1>
                            {selectedCountry && (
                                <p className="text-xs text-brand-light mt-1 opacity-90">
                                    Shopping in {selectedCountry.name} ({selectedCountry.currency})
                                </p>
                            )}
                        </div>
                        {view === 'SHOP' && cart.length > 0 && (
                             <button 
                                onClick={() => setView('CHECKOUT')}
                                className="bg-brand-orange hover:bg-white hover:text-brand-green text-white font-bold py-2 px-4 rounded-full transition shadow-md flex items-center gap-2"
                            >
                                <ShoppingCart size={20} />
                                <span>{getCurrencySymbol()}{calculateTotal().toLocaleString()}</span>
                            </button>
                        )}
                        {view === 'CHECKOUT' && (
                             <button 
                                onClick={() => setView('SHOP')}
                                className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full transition flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                        )}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-grow">
                {view === 'COUNTRY_SELECT' && (
                    <CountrySelector onSelect={handleCountrySelect} />
                )}

                {view === 'SHOP' && selectedCountry && (
                    <Shop 
                        products={PHONE_MODELS} 
                        currencySymbol={getCurrencySymbol()} 
                        getPrice={getPrice}
                        onAddToCart={addToCart}
                    />
                )}

                {view === 'CHECKOUT' && selectedCountry && (
                    <Checkout 
                        cart={cart}
                        selectedCountry={selectedCountry}
                        currencySymbol={getCurrencySymbol()}
                        getPrice={getPrice}
                        total={calculateTotal()}
                        onSuccess={() => {
                            clearCart();
                            setView('SUCCESS');
                        }}
                    />
                )}

                {view === 'SUCCESS' && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-6 text-center animate-fade-in">
                        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border-4 border-brand-green/20">
                            <div className="text-brand-green mb-6 flex justify-center">
                                <CheckCircle size={80} fill="#e3f6e3" />
                            </div>
                            <h2 className="text-3xl font-bold text-brand-green mb-4">Order Confirmed!</h2>
                            <p className="text-gray-600 mb-8">
                                Thank you for shopping with SmartShop International. Your order has been received and is being processed.
                            </p>
                            <button 
                                onClick={() => setView('SHOP')}
                                className="w-full bg-brand-green text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-orange transition duration-300"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Cart Bar (Shop View Only) */}
            {view === 'SHOP' && cart.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#fffbe9] via-[#eaffea] to-[#fffbe9] border-t-2 border-brand-green/10 shadow-[0_-5px_20px_rgba(18,119,12,0.15)] p-4 z-40 animate-slide-up">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-brand-green font-bold text-lg tracking-wide">
                                Total: {getCurrencySymbol()}{calculateTotal().toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm hidden sm:block truncate max-w-md">
                                {cart.map(i => `${i.qty}x ${i.brand} ${i.model}`).join(', ')}
                            </span>
                        </div>
                        <button 
                            onClick={() => setView('CHECKOUT')}
                            className="bg-brand-orange hover:bg-brand-green text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;