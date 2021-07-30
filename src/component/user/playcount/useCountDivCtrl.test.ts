import { act, renderHook } from "@testing-library/react-hooks"
import useCountDivCtrl from "./useCountDivCtrl"

describe('플레이카운트 표시 div 셀렉터 테스트', () => {
    it('셀렉터 변경 테스트', () => {
        // given
        const {result} = renderHook(() => useCountDivCtrl())

        // then
        expect(result.current[0]).toEqual('none')
        expect(result.current[1]).toEqual('block')
        expect(result.current[2]).toEqual('none')
        expect(result.current[3]).toEqual('none')

        // when
        act(() => {
            result.current[4](0)
        })

        // then
        expect(result.current[0]).toEqual('block')
        expect(result.current[1]).toEqual('none')
        expect(result.current[2]).toEqual('none')
        expect(result.current[3]).toEqual('none')
        
        // when
        act(() => {
            result.current[4](2)
        })

        // then
        expect(result.current[0]).toEqual('none')
        expect(result.current[1]).toEqual('none')
        expect(result.current[2]).toEqual('block')
        expect(result.current[3]).toEqual('none')
        
        // when
        act(() => {
            result.current[4](3)
        })

        // then
        expect(result.current[0]).toEqual('none')
        expect(result.current[1]).toEqual('none')
        expect(result.current[2]).toEqual('none')
        expect(result.current[3]).toEqual('block')
    })
})