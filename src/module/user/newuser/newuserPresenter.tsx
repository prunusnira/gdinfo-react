import React from "react";
import { Button, ItemCol, ItemRow } from "@/styled/styledCommon";
import txtNewuserKo from "@/lang/user/newuser/txtNewUser-ko";
import txtNewuserJp from "@/lang/user/newuser/txtNewUser-jp";
import txtNewuserEn from "@/lang/user/newuser/txtNewUser-en";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import {useAtomValue} from "jotai/index";
import {atomLanguage} from "@/jotai/language";

interface Props {
    addNewUser: () => void;
    dropUser: () => void;
}

const NewUserPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage)

    const txtNewuser = lang === "ko" ? txtNewuserKo : lang === "jp" ? txtNewuserJp : txtNewuserEn;

    return (
        <CommonLayout>
            <ContentLayout title={txtNewuser.title}>
                <ItemRow setVertical={true}>
                    <span>{txtNewuser.desc}</span>
                </ItemRow>
                <ItemRow keepDirHor={true}>
                    <ItemCol size={5}>
                        <Button style={{ width: "100%" }} onClick={props.addNewUser}>
                            {txtNewuser.btnsign}
                        </Button>
                    </ItemCol>
                    <ItemCol size={5}>
                        <Button style={{ width: "100%" }} onClick={props.dropUser}>
                            {txtNewuser.btndecline}
                        </Button>
                    </ItemCol>
                </ItemRow>
            </ContentLayout>
        </CommonLayout>
    );
};

export default NewUserPresenter;
