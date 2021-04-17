import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/model/permission.entity';

/**
 * Import and provide base typeorm (mysql) related classes.
 *
 * @module
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db_nest_app',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      entities: [Permission],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class MysqlDatabaseProviderModule {}
