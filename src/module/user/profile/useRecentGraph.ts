import { getGraph } from '@/api/getUserData';
import { ISkillRecord } from '@/data/skill/ISkillRecord';
import { useEffect, useState } from 'react';

const useRecentGraph = (id: string, type: string) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [lineData, setLineData] = useState(Array<any>());

    const getMinMax = (record: Array<ISkillRecord>, type: string) => {
        let min = 0;
        let max = 0;

        record.forEach(e => {
            let c;
            if (type === 'gf') c = e.gskill;
            else c = e.dskill;

            if (min === max && min === 0 && parseInt(c, 10) !== 0) {
                // 초기값 설정 - 0은 표시 안함
                min = parseInt(c, 10);
                max = parseInt(c, 10);
            } else if (min > parseInt(c, 10)) {
                min = parseInt(c, 10) - 100;
            } else if (max < parseInt(c, 10)) {
                max = parseInt(c, 10) + 100;
            }
        });

        return [min, max];
    };

    const getGraphData = () => {
        getGraph(id)
            .then((data) => {
                const record = JSON.parse(data.record);
                const length = record.length;

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

    return { lineData, min, max };
};

export default useRecentGraph;