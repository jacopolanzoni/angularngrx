import { Action } from '@ngrx/store';

import { IProduct } from '../product';

export enum ProductAction {
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitialiseCurrentProduct = '[Product] Initialize Current Product',
  Load = '[Product] Load',
  LoadFail = '[Product] Load Fail',
  LoadSuccess = '[Product] Load Success',
  SetCurrentProduct = '[Product] Set Current Product',
  ToggleProductCode = '[Product] Toggle Product Code',
}

export class ClearCurrentProduct implements Action {
  public readonly type = ProductAction.ClearCurrentProduct;
}

export class InitialiseCurrentProduct implements Action {
  public readonly type = ProductAction.InitialiseCurrentProduct;
  constructor() {}
}

export class SetCurrentProduct implements Action {
  public readonly type = ProductAction.SetCurrentProduct;
  constructor(public payload: IProduct) {}
}

export class ToggleProductCode implements Action {
  public readonly type = ProductAction.ToggleProductCode;
  constructor(public payload: boolean) {}
}

export class Load implements Action {
  public readonly type = ProductAction.Load;
}

export class LoadSuccess implements Action {
  public readonly type = ProductAction.LoadSuccess;
  constructor(public payload: IProduct[]) {}
}

export class LoadFail implements Action {
  public readonly type = ProductAction.LoadFail;
  constructor(public payload: string) {}
}

export type ProductActions = ClearCurrentProduct
  | InitialiseCurrentProduct
  | Load
  | LoadFail
  | LoadSuccess
  | SetCurrentProduct
  | ToggleProductCode;
