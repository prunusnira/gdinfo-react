import React from "react";
import PlaycountData from "./playcountData";
import store from "@/mobx/store";
import { observer } from "mobx-react";

import txtPlayCountKo from "@/lang/user/playcount/txtPlayCount-ko";
import txtPlayCountJp from "@/lang/user/playcount/txtPlayCount-jp";
import txtPlayCountEn from "@/lang/user/playcount/txtPlayCount-en";
import { CountJacket, CountMusic, CountPattern, CountPlay, CountWrapper } from "./countTable.style";

interface Props {
    data: Array<PlaycountData>;
}

const CountTable = observer((props: Props) => {
    const lang = store.language.lang;

    const txtPlayCount =
        lang === "ko" ? txtPlayCountKo : lang === "jp" ? txtPlayCountJp : txtPlayCountEn;

    return (
        <>
            {props.data.map((d, i) => {
                return (
                    <CountWrapper key={`count${i}`}>
                        <CountJacket
                            alt="jacket-img"
                            src={d.jacket}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                    process.env.PUBLIC_URL + "/general-img/empty.jpg";
                            }}
                        />
                        {d.pattern !== "" && <CountPattern alt="pattern-type" src={d.pattern} />}
                        <CountMusic>
                            {d.number}. {d.name}
                        </CountMusic>
                        <CountPlay>
                            {d.count} {txtPlayCount.table.time}
                        </CountPlay>
                    </CountWrapper>
                );
            })}
        </>
    );
});

export default CountTable;
