import { Logger, Module } from '@nestjs/common';
import { PermissionModule } from 'src/permission/permission.module';
import { ProductModule } from 'src/product/product.module';
import { MysqlDatabaseProviderModule } from 'src/providers/db/mysql/provider.module';
import { Seeder } from './seeder';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [MysqlDatabaseProviderModule, PermissionModule, ProductModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
