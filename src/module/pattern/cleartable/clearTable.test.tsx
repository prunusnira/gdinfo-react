import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import ClearTable from "./clearTable"
import ClearTableData from "./clearTableData"

const mockClearTableData: ClearTableData[] = [{
    level:'1.0',
    exc: 2,
    ss: 1,
    s: 0,
    a: 0,
    b: 0,
    c: 0,
    f: 0,
    all: 3,
    n: 0
}]

jest.mock('./useClearTable', () => ({
    __esModule: true,
    default: () => (mockClearTableData)
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({userid: '18'})
}))

describe('클리어 테이블 데이터 표시 테스트', () => {
    it('데이터 표시 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <ClearTable />
            </MemoryRouter>
        )
        expect(dom.getAllByText('3')).toHaveLength(2)
    })
})