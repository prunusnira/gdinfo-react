import React from "react";
import CommonData from "@/module/common/commonData";
import NPData from "./NPData";
import { NPItemImg, NPItemLeft, NPItemPattern, NPItemRow } from "./npItem.style";
import { Anchor } from "@/styled/styledCommon";
import store from "@/mobx/store";
import { observer } from "mobx-react";

interface Props {
    list: Array<NPData>;
}

const NpItem = observer((props: Props) => {
    const { dark } = store;
    return (
        <>
            {props.list.map((np, i) => {
                return (
                    <NPItemRow key={`npitem${i}`}>
                        <NPItemLeft>
                            <NPItemImg
                                src={np.imgsrc}
                                onError={(e) => {
                                    e.currentTarget.src = `${CommonData.jacketUrl}empty.jpg`;
                                }}
                            />
                            <img alt="pattern" style={{ width: "60px" }} src={np.pattern} />
                        </NPItemLeft>
                        <NPItemPattern>
                            <Anchor dark={dark.dark} className="innerhref" href={np.link}>
                                {np.name}
                            </Anchor>
                            <span>
                                {np.lv} / {np.ver}
                            </span>
                        </NPItemPattern>
                    </NPItemRow>
                );
            })}
        </>
    );
});

export default NpItem;
