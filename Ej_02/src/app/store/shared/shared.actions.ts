import { createAction, props } from '@ngrx/store';

export const SET_ERROR_MESSAGE = '[shared state] set error message';

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);
