import { Repo } from "../../core/infra/Repo";
import { Role } from "../../domain/role";
import { RoleId } from "../../domain/valueObj/roleId";

export default interface IRoleRepo extends Repo<Role> {
  save(role: Role): Promise<Role>;
  findByDomainId (roleId: RoleId | string): Promise<Role>;

  getRoles (): Promise<Role[]>;
  getRoleById (roleId: RoleId | string): Promise<Role>;
  delete(roleId: RoleId | string): Promise<boolean>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}