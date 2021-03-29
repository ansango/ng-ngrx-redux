import { ActionReducerMap } from '@ngrx/store';
import { activitiesReducer } from '../views/activities/state/activities.reducer';
import { ActivitiesState } from '../views/activities/state/activities.state';
import { userReducer } from '../views/user/state/user.reducer';
import { USER_STATE_NAME } from '../views/user/state/user.selectors';
import { UserState } from '../views/user/state/user.state';
import { sharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';

export interface AppState {
  activities: ActivitiesState;
  [SHARED_STATE_NAME]: SharedState;
  [USER_STATE_NAME]: UserState;
}
export const appReducer: ActionReducerMap<AppState> = {
  activities: activitiesReducer,
  [SHARED_STATE_NAME]: sharedReducer,
  [USER_STATE_NAME]: userReducer,
};
