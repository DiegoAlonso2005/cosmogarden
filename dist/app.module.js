"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.SaleController = exports.UserController = exports.ProductController = exports.SaleService = exports.UserService = exports.ProductService = exports.Sale = exports.User = exports.Product = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
let Product = class Product {
    id;
    code;
    name;
    species;
    category;
    location;
    price;
    stock;
    health;
    watered;
    image;
    createdAt;
};
exports.Product = Product;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "species", void 0);
__decorate([
    (0, typeorm_2.Column)({ default: 'All' }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "location", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_2.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_2.Column)({ default: 'Excelente' }),
    __metadata("design:type", String)
], Product.prototype, "health", void 0);
__decorate([
    (0, typeorm_2.Column)({ default: 'Hace 1 día' }),
    __metadata("design:type", String)
], Product.prototype, "watered", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_2.Entity)('product')
], Product);
let User = class User {
    id;
    name;
    email;
    password;
    role;
};
exports.User = User;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_2.Column)({ default: 'empleado' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, typeorm_2.Entity)('user')
], User);
let Sale = class Sale {
    id;
    code;
    client;
    date;
    total;
    payment;
    status;
};
exports.Sale = Sale;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "code", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "client", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sale.prototype, "date", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "total", void 0);
__decorate([
    (0, typeorm_2.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sale.prototype, "payment", void 0);
__decorate([
    (0, typeorm_2.Column)({ default: 'Completada' }),
    __metadata("design:type", String)
], Sale.prototype, "status", void 0);
exports.Sale = Sale = __decorate([
    (0, typeorm_2.Entity)('sale')
], Sale);
let ProductService = class ProductService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    findAll() { return this.productRepository.find({ order: { id: 'DESC' } }); }
    create(data) { return this.productRepository.save(data); }
    async update(id, data) { await this.productRepository.update(id, data); return this.productRepository.findOneBy({ id }); }
    async remove(id) { await this.productRepository.delete(id); return { deleted: true }; }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findAll() { return this.userRepository.find(); }
    async create(data) {
        if (data.password) {
            const saltRounds = 10;
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
        return this.userRepository.save(data);
    }
    async resetPassword(email, newPassword) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { ok: true };
        }
        const saltRounds = 10;
        const hashed = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashed;
        await this.userRepository.save(user);
        return { ok: true };
    }
    async login(email, pass) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            return null;
        const isMatch = await bcrypt.compare(pass, user.password || '');
        if (!isMatch)
            return null;
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
let SaleService = class SaleService {
    saleRepository;
    constructor(saleRepository) {
        this.saleRepository = saleRepository;
    }
    findAll() { return this.saleRepository.find({ order: { id: 'DESC' } }); }
    create(data) { return this.saleRepository.save(data); }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Sale)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SaleService);
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    getAll() { return this.productService.findAll(); }
    save(data) { return this.productService.create(data); }
    update(id, data) { return this.productService.update(+id, data); }
    delete(id) { return this.productService.remove(+id); }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "save", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [ProductService])
], ProductController);
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAll() { return this.userService.findAll(); }
    save(data) { return this.userService.create(data); }
    async resetPassword(body) {
        const { email, newPassword } = body;
        return this.userService.resetPassword(email, newPassword);
    }
    async login(body) {
        const user = await this.userService.login(body.email, body.password || '');
        if (!user) {
            return { user: null, message: 'Correo o contraseña incorrectos' };
        }
        return { user: user, message: 'Inicio de sesión exitoso' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "save", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [UserService])
], UserController);
let SaleController = class SaleController {
    saleService;
    constructor(saleService) {
        this.saleService = saleService;
    }
    getAll() { return this.saleService.findAll(); }
    save(data) { return this.saleService.create(data); }
};
exports.SaleController = SaleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "save", null);
exports.SaleController = SaleController = __decorate([
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [SaleService])
], SaleController);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: 'postgresql://pi:ZBzCoTjqEBkX3oJAFG7kp7DnwDPqbPEr@dpg-d8c6i7f7f7vs73b33npg-a.virginia-postgres.render.com/pi_wt35',
                entities: [Product, User, Sale],
                synchronize: true,
                ssl: true,
                extra: {
                    ssl: {
                        rejectUnauthorized: false,
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([Product, User, Sale]),
        ],
        controllers: [ProductController, UserController, SaleController],
        providers: [ProductService, UserService, SaleService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map