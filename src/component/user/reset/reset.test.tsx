import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import ProfileReset from "./reset"

jest.mock('./useDataReset', () => ({
    __esModule: true,
    default: () => ([
        false,
        () => {}
    ])
}))

jest.mock('@/mobx/store', () => ({
    loginStatus: {
        isSigned: true
    },
    language: {
        lang: 'en'
    }
}))

describe('데이터 리셋 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <ProfileReset />
            </MemoryRouter>
        )

        expect(dom.getByText('Data Reset')).toBeInTheDocument()
    })
})