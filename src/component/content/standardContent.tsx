import React from 'react';
import { useAtomValue } from 'jotai/index';
import { atomDarkmode } from '@/jotai/darkmode';
import { Wrapper, Title, Body, TitleWrapper } from './standardContent.style';

type Props = {
    title: string;
    children?: React.ReactNode;
    isHalf?: boolean;
    hasMore?: boolean;
    moreHref?: string;
};

const ContentLayout = ({ title, children, isHalf, hasMore, moreHref }: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <Wrapper isHalf={isHalf}>
            <TitleWrapper dark={dark}>
                <Title>{title}</Title>
                {hasMore ?
                    <Title style={{cursor: 'pointer'}}>&gt;</Title>
                    :
                    <></>
                }
            </TitleWrapper>
            <Body dark={dark}>{children}</Body>
        </Wrapper>
    );
};

export default ContentLayout;
