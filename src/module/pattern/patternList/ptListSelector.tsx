import React from "react";
import { Button } from "@/styled/styledCommon";
import store from "@/mobx/store";

import txtPatternKo from "@/lang/pattern/pattern/txtPattern-ko";
import txtPatternJp from "@/lang/pattern/pattern/txtPattern-jp";
import txtPatternEn from "@/lang/pattern/pattern/txtPattern-en";
import { PTListBody, PTListCol, PTListRow, PTListTitleDiv } from "./ptList.style";
import ContentLayout from "@/component/content/standardContent";

type SelectorType = {
    switchHotMethod: () => void;
    switchOtherMethod: () => void;
    switchVerMethod: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    switchOrderMethod: (type: number) => void;
};

const PTListSelector = (props: SelectorType) => {
    const lang = store.language.lang;

    const txtPattern = lang === "ko" ? txtPatternKo : lang === "jp" ? txtPatternJp : txtPatternEn;

    return (
        <ContentLayout title={"Search Options"}>
            <PTListCol>
                <PTListRow>Hot/Other</PTListRow>
                <PTListRow>
                    <Button style={{ width: "100%" }} onClick={props.switchHotMethod}>
                        Hot
                    </Button>
                    <Button style={{ width: "100%" }} onClick={props.switchOtherMethod}>
                        Other
                    </Button>
                </PTListRow>
            </PTListCol>
            <PTListCol>
                <PTListRow>Order</PTListRow>
                <PTListRow>
                    <Button style={{ width: "100%" }} onClick={() => props.switchOrderMethod(0)}>
                        {txtPattern.filter.btn.title} ▲/▼
                    </Button>
                    <Button style={{ width: "100%" }} onClick={() => props.switchOrderMethod(1)}>
                        {txtPattern.filter.btn.version} ▲/▼
                    </Button>
                </PTListRow>
            </PTListCol>
            <PTListCol>
                <PTListRow>Version</PTListRow>
                <PTListRow>
                    <select onChange={props.switchVerMethod} className="form-control">
                        <option value="--">SELECT</option>
                        <option value="00">All</option>
                        <option value="01">GF1</option>
                        <option value="02">GF2dm1</option>
                        <option value="03">GF3dm2</option>
                        <option value="04">GF4dm3</option>
                        <option value="05">GF5dm4</option>
                        <option value="06">GF6dm5</option>
                        <option value="07">GF7dm6</option>
                        <option value="08">GF8dm7</option>
                        <option value="09">GF9dm8</option>
                        <option value="10">GF10dm9</option>
                        <option value="11">GF11dm10</option>
                        <option value="12">ee'mall</option>
                        <option value="13">V</option>
                        <option value="14">V2</option>
                        <option value="15">V3</option>
                        <option value="16">V4</option>
                        <option value="17">V5</option>
                        <option value="18">V6</option>
                        <option value="19">XG</option>
                        <option value="20">XG2</option>
                        <option value="21">XG3</option>
                        <option value="22">GD</option>
                        <option value="23">GD OD</option>
                        <option value="24">GD TB</option>
                        <option value="25">GD TBRE</option>
                        <option value="26">GD MX</option>
                        <option value="27">GD EX</option>
                        <option value="28">GD NX</option>
                        <option value="29">GD HV</option>
                    </select>
                </PTListRow>
            </PTListCol>
        </ContentLayout>
    );
};

export default PTListSelector;