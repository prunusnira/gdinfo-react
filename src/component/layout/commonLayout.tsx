import store from "@/mobx/store";
import SinFooter from "@/module/footer/sinFooter";
import SinHeader from "@/module/header/sinHeader";
import { observer } from "mobx-react";
import React from "react";
import { Outer, Container } from "./commonLayout.style";

type Props = {
    children: React.ReactNode;
};

const CommonLayout = observer(({ children }: Props) => {
    const { dark } = store;
    return (
        <>
            <SinHeader />
            <Outer dark={dark.dark}>
                <Container>{children}</Container>
            </Outer>
            <SinFooter />
        </>
    );
});

export default CommonLayout;
