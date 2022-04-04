import SinFooter from "@/module/footer/sinFooter";
import SinHeader from "@/module/header/sinHeader";
import React from "react";
import { Outer, Container } from "./commonLayout.style";

type Props = {
    children: React.ReactNode;
};

const CommonLayout = ({ children }: Props) => {
    return (
        <>
            <SinHeader />
            <Outer>
                <Container>{children}</Container>
            </Outer>
            <SinFooter />
        </>
    );
};

export default CommonLayout;
