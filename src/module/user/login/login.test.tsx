import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { GoogleLoginResponse } from "react-google-login"
import { MemoryRouter } from "react-router-dom"
import LoginInfo from "../loginInfo"
import Login from "./login"

jest.mock('./useUserInfo', () => ({
    __esModule: true,
    default: () => ([
        false,
        '',
        (info: LoginInfo, isSignIn: boolean, isNewUser: boolean) => {}
    ])
}))

jest.mock('./useGoogleLogin', () => ({
    __esModule: true,
    default: () => ([
        false, '',
        (res: GoogleLoginResponse) => {},
        (e: any) => {}
    ])
}))

describe('로그인 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        expect(dom.getByText('Sign in')).toBeInTheDocument()
        expect(dom.getByText('Login with Google')).toBeInTheDocument()
    })
})