import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Recent from "./recent"

jest.mock('./useRecent', () => ({
    __esModule: true,
    default: () => ([
        {
            id: 0,
            titletower: '',
            name: 'TESTUSER',
            gskill: 1000,
            dskill: 2000,
            updatetime: '',
            uptimelong: 0,
            glink: '',
            dlink: '',
            opencount: 'Y'
        }
    ])
}))

describe('최근 갱신 유저 테스트', () => {
    it('유저 리스트 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <Recent />
            </MemoryRouter>
        )

        expect(dom.getByText(/TESTUSER/i)).toBeInTheDocument()
    })
})