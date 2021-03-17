import { createAction, props } from '@ngrx/store';

export const createTodo = createAction(
  '[TODO] Create todo',
  props<{ title: string }>()
);
