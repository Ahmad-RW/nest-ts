import { Seeder } from 'typeorm-seeding';
import { In } from 'typeorm';
import { Role } from '../../auth/entities/role.entity';
import { Permissions } from '../../auth/enums/permission.enum';
import { RoleId } from '../../auth/enums/role.enum';
import { Permission } from '../../auth/entities/permission.entity';

export default class RolesPermissionsSeeder implements Seeder {
  public async run(): Promise<any> {
    // const entityManager = connection.createEntityManager();

    //first persist all system permissions.
    await this.seedPermissions();

    //create the different roles of the system and assign each role their permissions
    const adminRole = new Role();
    adminRole.id = RoleId.admin;
    adminRole.name = 'admin';
    adminRole.permissions = await this.getAdminPermissions();
    await adminRole.save();
    // await entityManager.save(adminRole)

    const dummyRole = new Role();
    dummyRole.id = RoleId.dummy;
    dummyRole.name = 'dummy';
    dummyRole.permissions = await this.getDummyPermissions();
    await dummyRole.save();
    // await entityManager.save(dummyRole)
  }

  private async getAdminPermissions(): Promise<Permission[]> {
    return await Permission.find({
      where: { name: In(Object.values(Permissions)) },
    });
    // return await entityManager.find(Permission, { where: { name: In(Object.values(Permissions)) } })
  }

  private async seedPermissions(): Promise<void> {
    let id = 0;
    for (const permission in Permissions) {
      const permissionEntity = new Permission();
      permissionEntity.name = Permissions[permission];
      permissionEntity.id = ++id;
      // await entityManager.save(permissionEntity)
      await permissionEntity.save();
    }
  }

  private async getDummyPermissions(): Promise<Permission[]> {
    return await Permission.find({
      where: { name: In([Permissions.viewOwnProfile]) },
    });
    // return await entityManager.find(Permission, {where : {name: In([Permissions.viewOwnProfile])}})
  }
}
