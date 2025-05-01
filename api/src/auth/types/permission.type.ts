export enum Role {
  Customer = 'customer',
  Admin = 'admin',
}

export enum Resource {
  CustomerProfile = 'customer-profile',
  EmployeeProfile = 'employee-profile',
  MenuItem = 'menu-item',
  Category = 'category',
  Order = 'order',
}

export enum Action {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Permission = {
  action: Action;
  resource: Resource;
  possession: 'own' | 'any';
};
