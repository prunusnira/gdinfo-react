import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import NoRecordMusicList from "./noRecordList"
import NPData from "./NPData"

const npdata: NPData = {
    imgsrc: '',
    link: '',
    name: 'NOPLAYMUSIC',
    pattern: '',
    lv: '',
    ver: '',
}

jest.mock('./useNoRecordData', () => ({
    __esModule: true,
    default: () => ([
        [npdata], 1
    ])
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        gtype: '',
        userid: '',
        vertype: '',
        page: ''})
}))

describe('미플레이 패턴 테스트', () => {
    it('디스플레이 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <NoRecordMusicList />
            </MemoryRouter>
        )
        expect(dom.getByText('NOPLAYMUSIC')).toBeInTheDocument()
    })
})