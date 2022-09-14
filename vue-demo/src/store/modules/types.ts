// =====================app=======================
export type Size = 'small' | 'medium' ;

export interface ISidebar {
  opened: boolean,
  withoutAnimation: boolean
}

export interface AppState {
  sidebar: ISidebar,
  device: string,
  size: Size | undefined
}

// ====================errorlog========================
export interface ErrorLogState {
  logs: any[]
}

// ===================tagsView========================
export interface TagsViewState {
  visitedViews: any[],
  cachedViews: any[],
}

// =======================user====================
export interface UserState {
  id: string,
  token: string | undefined,
  name: string,
  avatar: string,
  introduction: string,
  roles: any[]
}