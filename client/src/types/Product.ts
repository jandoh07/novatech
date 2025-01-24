export interface Product {
    _id?: string;
    name: string;
    price: number;
    brand: string;
    description?: string;
    imageUrl: string[];
    category: string;
    stock: number;
    specs?: Spec[];
    discount?: Discount;
    rating?: Rating;
}

export interface Spec {
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

export interface Pagination {
    totalPages: number;
    currentPage: number;
    totalCount: number;
}