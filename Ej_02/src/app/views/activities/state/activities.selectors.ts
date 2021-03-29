import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivitiesState } from './activities.state';

const getActivitiesState = createFeatureSelector<ActivitiesState>('activities');

export const getActivities = createSelector(getActivitiesState, (state) => {
  return state.activities;
});
