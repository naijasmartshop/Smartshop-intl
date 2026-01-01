export interface Product {
    id: string;
    brand: string;
    model: string;
    priceLevel: number; // 0 to 1 scale to calculate dynamic price
}

export interface CartItem extends Product {
    qty: number;
}

export interface Country {
    name: string;
    code: string; // ISO code e.g., US, NG
    dial_code: string; // e.g., +1, +234
    currency: string; // e.g., USD, NGN
}

export type ViewState = 'COUNTRY_SELECT' | 'SHOP' | 'CHECKOUT' | 'SUCCESS';