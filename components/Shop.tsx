import React from 'react';
import { Product } from '../types';
import { Smartphone, Zap, Shield, Star } from 'lucide-react';

interface Props {
    products: Product[];
    currencySymbol: string;
    getPrice: (level: number) => number;
    onAddToCart: (product: Product) => void;
}

const Shop: React.FC<Props> = ({ products, currencySymbol, getPrice, onAddToCart }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-green mb-4">Latest Arrivals</h2>
                <div className="h-1 w-24 bg-brand-orange mx-auto rounded-full mb-4"></div>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Discover our curated selection of premium smartphones at 
                    <span className="font-semibold text-brand-green ml-1">unbeatable global prices</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div 
                        key={product.id}
                        className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:border-brand-green/30 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        {/* Card Header (Placeholder for Image) */}
                        <div className="h-40 bg-gradient-to-br from-brand-light to-[#f0fff4] flex flex-col items-center justify-center relative p-6">
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-brand-green text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                IN STOCK
                            </div>
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-brand-green mb-2 group-hover:scale-110 transition-transform duration-300">
                                <Smartphone size={40} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold tracking-wider text-brand-orange uppercase">{product.brand}</span>
                                <div className="flex text-yellow-400 gap-0.5">
                                    <Star size={12} fill="currentColor" />
                                    <Star size={12} fill="currentColor" />
                                    <Star size={12} fill="currentColor" />
                                    <Star size={12} fill="currentColor" />
                                    <Star size={12} fill="currentColor" />
                                </div>
                            </div>
                            
                            <h3 className="text-gray-900 font-bold text-xl mb-4 leading-tight">{product.model}</h3>
                            
                            {/* Mock Specs */}
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                                    <Zap size={14} className="text-brand-green" />
                                    <span>5G Ready</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                                    <Shield size={14} className="text-brand-green" />
                                    <span>1 Yr Warranty</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400 text-sm font-medium">Price</span>
                                    <span className="text-2xl font-bold text-brand-green">
                                        {currencySymbol}{getPrice(product.priceLevel).toLocaleString()}
                                    </span>
                                </div>
                                
                                <button 
                                    onClick={() => onAddToCart(product)}
                                    className="w-full bg-gray-900 hover:bg-brand-orange text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;