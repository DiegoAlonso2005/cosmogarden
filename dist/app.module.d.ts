import { Repository } from 'typeorm';
export declare class Product {
    id?: number;
    code?: string;
    name?: string;
    species?: string;
    category?: string;
    location?: string;
    price?: number;
    stock?: number;
    health?: string;
    watered?: string;
    image?: string;
    createdAt?: Date;
}
export declare class User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}
export declare class Sale {
    id?: number;
    code?: string;
    client?: string;
    date?: Date;
    total?: number;
    payment?: string;
    status?: string;
}
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    create(data: Partial<Product>): Promise<Partial<Product> & Product>;
    update(id: number, data: Partial<Product>): Promise<Product | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    create(data: Partial<User>): Promise<Partial<User> & User>;
    resetPassword(email: string, newPassword: string): Promise<{
        ok: boolean;
    }>;
    login(email: string, pass: string): Promise<User | null>;
}
export declare class SaleService {
    private saleRepository;
    constructor(saleRepository: Repository<Sale>);
    findAll(): Promise<Sale[]>;
    create(data: Partial<Sale>): Promise<Partial<Sale> & Sale>;
}
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<Product[]>;
    save(data: Partial<Product>): Promise<Partial<Product> & Product>;
    update(id: string, data: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): Promise<User[]>;
    save(data: Partial<User>): Promise<Partial<User> & User>;
    resetPassword(body: {
        email: string;
        newPassword: string;
    }): Promise<{
        ok: boolean;
    }>;
    login(body: {
        email: string;
        password?: string;
    }): Promise<{
        user: null;
        message: string;
    } | {
        user: User;
        message: string;
    }>;
}
export declare class SaleController {
    private readonly saleService;
    constructor(saleService: SaleService);
    getAll(): Promise<Sale[]>;
    save(data: Partial<Sale>): Promise<Partial<Sale> & Sale>;
}
export declare class AppModule {
}
