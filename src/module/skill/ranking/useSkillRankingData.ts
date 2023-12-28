import { getSkillRank } from '@/api/getSkillData';
import { ISkillRank } from '@/data/ISkillRank';
import { atomLanguage } from '@/jotai/language';
import TxtCommonEn from '@/lang/common/txtCommon-en';
import TxtCommonJp from '@/lang/common/txtCommon-jp';
import TxtCommonKo from '@/lang/common/txtCommon-ko';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

interface Props {
    gtype?: string;
    page?: string;
}

const useSkillRankingData = ({ gtype, page }: Props) => {
    const [rankList, setRankList] = useState(Array<ISkillRank>());
    const [allPage, setAllPage] = useState(0);

    const lang = useAtomValue(atomLanguage);

    const TxtCommon = lang === 'ko' ? TxtCommonKo : lang === 'jp' ? TxtCommonJp : TxtCommonEn;

    const updateRankList = () => {
        if (gtype && page) {
            getSkillRank(gtype, page).then((json) => {
                const list = new Array<ISkillRank>();
                const userList = JSON.parse(json.allUserList);

                for (let i = 0; i < userList.length; i += 1) {
                    const obj: ISkillRank = {
                        index: 0,
                        userid: 0,
                        profile: '',
                        towertitle: '',
                        username: '',
                        time: '',
                        gskill: '',
                        glink: '',
                        dskill: '',
                        dlink: '',
                        allskill: '',
                    };
                    const cur = userList[i];
                    obj.index = i + 30 * (parseInt(page, 10) - 1) + 1;
                    obj.profile = `/profile/${cur.id}`;

                    if (cur.titletower !== '')
                        obj.towertitle = `/general-img/title/${cur.titletower}.png`;
                    else obj.towertitle = '';

                    obj.userid = cur.id;
                    obj.username = `${cur.name}`;

                    const date = new Date().getTime() - cur.uptimelong;
                    const day = Math.floor(date / 1000 / 60 / 60 / 24);

                    if (day > 0) {
                        obj.time = day + TxtCommon.other.days;
                    } else {
                        obj.time =
                            `${Math.floor(date / 1000 / 60 / 60)}${TxtCommon.other.hrs} ${Math.floor((date / 1000 / 60) % 60)}${TxtCommon.other.mins}`;
                    }
                    obj.gskill = cur.gskill.toFixed(2);
                    obj.glink = `/skill/2/${cur.id}/gf/1/1`;
                    obj.dskill = cur.dskill.toFixed(2);
                    obj.dlink = `/skill/2/${cur.id}/dm/1/1`;
                    obj.allskill = (cur.gskill + cur.dskill).toFixed(2);

                    if (cur.opencount === 'N') {
                        obj.towertitle = '';
                        obj.userid = 0;
                        obj.username = TxtCommon.emptyname;
                        obj.profile = '#none';
                        obj.glink = '#none';
                        obj.dlink = '#none';
                    }

                    list.push(obj);
                }

                setRankList(list);
                setAllPage(json.pages);
            });
        }
    };

    useEffect(() => {
        updateRankList();
    }, [gtype, page]);

    return { rankList, allPage };
};

export default useSkillRankingData;
