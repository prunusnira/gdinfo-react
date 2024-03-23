import Language from '@/module/common/language';

describe('언어 초기화 테스트', () => {
    it('navigator가 없으므로 (en)이 정상임', () => {
        const lang = Language().getLang();
        expect(lang).toEqual('en')
    })
})