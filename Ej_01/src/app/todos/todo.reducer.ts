import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { createTodo } from './todo.actions';

export const initialState: Todo[] = [new Todo('Terminar práctica 2')];

const _todoReducer = createReducer(
  initialState,
  on(createTodo, (state, { title }) => [...state, new Todo(title)])
);

export function todoReducer(state: any, action: any) {
  // TODO: ???? que tipo lleva esto???
  return _todoReducer(state, action);
}
