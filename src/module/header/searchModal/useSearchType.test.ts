import { act, renderHook } from "@testing-library/react-hooks"
import useSearchType from "./useSearchType"
import {ESearchType} from "@/data/ESearchType";

describe('검색 타입 변경 테스트', () => {
    it('검색 타입 변경', () => {
        const {result} = renderHook(() => useSearchType(ESearchType.MUSIC))

        expect(result.current.type).toBe(ESearchType.MUSIC)
        act(() => {
            result.current.changeType({
                currentTarget: {
                    value: 'gskill'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current.type).toBe(ESearchType.GSKILL)
        act(() => {
            result.current.changeType({
                currentTarget: {
                    value: 'dskill'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current.type).toBe(ESearchType.DSKILL)
        act(() => {
            result.current.changeType({
                currentTarget: {
                    value: 'name'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current.type).toBe(ESearchType.PLAYER)
        act(() => {
            result.current.changeType({
                currentTarget: {
                    value: 'music'
                }
            } as React.ChangeEvent<HTMLInputElement>)
        })
        expect(result.current.type).toBe(ESearchType.MUSIC)
    })
})