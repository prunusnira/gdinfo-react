import {ILvDiff} from "@/data/etc/ILvDiff";
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from "react";
import {getLevelDiff} from "@/api/getLevelDiff";

const useLvDiff = (type?: string) => {
    const [list, setList] = useState(Array<ILvDiff>());

    const lvDiff = (typeType?: string) => {
        if (typeType) {
            return getLevelDiff(typeType);
        }
        return undefined;
    };

    const {data, isLoading} = useQuery({
        queryKey: ['etc', 'lvdiff'],
        queryFn: () => lvDiff(type),
    });

    useEffect(() => {
        if (type) {
            lvDiff(type);
        }
    }, []);

    useEffect(() => {
        if (data) {
            setList(data.lvdiff);
        }
    }, [data]);

    return {list, isLoading};
};

export default useLvDiff;
