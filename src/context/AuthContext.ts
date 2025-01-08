import { IUserEntity, IUserLoginResponse } from 'blog-common-1.0';
import { createContext } from 'react';

interface IProviderProps {
  user: IUserEntity | null;
  accessToken: string | null;
  login(data: IUserLoginResponse): void;
  logOut(): void;
}

export const AuthContext = createContext<IProviderProps>({
  user: null,
  accessToken: null,
  login: () => {
    throw new Error('login function not implemented');
  },
  logOut: () => {
    throw new Error('logOut function not implemented');
  },
});
