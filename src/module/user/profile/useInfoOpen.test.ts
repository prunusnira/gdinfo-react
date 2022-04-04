import { act, renderHook } from "@testing-library/react-hooks"
import useInfoOpen from "./useInfoOpen"

describe('정보공개 모달 테스트', () => {
    it('모달 열기/닫기 테스트', () => {
        const {result} = renderHook(
            () => useInfoOpen((s: string) => {})
        )

        expect(result.current[0]).toBe(false)
        act(() => {
            result.current[1]()
        })
        expect(result.current[0]).toBe(true)
        act(() => {
            result.current[2]()
        })
        expect(result.current[0]).toBe(false)
    })
})