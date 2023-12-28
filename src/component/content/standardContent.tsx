import React from 'react';
import { useAtomValue } from 'jotai/index';
import { atomDarkmode } from '@/jotai/darkmode';
import { Wrapper, Title, Body } from './standardContent.style';

type Props = {
    title: string;
    children?: React.ReactNode;
    isHalf?: boolean;
};

const ContentLayout = ({ title, children, isHalf }: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <Wrapper isHalf={isHalf}>
            <Title dark={dark}>{title}</Title>
            <Body dark={dark}>{children}</Body>
        </Wrapper>
    );
};

export default ContentLayout;
