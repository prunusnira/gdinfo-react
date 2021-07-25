import React from 'react'
import {fireEvent, render, RenderResult} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect"
import SinHeader from '../sinHeader'

let dom: RenderResult

beforeEach(() => {
    dom = render(
        <MemoryRouter>
            <SinHeader />
        </MemoryRouter>
    )
})

// 검색타입 변경은 header에서 검색되는 것과 연관이 깊으므로
// header를 불러와서 테스트해야 한다

// 검색 창 옆의 버튼을 눌렀을 때 검색 타입 변경 다이얼로그가 뜨는지 확인하는 테스트
describe('search modal open btn test', () => {
    // 검색타입은 기본 Music이다
    it('button exist check', () => {
        dom.getByText('Music')
    })

    it('button click test', () => {
        fireEvent.click(dom.getByText('Music'))
        dom.getByText('Player name')
    })
})

// 검색 타입 변경 다이얼로그에서 타입을 변경하는 테스트
describe('search type change test', () => {
    it('try change search type', () => {
        fireEvent.click(dom.getByText('Music'))
        fireEvent.click(dom.getByText('Skill point of GuitarFreaks'))
        fireEvent.click(dom.getByText('OK'))
        dom.getByText('GSkill')
    })

    // 검색시 location을 바꿔야 하는데
    // jest는 jsdom 기반으로 location 변경이 불가능하다
    // 따라서 해당 부분은 테스트할 수 없다
})