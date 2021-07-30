import {renderHook, act} from '@testing-library/react-hooks'
import useHeader from "./useHeader"

describe('헤더 hook 테스트', () => {
    it('메뉴 토글/닫기 검사', () => {
        // given
        const {result} = renderHook(() => useHeader())

        // then - when
        expect(result.current[0]).toBe(false)
        act(() => {
            result.current[1]()
        })

        // then - when
        expect(result.current[0]).toBe(true)
        act(() => {
            result.current[2]()
        })

        // then
        expect(result.current[0]).toBe(false)
    })
})