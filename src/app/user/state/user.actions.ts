import { Action } from '@ngrx/store';

export enum UserAction {
  MaskUserName = '[User] Mask User Name',
}

export class MaskUserName implements Action {
  public readonly type = UserAction.MaskUserName;
  constructor(public payload: boolean) {}
}

export type UserActions = MaskUserName;
