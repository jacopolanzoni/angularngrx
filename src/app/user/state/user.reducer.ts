import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { IUser } from '../user';

export interface IUserState {
  currentUser: IUser;
  maskUserName: boolean;
}

const getUserFeatureState: MemoizedSelector<object, IUserState> = createFeatureSelector<IUserState>('user');

export const getCurrentUser: MemoizedSelector<object, IUser> = createSelector(
  getUserFeatureState,
  (state) => state.currentUser,
);
export const getMaskUserName: MemoizedSelector<object, boolean> = createSelector(getUserFeatureState, (state) => state.maskUserName);

const initialUserState: IUserState = {
  currentUser: null,
  maskUserName: true,
};

export function reducer(state: IUserState = initialUserState, action): IUserState {
  switch (action.type) {
    case 'TOGGLE_USER_NAME_MASK':
      return {
        ...state,
        maskUserName: action.payload,
      };
    default:
      return state;
  }
}
