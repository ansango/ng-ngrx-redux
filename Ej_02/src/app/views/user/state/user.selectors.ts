import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserType } from 'src/app/shared/models/user';
import { UserState } from './user.state';

export const USER_STATE_NAME = 'user';

export const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const isAuthenticated = createSelector(getUserState, (state) => {
  return state.user ? true : false;
});

export const getUserType = createSelector(getUserState, (state) => {
  return state.userType;
});
