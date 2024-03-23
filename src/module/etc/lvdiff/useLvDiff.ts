import { ILvDiff } from "@/data/etc/ILvDiff";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { getLevelDiff } from "@/api/getLevelDiff";

const useLvDiff = (type?: string) => {
    const [list, setList] = useState(Array<ILvDiff>());

    const lvDiff = (type?: string) => {
        if(type) {
            return getLevelDiff(type)
        }
        return undefined;
    };

    const {data, isLoading} = useQuery({
        queryKey: ['etc', 'lvdiff'],
        queryFn: () => lvDiff(type),
    })

    useEffect(() => {
        if(type) {
            lvDiff(type);
        }
    }, []);

    useEffect(() => {
        if(data) {
            const diffData = data.lvdiff as Array<ILvDiff>;
            setList(diffData);
        }
    }, [data]);

    return { list, isLoading };
};

export default useLvDiff;
