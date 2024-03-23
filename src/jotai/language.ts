import Language from '@/module/common/language';
import { atomWithStorage } from 'jotai/utils';

const state = localStorage.getItem('language');
export const atomLanguage = atomWithStorage('language', state || Language().getLang());