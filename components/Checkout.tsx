import React, { useState } from 'react';
import { CartItem, Country } from '../types';
import { COUNTRIES } from '../constants';

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
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-brand-green mb-8 text-center">Checkout Securely</h2>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Order Summary */}
                <div className="order-2 md:order-1 bg-white p-6 rounded-2xl shadow-lg h-fit border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Order Summary</h3>
                    
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-semibold text-gray-700">{item.brand} {item.model}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <div className="font-bold text-brand-green">
                                        {currencySymbol}{(getPrice(item.priceLevel) * item.qty).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 pt-4 border-t-2 border-brand-green/10">
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span className="text-brand-orange">{currencySymbol}{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="order-1 md:order-2 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Shipping Details</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Full Name - Text Only */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                         {/* Country (Read-only for context, or selectable) */}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                            <div className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-600 font-medium">
                                {selectedCountry.name}
                            </div>
                        </div>

                        {/* State & Address - Text */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">State/Province</label>
                                <input 
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition"
                                    placeholder="Lagos"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Postal Code</label>
                                <input 
                                    type="number"
                                    inputMode="numeric"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition"
                                    placeholder="100001"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
                            <input 
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition"
                                placeholder="123 Market Road"
                                required
                            />
                        </div>

                        {/* Phone Number - Country Code + Number Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <div className="flex">
                                <div className="relative w-1/3 min-w-[120px]">
                                    <select
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                        className="w-full appearance-none h-full px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-brand-green focus:z-10 outline-none"
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
                                    className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition"
                                    placeholder="8012345678"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Select code and enter number only.</p>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-brand-orange text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-brand-green transform transition-all duration-200 hover:-translate-y-1 mt-4"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;