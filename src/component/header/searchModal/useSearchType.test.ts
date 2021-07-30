import { act, renderHook } from "@testing-library/react-hooks"
import { SearchType } from "../useSearch"
import useSearchType from "./useSearchType"

describe('검색 타입 변경 테스트', () => {
    it('검색 타입 변경', () => {
        const {result} = renderHook(() => useSearchType(SearchType.music))

        expect(result.current[0]).toBe(SearchType.music)
        act(() => {
            result.current[1]({
                currentTarget: {
                    value: 'gskill'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current[0]).toBe(SearchType.gskill)
        act(() => {
            result.current[1]({
                currentTarget: {
                    value: 'dskill'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current[0]).toBe(SearchType.dskill)
        act(() => {
            result.current[1]({
                currentTarget: {
                    value: 'name'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current[0]).toBe(SearchType.player)
        act(() => {
            result.current[1]({
                currentTarget: {
                    value: 'music'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current[0]).toBe(SearchType.music)
    })
})