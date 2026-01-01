import React from 'react';
import { Product } from '../types';
import { Smartphone } from 'lucide-react';

interface Props {
    products: Product[];
    currencySymbol: string;
    getPrice: (level: number) => number;
    onAddToCart: (product: Product) => void;
}

const Shop: React.FC<Props> = ({ products, currencySymbol, getPrice, onAddToCart }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-3">Premium Smartphones</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore our exclusive collection. 
                    <span className="font-semibold text-brand-orange ml-1">Limited Time Giveaway Prices!</span>
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div 
                        key={product.id}
                        className="group bg-white rounded-[20px] p-6 border-[1.5px] border-[#e3f6e3] hover:border-brand-orange shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4 text-brand-green">
                            <Smartphone size={32} />
                        </div>

                        <h3 className="text-brand-green font-bold text-xl mb-1">{product.brand}</h3>
                        <p className="text-gray-700 font-medium mb-6 text-center h-8 flex items-center justify-center">
                            {product.model}
                        </p>

                        <div className="w-full mt-auto">
                            <div className="bg-gradient-to-r from-[#fffbe9] to-[#ffe9ae] text-brand-green font-bold text-2xl py-3 px-4 rounded-xl text-center shadow-inner mb-4">
                                {currencySymbol}{getPrice(product.priceLevel).toLocaleString()}
                            </div>
                            
                            <button 
                                onClick={() => onAddToCart(product)}
                                className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl shadow-md hover:bg-brand-green transition-colors active:scale-95"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;