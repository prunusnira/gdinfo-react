import { getClearTable } from '@/api/getUserData';
import { IClearTable } from '@/data/user/IClearTable';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Props {
    userid?: string;
    type?: string;
}

const useClearTable = ({ userid, type }: Props) => {
    const [list, setList] = useState(Array<IClearTable>());

    const loadTableData = () => {
        if (userid && type) {
            return getClearTable(userid, type);
        }
        return undefined;
    };

    const {data, isLoading} = useQuery({
        queryKey: ['profile', 'clearTable'],
        queryFn: loadTableData,
    })

    useEffect(() => {
        if(data) {
            const json = JSON.parse(data.ctable);
            const gval = [0, 0, 0, 0, 0, 0, 0, 0];
            const clearlist = new Array<IClearTable>();

            for (let i = 0; i < 19; i += 1) {
                if (i < 18) {
                    const obj: IClearTable = {
                        level: '',
                        exc: json.patternCount['EXC'][i],
                        ss: json.patternCount['SS'][i],
                        s: json.patternCount['S'][i],
                        a: json.patternCount['A'][i],
                        b: json.patternCount['B'][i],
                        c: json.patternCount['C'][i],
                        f: json.patternCount['F'][i],
                        all: json.totalPatternCount[i],
                        n: 0,
                    };

                    gval[0] += obj.exc;
                    gval[1] += obj.ss;
                    gval[2] += obj.s;
                    gval[3] += obj.a;
                    gval[4] += obj.b;
                    gval[5] += obj.c;
                    gval[6] += obj.f;
                    gval[7] += obj.all;

                    obj.n = obj.all - obj.exc - obj.ss - obj.s - obj.a - obj.b - obj.c - obj.f;

                    switch (i) {
                        case 0:
                            obj.level = '1.00~';
                            break;
                        case 1:
                            obj.level = '1.50~';
                            break;
                        case 2:
                            obj.level = '2.00~';
                            break;
                        case 3:
                            obj.level = '2.50~';
                            break;
                        case 4:
                            obj.level = '3.00~';
                            break;
                        case 5:
                            obj.level = '3.50~';
                            break;
                        case 6:
                            obj.level = '4.00~';
                            break;
                        case 7:
                            obj.level = '4.50~';
                            break;
                        case 8:
                            obj.level = '5.00~';
                            break;
                        case 9:
                            obj.level = '5.50~';
                            break;
                        case 10:
                            obj.level = '6.00~';
                            break;
                        case 11:
                            obj.level = '6.50~';
                            break;
                        case 12:
                            obj.level = '7.00~';
                            break;
                        case 13:
                            obj.level = '7.50~';
                            break;
                        case 14:
                            obj.level = '8.00~';
                            break;
                        case 15:
                            obj.level = '8.50~';
                            break;
                        case 16:
                            obj.level = '9.00~';
                            break;
                        case 17:
                            obj.level = '9.50~';
                            break;
                        default:
                            break;
                    }
                    clearlist.push(obj);
                } else {
                    const obj: IClearTable = {
                        level: 'Total',
                        exc: gval[0],
                        ss: gval[1],
                        s: gval[2],
                        a: gval[3],
                        b: gval[4],
                        c: gval[5],
                        f: gval[6],
                        all: gval[7],
                        n: gval[7] - gval[0] - gval[1] - gval[2] - gval[3] - gval[4] - gval[5] - gval[6],
                    };
                    clearlist.push(obj);
                }
            }

            setList(clearlist);
        }
    }, [data]);

    return {list, isLoading};
};

export default useClearTable;