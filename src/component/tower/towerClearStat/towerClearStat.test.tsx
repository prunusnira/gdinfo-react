import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import TowerClearStat from "./towerClearStat"

jest.mock('./useTowerClear', () => ({
    __esModule: true,
    default: () => ([{
        tower: 'TESTTOWER',
        cont: '',
        floors: [{
            floor: '1',
            clear: 'clear',
        }],
    }])
}))

jest.mock('./useFloorClear', () => ({
    __esModule: true,
    default: () => ([{
        src: '',
        name: '',
    }])
}))

describe('타워/플로어 클리어 상태 확인 테스트', () => {
    it('상태 확인 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <TowerClearStat />
            </MemoryRouter>
        )

        expect(dom.getByText('TESTTOWER')).toBeInTheDocument()
    })
})