import {getGraph} from '@/api/getUserData';
import {ISkillRecord} from '@/data/skill/ISkillRecord';
import {useEffect, useState} from 'react';

const useRecentGraph = (id: string, type: string) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [lineData, setLineData] = useState(Array<any>());

    const getMinMax = (record: Array<ISkillRecord>, gameType: string) => {
        let curMin = 0;
        let curMax = 0;

        record.forEach(e => {
            let c;
            if (gameType === 'gf') c = e.gskill;
            else c = e.dskill;

            if (curMin === curMax && curMin === 0 && parseInt(c, 10) !== 0) {
                // 초기값 설정 - 0은 표시 안함
                curMin = parseInt(c, 10);
                curMax = parseInt(c, 10);
            } else if (curMin > parseInt(c, 10)) {
                curMin = parseInt(c, 10) - 100;
            } else if (curMax < parseInt(c, 10)) {
                curMax = parseInt(c, 10) + 100;
            }
        });

        return [curMin, curMax];
    };

    const getGraphData = () => {
        getGraph(id)
            .then((data) => {
                const record = JSON.parse(data.record);
                const {length} = record;

                const minmax = getMinMax(record, type);

                const line = [];
                for (let i = 0; i < length; i += 1) {
                    if (type === 'gf') {
                        line.push({
                            name: record[i].date,
                            uv: record[i].gskill,
                        });
                    } else {
                        line.push({
                            name: record[i].date,
                            uv: record[i].dskill,
                        });
                    }
                }

                setMin(minmax[0]);
                setMax(minmax[1]);
                setLineData(line);
            });
    };

    useEffect(() => {
        getGraphData();
    }, []);

    return {lineData, min, max};
};

export default useRecentGraph;