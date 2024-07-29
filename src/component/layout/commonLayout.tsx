import SinFooter from "@/module/footer/sinFooter";
import SinHeader from "@/module/header/sinHeader";
import React from "react";
import {useAtomValue} from "jotai/index";
import {atomDarkmode} from "@/jotai/darkmode";
import { Outer, Container, FooterWrapper } from "./commonLayout.style";

type Props = {
    children: React.ReactNode;
};

const CommonLayout = ({ children }: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <>
            <SinHeader />
            <Outer $dark={dark}>
                <Container>{children}</Container>
                <FooterWrapper>
                    <SinFooter />
                </FooterWrapper>
            </Outer>
        </>
    );
}

export default CommonLayout;
