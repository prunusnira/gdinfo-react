import { act, renderHook } from "@testing-library/react-hooks"
import useSearch, { SearchType } from "./useSearch"

describe('검색타입 변경 및 변경 다이얼로그 토글 테스트', () => {
    it('검색타입 변경', () => {
        const {result} = renderHook(() => useSearch(''))

        expect(result.current[0]).toBe(SearchType.music)
        act(() => {
            result.current[6](SearchType.player)
        })
        expect(result.current[0]).toBe(SearchType.player)
        act(() => {
            result.current[6](SearchType.gskill)
        })
        expect(result.current[0]).toBe(SearchType.gskill)
        act(() => {
            result.current[6](SearchType.dskill)
        })
        expect(result.current[0]).toBe(SearchType.dskill)
        act(() => {
            result.current[6](SearchType.music)
        })
        expect(result.current[0]).toBe(SearchType.music)
    })

    it('검색타입 변경 다이얼로그 토글', () => {
        const {result} = renderHook(() => useSearch(''))

        expect(result.current[1]).toBe(false)
        act(() => {
            result.current[2](true)
        })
        expect(result.current[1]).toBe(true)
        act(() => {
            result.current[5]()
        })
        expect(result.current[1]).toBe(false)
    })
})