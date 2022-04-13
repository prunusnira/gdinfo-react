import React from "react";
import { Redirect } from "react-router-dom";
import store from "@/mobx/store";
import { observer } from "mobx-react";
import NewUserPresenter from "./newuserPresenter";
import Error500 from "@/module/error/500";
import useUserInfo from "@/module/user/login/useUserInfo";
import useUserCheck from "./useUserCheck";
import useUserAdd from "./useUserAdd";
import useUserDrop from "./useUserDrop";

import txtNewuserKo from "@/lang/user/newuser/txtNewUser-ko";
import txtNewuserJp from "@/lang/user/newuser/txtNewUser-jp";
import txtNewuserEn from "@/lang/user/newuser/txtNewUser-en";
import Error404 from "@/module/error/404";

const NewUser = observer(() => {
    const [newUser, token, updateUserInfo] = useUserInfo();
    const [moveToIndex, isValidAccess, isNewUserMode, setMoveToIndex] = useUserCheck();
    const addNewUser = useUserAdd(updateUserInfo, setMoveToIndex);
    const dropUser = useUserDrop(setMoveToIndex);

    const { language } = store;
    const lang = language.lang;
    const txtNewuser = lang === "ko" ? txtNewuserKo : lang === "jp" ? txtNewuserJp : txtNewuserEn;

    if (moveToIndex) {
        return <Redirect to={"/index"} />;
    } else if (isValidAccess) {
        alert(txtNewuser.existAccess);
        return <Error500 />;
    } else if (isNewUserMode) {
        return <NewUserPresenter addNewUser={addNewUser} dropUser={dropUser} />;
    } else {
        alert(txtNewuser.invalidAccess);
        return <Error404 />;
    }
});

export default NewUser;
