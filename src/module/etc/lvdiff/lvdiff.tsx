import ContentLayout from "@/component/content/standardContent";
import CommonLayout from "@/component/layout/commonLayout";
import React from "react";
import {
    DiffBox,
    DiffCell,
    DiffImg,
    DiffJacket,
    DiffRow,
    DiffRowWrap,
    DiffTitle,
    DiffWrapper,
} from "./lvdiff.style";
import useLvDiff from "./useLvDiff";
import { useParams } from "react-router-dom";
import CommonData from "@/module/common/commonData";
import { getPatternImg600 } from "@/module/common/pattern";

interface MatchProps {
    type: string;
}

const LVDiff = () => {
    const { type } = useParams<MatchProps>();
    const { list } = useLvDiff(type);

    const diffColor = (val: number) => {
        return val > 0 ? "skyblue" : "pink";
    };

    return (
        <CommonLayout>
            <ContentLayout
                title={`Level Difference (FUZZUP - HIGHVOLTAGE) - ${type.toUpperCase()}`}
            >
                <DiffBox>
                    {list.map((x) => (
                        <DiffWrapper>
                            <DiffJacket
                                src={`${CommonData.jacketUrl}${x.mid}.jpg`}
                            />
                            <DiffRowWrap>
                                <DiffTitle>{x.title}</DiffTitle>
                                <DiffRow>
                                    <DiffImg src={getPatternImg600(x.ptcode)} />
                                    <DiffCell>
                                        FUZZ-UP {(x.lv / 100).toFixed(2)}
                                    </DiffCell>
                                    <DiffCell>
                                        HIGH-VOL {(x.lvold / 100).toFixed(2)}
                                    </DiffCell>
                                    <DiffCell
                                        color={diffColor(
                                            x.lv / 100 - x.lvold / 100
                                        )}
                                    >
                                        DIFF{" "}
                                        {(x.lv / 100 - x.lvold / 100).toFixed(
                                            2
                                        )}
                                    </DiffCell>
                                </DiffRow>
                            </DiffRowWrap>
                        </DiffWrapper>
                    ))}
                </DiffBox>
            </ContentLayout>
        </CommonLayout>
    );
};

export default LVDiff;
