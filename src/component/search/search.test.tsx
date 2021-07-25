import "@testing-library/jest-dom/extend-expect"
import {renderHook} from '@testing-library/react-hooks'
import useMusicSearch from "./useMusicSearch"

jest.mock('./useMusicSearch', () => ({
    useMusicSearch: () => [{
        jacket: '',
        link: '',
        name: 'jet',
        removed: 0,
        difflist: [],
    }]
}))

describe('검색 결과 표시 테스트 (mocked)', () => {
    it('music search result', () => {
        const list = renderHook(() => useMusicSearch(
            '', '', 'jet', (p: number) => {}
        ))

        expect(list.result.current.length).toBe(1)
    })
})