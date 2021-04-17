import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permissions } from 'src/seeders/permission/data';
import { Repository } from 'typeorm';
import { Permission } from './model/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  async all(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }
  /**
   * Seed all permissions.
   *
   * @function
   */
  createMany(): Array<Promise<Permission>> {
    return permissions.map(async (permission: Permission) => {
      return await this.permissionRepository
        .findOne({ name: permission.name })
        .then(async (thePermission) => {
          // We check if a permission already exists.
          // If it does don't create a new one.
          if (thePermission) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.permissionRepository.save(permission),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
