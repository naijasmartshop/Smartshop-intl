import { Product, Country } from './types';

export const COUNTRIES: Country[] = [
    { name: "Nigeria", code: "NG", dial_code: "+234", currency: "NGN" },
    { name: "United States", code: "US", dial_code: "+1", currency: "USD" },
    { name: "United Kingdom", code: "GB", dial_code: "+44", currency: "GBP" },
    { name: "Canada", code: "CA", dial_code: "+1", currency: "CAD" },
    { name: "Ghana", code: "GH", dial_code: "+233", currency: "GHS" },
    { name: "South Africa", code: "ZA", dial_code: "+27", currency: "ZAR" },
    { name: "Kenya", code: "KE", dial_code: "+254", currency: "KES" },
    { name: "India", code: "IN", dial_code: "+91", currency: "INR" },
    { name: "China", code: "CN", dial_code: "+86", currency: "CNY" },
    { name: "Germany", code: "DE", dial_code: "+49", currency: "EUR" },
    { name: "France", code: "FR", dial_code: "+33", currency: "EUR" },
    { name: "Japan", code: "JP", dial_code: "+81", currency: "JPY" },
    { name: "Brazil", code: "BR", dial_code: "+55", currency: "BRL" },
    { name: "Australia", code: "AU", dial_code: "+61", currency: "AUD" },
    { name: "United Arab Emirates", code: "AE", dial_code: "+971", currency: "AED" },
];

// 0 = Cheapest (70k NGN / $500), 1 = Most Expensive (100k NGN / $1000)
export const PHONE_MODELS: Product[] = [
    // iPhone
    { id: 'ip1', brand: "iPhone", model: "iPhone 13 Pro", priceLevel: 0.9 },
    { id: 'ip2', brand: "iPhone", model: "iPhone 12", priceLevel: 0.7 },
    { id: 'ip3', brand: "iPhone", model: "iPhone SE 2022", priceLevel: 0.4 },
    { id: 'ip4', brand: "iPhone", model: "iPhone XR", priceLevel: 0.3 },
    { id: 'ip5', brand: "iPhone", model: "iPhone 11", priceLevel: 0.5 },
    // Samsung
    { id: 'sam1', brand: "Samsung", model: "Galaxy S21 Ultra", priceLevel: 1.0 },
    { id: 'sam2', brand: "Samsung", model: "Galaxy S20 FE", priceLevel: 0.6 },
    { id: 'sam3', brand: "Samsung", model: "Galaxy Note 20", priceLevel: 0.8 },
    { id: 'sam4', brand: "Samsung", model: "Galaxy A52", priceLevel: 0.2 },
    { id: 'sam5', brand: "Samsung", model: "Galaxy S10", priceLevel: 0.3 },
    // Infinix
    { id: 'inf1', brand: "Infinix", model: "Infinix Note 12", priceLevel: 0.1 },
    { id: 'inf2', brand: "Infinix", model: "Infinix Hot 10", priceLevel: 0.0 },
    { id: 'inf3', brand: "Infinix", model: "Infinix Smart 7", priceLevel: 0.15 },
    { id: 'inf4', brand: "Infinix", model: "Infinix S5", priceLevel: 0.05 },
    { id: 'inf5', brand: "Infinix", model: "Infinix Zero 8", priceLevel: 0.25 },
    // Tecno
    { id: 'tec1', brand: "Tecno", model: "Tecno Camon 19", priceLevel: 0.15 },
    { id: 'tec2', brand: "Tecno", model: "Tecno Spark 10", priceLevel: 0.1 },
    { id: 'tec3', brand: "Tecno", model: "Tecno Pop 6 Go", priceLevel: 0.0 },
    { id: 'tec4', brand: "Tecno", model: "Tecno Pova Neo", priceLevel: 0.12 },
    { id: 'tec5', brand: "Tecno", model: "Tecno Camon 15", priceLevel: 0.08 },
    // Xiaomi
    { id: 'xia1', brand: "Xiaomi", model: "Redmi Note 10 Pro", priceLevel: 0.5 },
    { id: 'xia2', brand: "Xiaomi", model: "Redmi Note 9", priceLevel: 0.3 },
    { id: 'xia3', brand: "Xiaomi", model: "Redmi 10C", priceLevel: 0.1 },
    { id: 'xia4', brand: "Xiaomi", model: "Poco X3 NFC", priceLevel: 0.35 },
    { id: 'xia5', brand: "Xiaomi", model: "Redmi 9A", priceLevel: 0.05 },
    // Oppo
    { id: 'opp1', brand: "Oppo", model: "Oppo Reno 8", priceLevel: 0.45 },
    { id: 'opp2', brand: "Oppo", model: "Oppo A74", priceLevel: 0.3 },
    { id: 'opp3', brand: "Oppo", model: "Oppo F19 Pro+", priceLevel: 0.35 },
    { id: 'opp4', brand: "Oppo", model: "Oppo A55", priceLevel: 0.2 },
    { id: 'opp5', brand: "Oppo", model: "Oppo Find X2", priceLevel: 0.6 }
];