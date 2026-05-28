import { Module, Controller, Get, Post, Put, Body, Param, Delete, Injectable } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt'; // 🔐 Para encriptar y comparar la contraseña

// =====================================================================
// 🗄️ ENTIDADES DE LA BASE DE DATOS (Mapeadas a PostgreSQL de Render)
// =====================================================================

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn() id?: number;
  @Column({ unique: true, nullable: true }) code?: string;
  @Column() name?: string;
  @Column({ nullable: true }) species?: string;
  @Column({ default: 'All' }) category?: string;
  @Column({ nullable: true }) location?: string;
  @Column({ type: 'float', default: 0 }) price?: number;
  @Column({ default: 0 }) stock?: number;
  @Column({ default: 'Excelente' }) health?: string;
  @Column({ default: 'Hace 1 día' }) watered?: string;
  @Column({ type: 'text', nullable: true }) image?: string; // 👈 Cambiado 'longtext' por 'text' para que sea compatible con Postgres
  @CreateDateColumn() createdAt?: Date;
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn() id?: number;
  @Column() name?: string;
  @Column({ unique: true }) email?: string;
  @Column() password?: string;
  @Column({ default: 'empleado' }) role?: string;
}

@Entity('sale')
export class Sale {
  @PrimaryGeneratedColumn() id?: number;
  @Column({ nullable: true }) code?: string;
  @Column({ nullable: true }) client?: string;
  @CreateDateColumn() date?: Date;
  @Column({ type: 'float', default: 0 }) total?: number;
  @Column({ nullable: true }) payment?: string;
  @Column({ default: 'Completada' }) status?: string;
}

// =====================================================================
// ⚙️ SERVICIOS (Consultas mediante TypeORM)
// =====================================================================

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll() { return this.productRepository.find({ order: { id: 'DESC' } }); }
  create(data: Partial<Product>) { return this.productRepository.save(data); }
  async update(id: number, data: Partial<Product>) { await this.productRepository.update(id, data); return this.productRepository.findOneBy({ id }); }
  async remove(id: number) { await this.productRepository.delete(id); return { deleted: true }; }
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() { return this.userRepository.find(); }
  
  async create(data: Partial<User>) { 
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    return this.userRepository.save(data); 
  }

  async resetPassword(email: string, newPassword: string) {
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

  async login(email: string, pass: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password || '');
    if (!isMatch) return null;

    return user;
  }
}

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  findAll() { return this.saleRepository.find({ order: { id: 'DESC' } }); }
  create(data: Partial<Sale>) { return this.saleRepository.save(data); }
}

// =====================================================================
// 🕹️ CONTROLADORES (Endpoints)
// =====================================================================

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get() getAll() { return this.productService.findAll(); }
  @Post() save(@Body() data: Partial<Product>) { return this.productService.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: Partial<Product>) { return this.productService.update(+id, data); }
  @Delete(':id') delete(@Param('id') id: string) { return this.productService.remove(+id); }
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() getAll() { return this.userService.findAll(); }
  @Post() save(@Body() data: Partial<User>) { return this.userService.create(data); }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; newPassword: string }) {
    const { email, newPassword } = body;
    return this.userService.resetPassword(email, newPassword);
  }

  @Post('login')
  async login(@Body() body: { email: string; password?: string }) {
    const user = await this.userService.login(body.email, body.password || '');
    if (!user) {
      return { user: null, message: 'Correo o contraseña incorrectos' };
    }
    return { user: user, message: 'Inicio de sesión exitoso' };
  }
}

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get() getAll() { return this.saleService.findAll(); }
  @Post() save(@Body() data: Partial<Sale>) { return this.saleService.create(data); }
}

// =====================================================================
// 📦 MÓDULO PRINCIPAL NESTJS (Configurado con URL externa de Render)
// =====================================================================

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // 👈 Cambiado a postgres
      url: 'postgresql://pi:ZBzCoTjqEBkX3oJAFG7kp7DnwDPqbPEr@dpg-d8c6i7f7f7vs73b33npg-a.virginia-postgres.render.com/pi_wt35', // 👈 Pasamos toda la URL directo aquí
      entities: [Product, User, Sale],
      synchronize: true, // Esto creará las tablas automáticamente en el Postgres de Render
      ssl: true, // 👈 Render exige SSL seguro para bases de datos en la nube
      extra: {
        ssl: {
          rejectUnauthorized: false, // Permite conexiones SSL auto-firmadas comunes en desarrollo/producción gratuita
        },
      },
    }),
    TypeOrmModule.forFeature([Product, User, Sale]),
  ],
  controllers: [ProductController, UserController, SaleController],
  providers: [ProductService, UserService, SaleService],
})
export class AppModule {}