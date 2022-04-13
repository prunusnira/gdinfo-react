import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import SkillContainer from "./skill"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        order: 'skilldesc',
        ptype: '2',
        userid: '1',
        gtype: 'dm',
        page: '1'
    })
}))

jest.mock('./useSkillTableData', () => ({
    __esModule: true,
    default: () => ([
        [{
            num: 0, iconUrl: '', musicTitle: 'MUSIC1', musicLink: '',
            pattern300: '', pattern600: '', level: '', rank: '',
            rate: '', skill: '', meter: '', version: '',
            clearImg300: '', clearImg600: '', tableColor: {},
        }],
        [{
            num: 0, iconUrl: '', musicTitle: 'MUSIC2', musicLink: '',
            pattern300: '', pattern600: '', level: '', rank: '',
            rate: '', skill: '', meter: '', version: '',
            clearImg300: '', clearImg600: '', tableColor: {},
        }],
        1000, 1000, 1, ''
    ])
}))

describe('스킬표 테스트', () => {
    it('대상곡 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <SkillContainer
                    share={false} />
            </MemoryRouter>
        )

        dom.getAllByText('MUSIC1').map(x => {
            expect(x).toBeInTheDocument()
        })
        dom.getAllByText('MUSIC2').map(x => {
            expect(x).toBeInTheDocument()
        })
    })
})