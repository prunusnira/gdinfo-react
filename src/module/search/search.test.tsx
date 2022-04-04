import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import SearchResult from "./search"

jest.mock('./useUserSearch', () => ({
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

jest.mock('./useMusicSearch', () => ({
    __esModule: true,
    default: () => ([
        {
            jacket: '',
            link: '',
            name: 'TESTMUSIC',
            removed: 0,
            difflist: [{
                diff: 'BASIC',
                glink: '',
                glv: '1',
                blink: '',
                blv: '2',
                dlink: '',
                dlv: '3'
            }]
        }
    ])
}))

describe('검색 결과 디스플레이 테스트', () => {
    it('음악 검색', () => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({
                type: 'music',
                page: '1',
                value: 'TEST',
            })
        }))
        const dom = render(
            <MemoryRouter>
                <SearchResult />
            </MemoryRouter>
        )
        expect(dom.getByText('TESTMUSIC')).toBeInTheDocument()
    })
    
    it('플레이어 검색', () => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({
                type: 'name',
                page: '1',
                value: 'TEST',
            })
        }))
        const dom = render(
            <MemoryRouter>
                <SearchResult />
            </MemoryRouter>
        )
        expect(dom.getByText(/TESTUSER/i)).toBeInTheDocument()
    })
})