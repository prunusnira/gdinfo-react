import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import TowerStat from "./towerStat"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({tower: ''})
}))

jest.mock('./useTitleModal', () => ({
    __esModule: true,
    default: () => ([
        true, {
            type: 0,
            title: 'yeah',
            display: 'NEWTITLE'
        },
        (b: boolean) => {}, (s: string) => {}, (s: string) => {}
    ])
}))

jest.mock('@/mobx/store', () => ({
    loginStatus: {
        isSigned: true
    },
    language: {
        lang: 'en'
    },
    loginUser: {
        user: {
            id: '0'
        }
    }
}))

jest.mock('./useTowerStat', () => ({
    __esModule: true,
    default: () => ([
        'TESTTOWER', 'yes',
        [{
            index: 0,
            topid: '',
            btnid: '',
            opbtn: '',
            skillfrom: 0,
            floor: 0,
            floorclear: '',
            titlechangable: '',
            titlechange: {
                type: 0,
                title: '',
                display: ''
            },
            btnchangable: false,
            floorid: '',
            clearnotice: '',
            floorlist: [{
                jacket: '',
                name: 'TESTMUSIC',
                pattern: '',
                lv: '',
                condRate: 0,
                condFc: false,
                rate: 0,
                fc: false,
                description: '',
                clear: '',
                title: {
                    type: 0,
                    title: '',
                    display: ''
                },
            }],
        }]
    ])
}))

describe('타워 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <TowerStat />
            </MemoryRouter>
        )

        expect(dom.getByText('TESTMUSIC')).toBeInTheDocument()
        expect(dom.getByText('NEWTITLE')).toBeInTheDocument()
    })
})