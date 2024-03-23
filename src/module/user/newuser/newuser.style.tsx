import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import {ILoginInfo} from '@/data/user/ILoginInfo'
import NewUser from "./newuser"

jest.mock('@/component/user/login/useUserInfo', () => ({
    __esModule: true,
    default: () => ([
        false, '',
        () => {}
    ])
}))

jest.mock('./useUserCheck', () => ({
    __esModule: true,
    default: () => ([
        false, true, (b: boolean) => {}
    ])
}))

describe('신규유저 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <NewUser />
            </MemoryRouter>
        )

        expect(dom.getByText('Sign Up')).toBeInTheDocument()
    })
})