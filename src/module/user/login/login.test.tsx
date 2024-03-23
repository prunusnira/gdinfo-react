import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';

jest.mock('./useUserInfo', () => ({
    __esModule: true,
    default: () => ([
        false,
        '',
        () => {
        },
    ]),
}));

jest.mock('./useGoogleLogin', () => ({
    __esModule: true,
    default: () => ([
        false, '',
        () => {
        },
        () => {
        },
    ]),
}));

describe('로그인 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>,
        );

        expect(dom.getByText('Sign in')).toBeInTheDocument();
        expect(dom.getByText('Login with Google')).toBeInTheDocument();
    });
});