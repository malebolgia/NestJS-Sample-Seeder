import { Logger, Module } from '@nestjs/common';
import { PermissionModule } from 'src/permission/permission.module';
import { PermissionService } from 'src/permission/permission.service';
import { MysqlDatabaseProviderModule } from 'src/providers/db/mysql/provider.module';
import { Seeder } from './seeder';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [MysqlDatabaseProviderModule, PermissionModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
