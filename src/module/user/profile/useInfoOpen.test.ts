import { act, renderHook } from "@testing-library/react-hooks"
import useInfoOpen from "./useInfoOpen"

describe('정보공개 모달 테스트', () => {
    it('모달 열기/닫기 테스트', () => {
        const {result} = renderHook(
            () => useInfoOpen(() => {})
        )

        expect(result.current.isInfoOpen).toBe(false)
        act(() => {
            result.current.setInfoDlgOpen()
        })
        expect(result.current.isInfoOpen).toBe(true)
        act(() => {
            result.current.setInfoDlgClose()
        })
        expect(result.current.isInfoOpen).toBe(false)
    })
})