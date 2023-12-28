import {renderHook, act} from '@testing-library/react-hooks'
import useHeader from "./useHeader"

describe('헤더 hook 테스트', () => {
    it('메뉴 토글/닫기 검사', () => {
        // given
        const {result} = renderHook(() => useHeader())

        // then - when
        expect(result.current.isMenuOpen).toBe(false)
        act(() => {
            result.current.toggleMenu()
        })

        // then - when
        expect(result.current.isMenuOpen).toBe(true)
        act(() => {
            result.current.closeMenu()
        })

        // then
        expect(result.current.isMenuOpen).toBe(false)
    })
})