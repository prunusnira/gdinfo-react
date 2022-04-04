import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import PTList from "./ptList"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        order: '',
        ver: '',
        page: ''
    })
}))

jest.mock('./usePTList', () => ({
    __esModule: true,
    default: () => ([
        [{
            jacket: '',
            link: '',
            name: 'PTListTest',
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
        }], 1
    ])
}))

describe('패턴 리스트 테스트', () => {
    it('리스트 표시 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <PTList />
            </MemoryRouter>
        )

        expect(dom.getByText('PTListTest')).toBeInTheDocument()
        expect(dom.getByText('BASIC')).toBeInTheDocument()
    })
})