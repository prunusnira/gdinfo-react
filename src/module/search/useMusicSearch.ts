import { getSearchResult } from '@/api/getSearchResult';
import { IEachDiff } from '@/data/pattern/IEachDiff';
import { IPattern } from '@/data/pattern/IPattern';
import { atomLoginUser } from '@/jotai/loginUser';
import CommonData from '@/module/common/commonData';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

interface Props {
    type?: string,
    page?: string,
    value?: string,
    setAllPage?: (p: number) => void
}

const useMusicSearch = ({
                            type, page, value, setAllPage,
                        }: Props) => {
    const [musiclist, setMusiclist] = useState(Array<IPattern>());
    const loginUser = useAtomValue(atomLoginUser);

    const getMusicList = () => {
        if (type && page && value && setAllPage) {
            getSearchResult(type, value, page).then((json) => {
                const userList = JSON.parse(json.userList);
                const ptlist = [];
                if (JSON.parse(json.resultexist) === 'yes') {
                    for (let i = 0; i < userList.length; i += 1) {
                        const cur = userList[i];
                        const obj: IPattern = {
                            mid: 0,
                            jacket: '',
                            link: '',
                            name: '',
                            removed: 0,
                            difflist: [],
                        };
                        obj.jacket = `${CommonData.jacketUrl}${cur.id}.jpg`;
                        if (loginUser) obj.link = `/music/${cur.id}/${loginUser.id}`;
                        else obj.link = '#no_div';
                        obj.mid = cur.id;
                        obj.name = cur.name;
                        obj.removed = parseInt(cur.removed, 10);

                        for (let j = 0; j < 4; j += 1) {
                            const d: IEachDiff = {
                                diff: '',
                                glink: '',
                                glv: '',
                                blink: '',
                                blv: '',
                                dlink: '',
                                dlv: '',
                            };
                            if (j === 0) {
                                d.diff = 'BSC';
                                if (cur.gbsc !== 0) {
                                    d.glink = `/ptrank/${cur.id}/1/1`;
                                    d.glv = (cur.gbsc / 100).toFixed(2);
                                } else {
                                    d.glink = '#no_div';
                                    d.glv = '';
                                }
                                if (cur.bbsc !== 0) {
                                    d.blink = `/ptrank/${cur.id}/5/1`;
                                    d.blv = (cur.bbsc / 100).toFixed(2);
                                } else {
                                    d.blink = '#no_div';
                                    d.blv = '';
                                }
                                if (cur.dbsc !== 0) {
                                    d.dlink = `/ptrank/${cur.id}/9/1`;
                                    d.dlv = (cur.dbsc / 100).toFixed(2);
                                } else {
                                    d.dlink = '#no_div';
                                    d.dlv = '';
                                }
                            } else if (j === 1) {
                                d.diff = 'ADV';
                                if (cur.gadv !== 0) {
                                    d.glink = `/ptrank/${cur.id}/2/1`;
                                    d.glv = (cur.gadv / 100).toFixed(2);
                                } else {
                                    d.glink = '#no_div';
                                    d.glv = '';
                                }
                                if (cur.badv !== 0) {
                                    d.blink = `/ptrank/${cur.id}/6/1`;
                                    d.blv = (cur.badv / 100).toFixed(2);
                                } else {
                                    d.blink = '#no_div';
                                    d.blv = '';
                                }
                                if (cur.dadv !== 0) {
                                    d.dlink = `/ptrank/${cur.id}/10/1`;
                                    d.dlv = (cur.dadv / 100).toFixed(2);
                                } else {
                                    d.dlink = '#no_div';
                                    d.dlv = '';
                                }
                            } else if (j === 2) {
                                d.diff = 'EXT';
                                if (cur.gext !== 0) {
                                    d.glink = `/ptrank/${cur.id}/3/1`;
                                    d.glv = (cur.gext / 100).toFixed(2);
                                } else {
                                    d.glink = '#no_div';
                                    d.glv = '';
                                }
                                if (cur.bext !== 0) {
                                    d.blink = `/ptrank/${cur.id}/7/1`;
                                    d.blv = (cur.bext / 100).toFixed(2);
                                } else {
                                    d.blink = '#no_div';
                                    d.blv = '';
                                }
                                if (cur.dext !== 0) {
                                    d.dlink = `/ptrank/${cur.id}/11/1`;
                                    d.dlv = (cur.dext / 100).toFixed(2);
                                } else {
                                    d.dlink = '#no_div';
                                    d.dlv = '';
                                }
                            } else if (j === 3) {
                                d.diff = 'MAS';
                                if (cur.gmas !== 0) {
                                    d.glink = `/ptrank/${cur.id}/4/1`;
                                    d.glv = (cur.gmas / 100).toFixed(2);
                                } else {
                                    d.glink = '#no_div';
                                    d.glv = '';
                                }
                                if (cur.bmas !== 0) {
                                    d.blink = `/ptrank/${cur.id}/8/1`;
                                    d.blv = (cur.bmas / 100).toFixed(2);
                                } else {
                                    d.blink = '#no_div';
                                    d.blv = '';
                                }
                                if (cur.dmas !== 0) {
                                    d.dlink = `/ptrank/${cur.id}/12/1`;
                                    d.dlv = (cur.dmas / 100).toFixed(2);
                                } else {
                                    d.dlink = '#no_div';
                                    d.dlv = '';
                                }
                            }
                            obj.difflist.push(d);
                        }
                        ptlist.push(obj);
                    }

                    setMusiclist(ptlist);
                    setAllPage(json.pages);
                }
            });
        }
    };

    useEffect(() => {
        if (type === 'music') getMusicList();
    }, [page]);

    return { musiclist };
};

export default useMusicSearch;
