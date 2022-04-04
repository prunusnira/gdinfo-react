import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Profile from "./profile"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({id: '0'})
}))

jest.mock('./useProfileLoader', () => ({
    __esModule: true,
    default: () => ([
        {
            id: 0,
            titletower: "",
            title: "TESTTITLE",
            name: "TESTUSER",
            token: "",
            gskill: 0,
            dskill: 0,
            gskillnx: 0,
            dskillnx: 0,
            gskillex: 0,
            dskillex: 0,
            gskillmx: 0,
            dskillmx: 0,
            gskilltbre: 0,
            dskilltbre: 0,
            gskilltb: 0,
            dskilltb: 0,
            gskillall: 0,
            dskillall: 0,
            gclearlv: 0,
            dclearlv: 0,
            gclearnum: 0,
            dclearnum: 0,
            gfclv: 0,
            dfclv: 0,
            gfcnum: 0,
            dfcnum: 0,
            gexclv: 0,
            dexclv: 0,
            gexcnum: 0,
            dexcnum: 0,
            opencount: "",
            countall: 0,
            countgf: 0,
            countdm: 0,
            comment: "",
            updatetime: "",
            uptimelong: 0,
            pausetype: 0,
            pausedate: "",
        },
        true
    ])
}))

jest.mock('./useRecentGraph', () => ({
    __esModule: true,
    default: () => ([
        [],
        0,
        0
    ])
}))

describe('프로필 페이지 테스트', () => {
    it('테스트', () => {
        const dom = render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        )

        expect(dom.getByText(/TESTTITLE/)).toBeInTheDocument()
        expect(dom.getByText('TESTUSER')).toBeInTheDocument()
    })
})