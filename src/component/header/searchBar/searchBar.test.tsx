import { render, RenderResult } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import App from "@/component/App"
import "@testing-library/jest-dom/extend-expect"

let dom: RenderResult

beforeEach(() => {
    dom = render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )
})

describe('검색 바 테스트', () => {
    it('정상 표시유무 확인', () => {
        const input = dom.getByPlaceholderText('Search Bar')
        expect(input).toBeInTheDocument()
    })

    it(`JSDOM이 navigation을 지원하지 않으므로
        버튼 클릭에 의한 변경점은 테스트 하지 않음
        검색 결과 테스트는 /component/search/search.test.tsx`, () => {
    })
})