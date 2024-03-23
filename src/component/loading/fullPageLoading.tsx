import { Outer } from '@/component/layout/commonLayout.style';
import { atomDarkmode } from '@/jotai/darkmode';
import SinHeader from '@/module/header/sinHeader';
import { ReactComponent as IconLoading } from '@/svg/loading.svg';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import style from './loading.module.scss';

interface Props {
    full?: boolean;
}

const FullPageLoading = ({ full }: Props) => {
    const dark = useAtomValue(atomDarkmode);
    return (
        <>
            <SinHeader />
            <Outer dark={dark}>
                <section className={`${full ? style.loadingFullScreen : ''}`}>
                    <IconLoading viewBox={'0 0 40 40'} width={100} height={100} />
                </section>
            </Outer>
        </>
    );
}

export default FullPageLoading;