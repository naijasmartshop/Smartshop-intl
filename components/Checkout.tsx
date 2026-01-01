import React, { useState } from 'react';
import { CartItem, Country } from '../types';
import { COUNTRIES } from '../constants';
import { Lock, ShieldCheck } from 'lucide-react';

interface Props {
    cart: CartItem[];
    selectedCountry: Country;
    currencySymbol: string;
    total: number;
    getPrice: (level: number) => number;
    onSuccess: () => void;
}

const Checkout: React.FC<Props> = ({ cart, selectedCountry, currencySymbol, total, getPrice, onSuccess }) => {
    // Form state
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [phoneCode, setPhoneCode] = useState(selectedCountry.dial_code);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    
    // Sort countries for the phone code selector so it's easier to find
    const sortedCountries = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to payment.html as requested
        window.location.href = 'payment.html';
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h2>
                <div className="flex justify-center items-center gap-2 text-brand-green font-medium text-sm">
                    <Lock size={16} />
                    <span>256-bit SSL Encrypted</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Order Summary */}
                <div className="order-2 md:order-1 bg-white p-6 rounded-2xl shadow-lg h-fit border border-gray-100 sticky top-24">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Your Cart</h3>
                    
                    {cart.length === 0 ? (
                        <p className="text-gray-500 italic">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-start py-3 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.brand} {item.model}</p>
                                        <p className="text-sm text-gray-500 mt-1">Qty: {item.qty}</p>
                                    </div>
                                    <div className="font-bold text-gray-900">
                                        {currencySymbol}{(getPrice(item.priceLevel) * item.qty).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
                        <div className="flex justify-between items-center mb-2 text-gray-500">
                            <span>Subtotal</span>
                            <span>{currencySymbol}{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 text-gray-500">
                            <span>Shipping</span>
                            <span className="text-brand-green font-medium">Free</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2 border-t border-gray-100">
                            <span>Total</span>
                            <span className="text-brand-orange">{currencySymbol}{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="order-1 md:order-2 bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-brand-light p-2 rounded-full text-brand-green">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Shipping Information</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Full Name - Text Only */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                         {/* Country (Read-only for context, or selectable) */}
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Country</label>
                            <div className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 font-medium flex justify-between items-center">
                                <span>{selectedCountry.name}</span>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-500">{selectedCountry.code}</span>
                            </div>
                        </div>

                        {/* State & Address - Text */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">State/Province</label>
                                <input 
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                    placeholder="Lagos"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Postal Code</label>
                                <input 
                                    type="number"
                                    inputMode="numeric"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                    placeholder="100001"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Street Address</label>
                            <input 
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                placeholder="123 Market Road, Apt 4B"
                                required
                            />
                        </div>

                        {/* Phone Number - Country Code + Number Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                            <div className="flex">
                                <div className="relative w-1/3 min-w-[120px]">
                                    <select
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                        className="w-full appearance-none h-full px-4 py-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-100 text-gray-700 font-medium focus:ring-2 focus:ring-brand-green focus:z-10 outline-none cursor-pointer"
                                    >
                                        {sortedCountries.map((c) => (
                                            <option key={c.code} value={c.dial_code}>
                                                {c.code} ({c.dial_code})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </div>
                                </div>
                                <input 
                                    type="number"
                                    inputMode="numeric"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                                    placeholder="8012345678"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-brand-green hover:bg-brand-orange text-white text-lg font-bold py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:-translate-y-1 mt-6 flex justify-center items-center gap-2"
                        >
                            <Lock size={20} />
                            Proceed to Payment
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            You will be redirected to our secure payment gateway to complete your purchase.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;