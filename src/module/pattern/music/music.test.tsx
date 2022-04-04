import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Music from "./music"

jest.mock('./useMusicInfo', () => ({
    __esModule: true,
    default: () => (['MusicName', 'Composer', 'Version'])
}))

jest.mock('./usePatternInfo', () => ({
    __esModule: true,
    default: () => ([{
        mid: 1,
        ranklink: '',
        diff: 'BASIC',
        lv: '',
        cleartime: 0,
        playtime: 0,
        combo: 0,
        score: 0,
        rate: '',
        skill: '',
        rank: '',
        fc: '',
        clearmeter: '',
        ratenx: '',
        rateex: '',
        ratemx: '',
        ratetbre: '',
        ratetb: '',
    }])
}))

jest.mock('@/component/common/useUserData', () => ({
    __esModule: true,
    default: () => (['PlayerName', '/profile/test', ''])
}))

describe('곡 별 플레이 데이터 테스트', () => {
    it('정보 표시 테스트', () => {
        const dom = render(
            <MemoryRouter>
                <Music />
            </MemoryRouter>
        )
        expect(dom.getByText('MusicName')).toBeInTheDocument()
        expect(dom.getByText('PlayerName')).toBeInTheDocument()
        expect(dom.getByText('BASIC')).toBeInTheDocument()
    })
})