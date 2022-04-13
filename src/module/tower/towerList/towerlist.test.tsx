import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom"
import React from "react"
import TowerList from "./towerlist"

jest.mock('./useTowerList', () => ({
    __esModule: true,
    default: () => ([
        [{
            link: 'LINK1',
            img: '',
        }],
        [{
            link: 'LINK2',
            img: '',
        }],
        [{
            link: 'LINK3',
            img: '',
        }],
    ])
}))

describe('타워 목록 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <TowerList />
            </MemoryRouter>
        )

        dom.getAllByTestId('towerUrl').map(v => {
            expect(v).toHaveAttribute('href', expect.stringMatching(/.LINK/i))
        })
    })
})