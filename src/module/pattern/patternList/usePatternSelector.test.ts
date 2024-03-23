import { act, renderHook } from "@testing-library/react-hooks"
import usePatternSelector from "./usePatternSelector"

describe('패턴 선택 스위치 테스트', () => {
    it('스위치 테스트', () => {
        // given
        const {result} = renderHook(() =>
            usePatternSelector({order: 'titleasc', ver: '0', page: '1'})
        )

        // then
        // 버전은 ptList.test.ts에서
        expect(result.current.switchHot).toBe(false)
        expect(result.current.switchOther).toBe(false)
        expect(result.current.switchOrder).toBe(false)
        expect(result.current.nextVer).toEqual('')

        // when
        act(() => {
            result.current.switchHotMethod()
            result.current.switchOtherMethod()
            result.current.switchOrderMethod(0)
        })

        // then
        expect(result.current.switchHot).toBe(true)
        expect(result.current.switchOther).toBe(true)
        expect(result.current.switchOrder).toBe(true)
        expect(result.current.nextOrder).toEqual('titledesc')
    })
})