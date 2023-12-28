import { atomWithStorage } from 'jotai/utils';
import { ILoginInfo } from '@/data/ILoginInfo';

const loginUser = localStorage.getItem('loginUser');
const state: ILoginInfo | undefined = loginUser ? JSON.parse(loginUser) : undefined;
export const atomLoginUser = atomWithStorage<ILoginInfo | undefined>('loginUser', state);