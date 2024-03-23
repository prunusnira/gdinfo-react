import {atomWithStorage} from "jotai/utils";

const version = localStorage.getItem('version')
const state = version ? parseInt(version, 10) : -1;
export const atomVersion = atomWithStorage('version', state)