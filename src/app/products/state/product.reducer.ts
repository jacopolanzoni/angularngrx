import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import { IProduct } from '../product';
import { ProductAction, ProductActions } from './product.actions';

export interface IState extends fromRoot.IState {
  products: IProductState;
}

export interface IProductState {
  currentProduct: IProduct;
  products: IProduct[];
  showProductCode: boolean;
}

const getProductFeatureState: MemoizedSelector<object, IProductState> = createFeatureSelector<IProductState>('products');

export const getCurrentProduct: MemoizedSelector<object, IProduct> = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct,
);
export const getProducts: MemoizedSelector<object, IProduct[]> = createSelector(
  getProductFeatureState,
  (state) => state.products,
);
export const getShowProductCode: MemoizedSelector<object, boolean> = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode,
);

const initialState: IProductState = {
  currentProduct: null,
  products: [],
  showProductCode: true,
};

export function reducer(state: IProductState = initialState, action: ProductActions): IProductState {
  switch (action.type) {
    case ProductAction.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload,
      };
    case ProductAction.SetCurrentProduct:
      return {
        ...state,
        currentProduct: {
          ...action.payload,
        },
      };
    case ProductAction.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null,
      };
    case ProductAction.InitialiseCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0,
        },
      };
    default:
      return state;
  }
}
