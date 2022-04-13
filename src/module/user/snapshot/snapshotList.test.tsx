import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import SnapshotList from "./snapshotList"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({id: '0'})
}))

jest.mock('./useSnapshotList', () => ({
    __esModule: true,
    default: () => ([
        ['SNAPSHOT_TEST1'],
        ['SNAPSHOT_TEST2']
    ])
}))

describe('스냅샷 리스트 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <SnapshotList />
            </MemoryRouter>
        )

        expect(dom.getByText('SNAPSHOT_TEST1')).toBeInTheDocument()
        expect(dom.getByText('SNAPSHOT_TEST2')).toBeInTheDocument()
    })
})