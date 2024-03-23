import {atomWithStorage} from "jotai/utils";

const state = (localStorage.getItem('theme') || 'false') === 'true'
export const atomDarkmode = atomWithStorage('darkmode', state || false);