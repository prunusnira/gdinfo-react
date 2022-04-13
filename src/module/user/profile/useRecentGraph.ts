import { useEffect, useState } from "react"
import SkillRecord from "./skillRecord"
import { getGraph } from "@/api/getUserData"

type GraphReturn = [Array<any>, number, number]

const useRecentGraph = (id: string, type: string): GraphReturn => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [lineData, setLineData] = useState(Array<any>())
    
    useEffect(() => {
        getGraphData()
    }, [])

    const getGraphData = () => {
        getGraph(id)
        .then((data) => {
            const record = JSON.parse(data.record);
            const length = record.length;

            const minmax = getMinMax(record, type);

            const line = [];
            for(let i = 0; i < length; i++) {
                if(type === "gf") {
                    line.push({
                        name: record[i].date,
                        uv: record[i].gskill
                    });
                }
                else {
                    line.push({
                        name: record[i].date,
                        uv: record[i].dskill
                    });
                }
            }

            setMin(minmax[0])
            setMax(minmax[1])
            setLineData(line)
        })
    }

    const getMinMax = (record: Array<SkillRecord>, type: string) => {
        let min = 0;
        let max = 0;

        record.forEach(e => {
            let c
            if(type === 'gf') c = e.gskill
            else c = e.dskill

            if(min === max && min === 0 && parseInt(c) !== 0) {
                // 초기값 설정 - 0은 표시 안함
                min = parseInt(c)
                max = parseInt(c)
            }
            else if(min > parseInt(c)) {
                min = parseInt(c) - 100;
            }
            else if(max < parseInt(c)) {
                max = parseInt(c) + 100;
            }
        })

        return [min, max]
    }

    return [lineData, min, max]
}

export default useRecentGraph