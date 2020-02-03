import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import { IProduct } from '../product';

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

export function reducer(state: IProductState = initialState, action): IProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}
