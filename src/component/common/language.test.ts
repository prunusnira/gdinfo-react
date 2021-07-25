import LData from "./language"

describe('언어 초기화 테스트', () => {
    it('navigator가 없으므로 (en)이 정상임', () => {
        const lang = LData.lang
        expect(lang).toEqual('en')
    })
})