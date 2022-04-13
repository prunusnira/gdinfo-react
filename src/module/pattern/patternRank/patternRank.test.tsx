import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import PatternRank from "./patternRank"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        ptcode: '12',
        mid: '100',
        page: '1'
    })
}))

jest.mock('./useMusicData', () => ({
    __esModule: true,
    default: () => ([
        '', '', 'TESTMUSIC', ''
    ])
}))

jest.mock('./usePTRankData', () => ({
    __esModule: true,
    default: () => ([
        [{
            rate: 100,
            skill: '',
            ratecolor: {},
            skillcolor: {},
            index: 0,
            towertitle: '',
            profile: '',
            name: 'TESTPLAYER',
            rank: '',
            fc: true,
            exc: true,
        }],
        1
    ])
}))

describe('패턴 랭크 디스플레이 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <PatternRank />
            </MemoryRouter>
        )

        expect(dom.getByText('TESTMUSIC')).toBeInTheDocument()
        expect(dom.getByText(/TESTPLAYER*/)).toBeInTheDocument()
    })
})