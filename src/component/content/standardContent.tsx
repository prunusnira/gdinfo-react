import React from "react";
import { Wrapper, Title, Body } from "./standardContent.style";

type Props = {
    title: string;
    children?: React.ReactNode;
};

const ContentLayout = ({ title, children }: Props) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Body>{children}</Body>
        </Wrapper>
    );
};

export default ContentLayout;
