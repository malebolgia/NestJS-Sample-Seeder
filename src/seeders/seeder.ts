import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly permisssionSeederService: PermissionService,
  ) {}
  async seed() {
    await this.permissions()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding permissions...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding permissions...');
        Promise.reject(error);
      });
  }
  async permissions() {
    return await Promise.all(this.permisssionSeederService.createMany())
      .then((createdLanguages) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of permissions created : ' +
            // Remove all null values and return only created permissions.
            createdLanguages.filter(
              (nullValueOrCreatedPermission) => nullValueOrCreatedPermission,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
