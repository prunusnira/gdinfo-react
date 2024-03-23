import { getNoRecordData } from '@/api/getMusicData';
import { INoRecord } from '@/data/INoRecord';
import CommonData from '@/module/common/commonData';
import { getPatternImg600 } from '@/module/common/pattern';
import { GDVer } from '@/module/common/version';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Props {
    gtype?: string,
    userid?: string,
    vertype?: string,
    page?: string
}

const useNoRecordData = ({
                             gtype,
                             userid,
                             vertype,
                             page,
                         }: Props) => {
    const [list, setList] = useState(Array<INoRecord>());
    const [allPage, setAllPage] = useState(0);

    const loadNPData = () => {
        if (gtype && userid && vertype && page) {
            return getNoRecordData(
                gtype, userid, vertype, page, window.location.search,
            );
        }
        return undefined;
    };

    const {data, isLoading} = useQuery({
        queryKey: ['pattern', 'norecord', gtype, userid, vertype, page],
        queryFn: loadNPData,
    })

    useEffect(() => {
        if(data) {
            const nplist = new Array<INoRecord>();
            const music = JSON.parse(data.music);

            for (let i = 0; i < music.length; i += 1) {
                const obj: INoRecord = {
                    imgsrc: '',
                    link: '',
                    name: '',
                    pattern: '',
                    lv: '',
                    ver: '',
                };
                const cur = music[i];

                obj.imgsrc = `${CommonData.jacketUrl}${cur.id}.jpg`;
                obj.link = `/music/${cur.id}/${userid}`;
                obj.name = cur.name;
                obj.pattern = getPatternImg600(cur.ptcode);
                obj.lv = (cur.lv / 100).toFixed(2);
                obj.ver = GDVer[cur.version - 1].sv;

                nplist.push(obj);
            }

            setList(nplist);
            setAllPage(data.pages);
        }
    }, [data]);

    return { list, allPage, isLoading };
};

export default useNoRecordData;
