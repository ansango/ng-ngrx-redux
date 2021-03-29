import { createReducer, on } from '@ngrx/store';
import { autoLogout, loginSuccess, signUpSuccess } from './user.actions';
import { initialState } from './user.state';

const _userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
      userType: action.user.userType,
    };
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      userType: action.user.userType,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
      userType: null,
    };
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
