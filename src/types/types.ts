import { moreProperties } from '@/store/socketio_store';

export type RemoveDrawnObjType = 'byGroup' | 'default';

export type ResponseTypeCustom = {
  isSuccess: boolean;
  message: string | null;
};

export type Member = {
  role: string;
  createdAt: string;
  updatedAt: string;
  User: { id: string; username: string };
};

export type Paper = {
  id: string;
  name: string;
  isTemplate: boolean;
  value: string;
  createdAt: string;
  updatedAt: string;
  Paper_Users: Paper_Users[];
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
  value: string;
  PaperId: string;
  ChangeLog: {
    id: string;
    type: 'add' | 'update' | 'delete';
    createdAt: string;
    updatedAt: string;
    DrawnObjectId: string;
    UserId: string;
    User: { id: string; username: 'Le Minh' };
  };
};

const morePP = [
  'id',
  'isLocked',
  'frameId',
  'isFrameLabel',
  'frameLabel',
  'fromEmit',
  'ct_hightLightPen',
] as const;
type MorePropertiesType = (typeof morePP)[number];

export type CanvasObjectType = {
  id: string;
  [key: string]: any;
} & fabric.Object &
  fabric.Group & { [K in MorePropertiesType]: any };

export enum PAPER_USER_ROLE {
  EDIT = 'edit',
  READ = 'read',
  COMMENT = 'comment',
  ADMIN = 'admin',
  NO_ACCESS = 'noAccess',
}

export type MousePointer = {
  x: number;
  y: number;
};

export type TemplateType = {
  User: IUser;
  category: string;
  createdAt: string;
  id: string;
  name: string;
  shareState: string;
  updatedAt: string;
};

export interface IUser {
  id: string;
  email: string;
  username: string;
}
