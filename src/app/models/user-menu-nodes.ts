import { UserModules } from './user-modules';

export interface UserMenuNodes {
    id: number;
    moduleName: string;
    iconClass: string;
    parentId: number;
    userModules: Array<UserModules>;
}
