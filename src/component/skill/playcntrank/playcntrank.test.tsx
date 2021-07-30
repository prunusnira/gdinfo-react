import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import PlaycountRanking from "./playcntrank"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({page: '1'})
}))
jest.mock('./usePlaycntData', () => ({
    __esModule: true,
    default: () => ([
        [{
            index: 0,
            towertitle: '',
            prlink: '',
            name: 'TESTUSER',
            gfcnt: 100,
            dmcnt: 200,
            allcnt: 300
        }],
        1
    ])
}))

describe('플레이 카운트 랭킹 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <PlaycountRanking />
            </MemoryRouter>
        )

        expect(dom.getByText('TESTUSER')).toBeInTheDocument()
    })
})