import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import ProfileData from "../user/profile/profileData"
import UserLoginInfo from "./LoginInfo"
import { LoginInfoReturn } from "./useLoginInfo"

const mockProfData: ProfileData = {
    id: 0,
    titletower: "",
    title: "",
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
}

jest.mock('./useLoginInfo', () => ({
    __esModule: true,
    default: (): LoginInfoReturn => ([true, mockProfData])
}))

describe('로그인 정보 테스트', () => {
    it('로그인 정보 로드 처리 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <UserLoginInfo />
            </MemoryRouter>
        )
        expect(dom.getByText('TESTUSER')).toBeInTheDocument()
    })
})