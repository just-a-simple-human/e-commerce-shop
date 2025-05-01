import { Role, Action, Permission, Resource } from './types/permission.type';

class PermissionChecker {
  constructor() {
    this.permissions = {
      admin: {
        create: { any: [], own: [] },
        read: { any: [], own: [] },
        update: { any: [], own: [] },
        delete: { any: [], own: [] },
      },
      customer: {
        create: { any: [], own: [] },
        read: { any: [], own: [] },
        update: { any: [], own: [] },
        delete: { any: [], own: [] },
      },
    };
  }
  currentRole: Role;
  permissions: {
    [role in Role]: {
      [action in Action]: {
        [possession in 'any' | 'own']: Resource[];
      };
    };
  };
  grant(role: Role) {
    this.currentRole = role;
    return this;
  }
  createOwn(...resourses: Resource[]) {
    this.permissions[this.currentRole].create.own.push(...resourses);
    return this;
  }
  readOwn(...resourses: Resource[]) {
    this.permissions[this.currentRole].read.own.push(...resourses);
    return this;
  }
  updateOwn(...resourses: Resource[]) {
    this.permissions[this.currentRole].update.own.push(...resourses);
    return this;
  }
  deleteOwn(...resourses: Resource[]) {
    this.permissions[this.currentRole].delete.own.push(...resourses);
    return this;
  }
  createAny(...resourses: Resource[]) {
    this.permissions[this.currentRole].create.any.push(...resourses);
    this.createOwn(...resourses);
    return this;
  }
  readAny(...resourses: Resource[]) {
    this.permissions[this.currentRole].read.any.push(...resourses);
    this.readOwn(...resourses);
    return this;
  }
  updateAny(...resourses: Resource[]) {
    this.permissions[this.currentRole].update.any.push(...resourses);
    this.updateOwn(...resourses);
    return this;
  }
  deleteAny(...resourses: Resource[]) {
    this.permissions[this.currentRole].delete.any.push(...resourses);
    this.deleteOwn(...resourses);
    return this;
  }
  can(role: Role, { action, resource, possession }: Permission) {
    return this.permissions[role][action][possession].includes(resource);
  }
}

const permissionChecker = new PermissionChecker();

permissionChecker
  .grant(Role.Admin)
  .createAny(Resource.MenuItem, Resource.Category)
  .readAny(
    Resource.CustomerProfile,
    Resource.MenuItem,
    Resource.Category,
    Resource.Order,
  )
  .grant(Role.Customer)
  .readOwn(Resource.CustomerProfile, Resource.Order)
  .createOwn(Resource.CustomerProfile, Resource.Order);

export { permissionChecker };
