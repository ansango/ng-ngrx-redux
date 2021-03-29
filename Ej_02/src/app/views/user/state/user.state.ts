import { User, UserType } from 'src/app/shared/models/user';

export interface UserState {
  user: User | null;
  userType: UserType | null;
}

export const initialState: UserState = {
  user: null,
  userType: null,
};
