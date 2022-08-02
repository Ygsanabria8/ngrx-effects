import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as UserActions from '../actions';

export interface UsersState {
    users: User[],
    loaded: boolean,
    loading: boolean,
    error: any,
}

export const initialStateUsers: UsersState = {
    users: [],
    loading: false,
    loaded: false,
    error: null,
};

export const usersReducer = createReducer(
  initialStateUsers,
  on(UserActions.loadUsers, (state) => ({...state, loading: true})),
  on(UserActions.loadUsersSuccess, (state, {users} ) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...users]
  })),
  on(UserActions.loadUsersError, (state, {payload}) =>({
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