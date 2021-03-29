import { createReducer } from '@ngrx/store';
import { ActivitiesState, initialState } from './activities.state';

const _activitiesReducer = createReducer(initialState);

export function activitiesReducer(
  state: ActivitiesState = initialState,
  action?: any
) {
  return _activitiesReducer(state, action);
}
