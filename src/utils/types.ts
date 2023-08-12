export type RemoveDrawnObjType = 'byGroup' | 'default';

export type ResponseTypeCustom = {
  isSuccess: boolean;
  message: string | null;
};

export type Paper = {
  id: string;
  name: string;
  isTemplate: boolean;
  value: string;
  createdAt: string;
  updatedAt: string;
  Paper_Users: Paper_Users[];
  DrawnObjects: DrawnObject[];
};

export type Paper_Users = {
  role: PAPER_USER_ROLE;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  PaperId: string;
};

export type DrawnObject = {
  id: string;
  [key: string]: any;
};

enum PAPER_USER_ROLE {
  EDIT = 'edit',
  READ = 'read',
  COMMENT = 'comment',
  ADMIN = 'admin',
  NO_ACCESS = 'noAccess',
}
