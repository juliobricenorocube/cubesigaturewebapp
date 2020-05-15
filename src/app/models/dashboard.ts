export class ListAdminDashboard {
  row: number;
  ServerStoredProcedure: string;
  Name: string;
  Description: string;
  ComponentTypeName: string;
  ComponentID: number;
  ComponentTypeID: number;
  RecordsCount: number;
  ComponentsvsID: string;
  DashboardComponentsServicesID: number;
}

export class NewComponentConfig {
  ComponentId: number;
  Name: string;
  Description: string;
  ComponentTypeId: number;
  DataSource: number;
  // DashboardComponentsServicesID: number;
  ComponentsModule: any = [];
  ComponentsUserGroup: any = [];
}
