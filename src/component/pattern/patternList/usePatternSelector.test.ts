import { act, renderHook } from "@testing-library/react-hooks"
import usePatternSelector from "./usePatternSelector"

describe('패턴 선택 스위치 테스트', () => {
    it('스위치 테스트', () => {
        // given
        const {result} = renderHook(() =>
            usePatternSelector('titleasc', '0', '1')
        )

        // then
        // 버전은 ptList.test.ts에서
        expect(result.current[0]).toBe(false)
        expect(result.current[2]).toBe(false)
        expect(result.current[6]).toBe(false)
        expect(result.current[8]).toEqual('')

        // when
        act(() => {
            result.current[1]()
            result.current[3]()
            result.current[7](0)
        })

        // then
        expect(result.current[0]).toBe(true)
        expect(result.current[2]).toBe(true)
        expect(result.current[6]).toBe(true)
        expect(result.current[9]).toEqual('titledesc')
    })
})