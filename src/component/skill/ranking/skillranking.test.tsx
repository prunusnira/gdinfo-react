import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import SkillRanking from "./skillranking"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        gtype: 'dm',
        page: '1'
    })
}))

jest.mock('./useSkillRankingData', () => ({
    __esModule: true,
    default: () => ([
        [{
            index: 0,
            userid: 0,
            profilerank: '',
            towertitle: '',
            username: 'TESTUSER',
            time: '',
            gskill: '5000',
            glink: '',
            dskill: '7000',
            dlink: '',
            allskill: '',
        }],
        1
    ])
}))

describe('스킬 랭킹 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <SkillRanking />
            </MemoryRouter>
        )

        expect(dom.getByText('TESTUSER')).toBeInTheDocument()
    })
})