import { act, renderHook } from "@testing-library/react-hooks"
import useComment from "./useComment"

describe('코멘트 변경 모달 테스트', () => {
    it('모달 열기/닫기 스위칭', () => {
        const {result} = renderHook(() => useComment(
            '', '', (s: string) => {}
        ))

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