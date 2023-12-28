import { act, renderHook } from "@testing-library/react-hooks"
import {ESearchType} from "@/data/ESearchType";
import useSearch from "@/module/header/useSearch";

describe('검색타입 변경 및 변경 다이얼로그 토글 테스트', () => {
    it('검색타입 변경', () => {
        const {result} = renderHook(() => useSearch(''))

        expect(result.current.searchType).toBe(ESearchType.MUSIC)
        act(() => {
            result.current.changeSearchType(ESearchType.PLAYER)
        })
        expect(result.current.searchType).toBe(ESearchType.PLAYER)
        act(() => {
            result.current.changeSearchType(ESearchType.GSKILL)
        })
        expect(result.current.searchType).toBe(ESearchType.GSKILL)
        act(() => {
            result.current.changeSearchType(ESearchType.DSKILL)
        })
        expect(result.current.searchType).toBe(ESearchType.DSKILL)
        act(() => {
            result.current.changeSearchType(ESearchType.MUSIC)
        })
        expect(result.current.searchType).toBe(ESearchType.MUSIC)
    })

    it('검색타입 변경 다이얼로그 토글', () => {
        const {result} = renderHook(() => useSearch(''))

        expect(result.current.searchTypeDlg).toBe(false)
        act(() => {
            result.current.openSearchTypeDlg(true)
        })
        expect(result.current.searchTypeDlg).toBe(true)
        act(() => {
            result.current.closeSearchTypeDlg()
        })
        expect(result.current.searchTypeDlg).toBe(false)
    })
})