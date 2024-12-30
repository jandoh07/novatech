export interface Product {
    name: string;
    price: number;
    brand: string;
    description?: string;
    imageUrl: string[];
    category: string;
    stock: number;
    specs?: Specs[];
    discount?: Discount;
    rating?: Rating;
}

export interface Specs {
    key: string;
    value: string;
    edit?: boolean;
}

export interface Discount {
    percentage: number;
    expiry: Date;
}

export interface Rating {
    count: number;
    value: number;
}