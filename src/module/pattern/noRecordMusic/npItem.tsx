import React from "react";
import CommonData from "@/module/common/commonData";
import NPData from "./NPData";
import { NPItemImg, NPItemLeft, NPItemPattern, NPItemRow } from "./npItem.style";

interface Props {
    list: Array<NPData>;
}

const NpItem = (props: Props) => {
    return (
        <>
            {props.list.map((np, i) => {
                return (
                    <NPItemRow key={i}>
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
                            <a className="innerhref" href={np.link}>
                                {np.name}
                            </a>
                            <span>
                                {np.lv} / {np.ver}
                            </span>
                        </NPItemPattern>
                    </NPItemRow>
                );
            })}
        </>
    );
};

export default NpItem;
