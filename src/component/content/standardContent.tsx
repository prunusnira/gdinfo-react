import store from "@/mobx/store";
import { observer } from "mobx-react";
import React from "react";
import { Wrapper, Title, Body } from "./standardContent.style";

type Props = {
    title: string;
    children?: React.ReactNode;
    isHalf?: boolean;
};

const ContentLayout = observer(({ title, children, isHalf }: Props) => {
    const { dark } = store;
    return (
        <Wrapper isHalf={isHalf}>
            <Title dark={dark.dark}>{title}</Title>
            <Body dark={dark.dark}>{children}</Body>
        </Wrapper>
    );
});

export default ContentLayout;
