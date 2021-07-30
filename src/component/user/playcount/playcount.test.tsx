import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import PlayCount from "./playcount"

jest.mock('@/component/common/useUserData', () => ({
    __esModule: true,
    default: () => ([
        'TESTUSER', '', ''
    ])
}))

jest.mock('./usePlayCount', () => ({
    __esModule: true,
    default: () => ([
        [{
            key: '',
            number: 0,
            jacket: '',
            name: 'TESTMUSIC1',
            pattern: '',
            count: '1',
        }],
        [{
            key: '',
            number: 0,
            jacket: '',
            name: 'TESTMUSIC2',
            pattern: '',
            count: '1',
        }],
        [{
            key: '',
            number: 0,
            jacket: '',
            name: 'TESTMUSIC3',
            pattern: '',
            count: '1',
        }],
        [{
            key: '',
            number: 0,
            jacket: '',
            name: 'TESTMUSIC4',
            pattern: '',
            count: '1',
        }],
    ])
}))

describe('플레이 카운트 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <PlayCount />
            </MemoryRouter>
        )

        expect(dom.getByText(/TESTUSER/)).toBeInTheDocument()
        expect(dom.getByText(/TESTMUSIC1/)).toBeInTheDocument()
    })
})