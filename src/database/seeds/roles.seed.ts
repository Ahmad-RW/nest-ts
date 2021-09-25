import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, EntityManager, In } from 'typeorm'
import { Role } from '../../auth/entities/role.entity'
import { Permissions } from '../../auth/enums/permission.enum'
import { RoleId } from '../../auth/enums/role.enum'
import { Permission } from '../../auth/entities/permission.entity'

export default class RolesPermissionsSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const entityManager = connection.createEntityManager()
        

        //first persist all system permissions.
        await this.seedPermissions(entityManager)

        //create the different roles of the system and assign each role their permissions
        const adminRole = new Role()
        adminRole.id = RoleId.admin
        adminRole.name = "admin"
        adminRole.permissions = await this.getAdminPermissions(entityManager)
        await adminRole.save()
        // await entityManager.save(adminRole)
        


        const dummyRole = new Role()
        dummyRole.id = RoleId.dummy
        dummyRole.name = 'dummy'
        dummyRole.permissions = await this.getDummyPermissions(entityManager)
        await dummyRole.save()
        // await entityManager.save(dummyRole)
    }



    private async getAdminPermissions(entityManager : EntityManager): Promise<Permission[]> {
        return await Permission.find({ where: { name: In(Object.values(Permissions)) } })
        // return await entityManager.find(Permission, { where: { name: In(Object.values(Permissions)) } })
    }

    private async seedPermissions(entityManager : EntityManager): Promise<void> {
        let id: number = 0;
        for (let permission in Permissions) {

            let permissionEntity = new Permission()
            permissionEntity.name = Permissions[permission]
            permissionEntity.id = ++id
            // await entityManager.save(permissionEntity)
            await permissionEntity.save()
        }
    }

    private async getDummyPermissions(entityManager : EntityManager): Promise<Permission[]> {
        return await Permission.find({ where: { name: In([Permissions.viewOwnProfile]) } })
        // return await entityManager.find(Permission, {where : {name: In([Permissions.viewOwnProfile])}})
    }

}