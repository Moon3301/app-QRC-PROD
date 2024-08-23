import { createReducer, on } from '@ngrx/store';
import { setToken, clearToken } from './auth.actions';

export interface AuthState {
  login_provider: string;
  name: string;
  user: {
    id: string;
    username: string;
    normalized_username: string;
    position: number;
  };
  value: string | null;
}

export const initialState: AuthState = {
  login_provider: '',
  name: '',
  user: {
    id: '',
    username: '',
    normalized_username: '',
    position: 0,
  },
  value: null,
};

export const authReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => {
    
    return {
      ...state,
      value: token,
    };
  }),
  on(clearToken, (state) => ({
    ...state,
    value: null,
  }))
);

