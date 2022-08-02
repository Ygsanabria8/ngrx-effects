import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as UserActions from '../actions';

export interface UserState {
    id: string | null,
    user: User | null,
    loaded: boolean,
    loading: boolean,
    error: any,
}

export const initialStateUser: UserState = {
    id: null,
    user: null,
    loading: false,
    loaded: false,
    error: null,
};

export const userReducer = createReducer(
  initialStateUser,
  on(UserActions.loadUser, (state,{id}) => ({
    ...state,
    id: id,
    loading: true
})),
  on(UserActions.loadUserSuccess, (state, {user} ) => ({
    ...state,
    loading: false,
    loaded: true,
    user: {...user}
  })),
  on(UserActions.loadUserError, (state, {payload}) =>({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  })),
);