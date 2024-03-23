import ContentLayout from '@/component/content/standardContent';
import { IPattern } from '@/data/pattern/IPattern';
import { atomLanguage } from '@/jotai/language';
import txtPatternEn from '@/lang/pattern/pattern/txtPattern-en';
import txtPatternJp from '@/lang/pattern/pattern/txtPattern-jp';
import txtPatternKo from '@/lang/pattern/pattern/txtPattern-ko';
import Pager from '@/module/common/pager';
import Error404 from '@/module/error/404';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { PTListBody } from './ptList.style';
import PatternListItem from './ptListItem';

interface Props {
    switchHot: boolean;
    switchOther: boolean;
    switchVer: boolean;
    switchOrder: boolean;

    order?: string;
    nextVer: string;
    nextOrder: string;

    list: Array<IPattern>;
    page?: string;
    allPage: number;
    ver?: string;

    openPopup: (mid: number) => void;
}

const PTListPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);

    const txtPattern = lang === 'ko' ? txtPatternKo : lang === 'jp' ? txtPatternJp : txtPatternEn;

    if (props.switchHot) {
        if (!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=h`))
            return <Navigate replace to={`/pattern/00/${props.order}/1?hot=h`} />;
    }
    if (props.switchOther) {
        if (!window.location.href.endsWith(`/pattern/00/${props.order}/1?hot=o`))
            return <Navigate replace to={`/pattern/00/${props.order}/1?hot=o`} />;
    }
    if (props.switchVer) {
        if (!window.location.href.endsWith(`/pattern/${props.nextVer}/${props.order}/1`))
            return <Navigate replace to={`/pattern/${props.nextVer}/${props.order}/1`} />;
    }
    if (props.switchOrder) {
        if (
            !window.location.href.endsWith(
                `/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`,
            )
        )
            return (
                <Navigate replace
                          to={`/pattern/${props.nextVer}/${props.nextOrder}/1${window.location.search}`}
                />
            );
    }
    if (props.list && props.page && props.ver) {
        return (
            <>
                <PTListBody>
                    {txtPattern.desc1}
                    <br />
                    {txtPattern.desc2}
                </PTListBody>
                <ContentLayout title={txtPattern.ptinfo}>
                    <PatternListItem list={props.list} openPopup={props.openPopup} />
                </ContentLayout>
                <PTListBody>
                    <Pager
                        cpage={parseInt(props.page, 10)}
                        allpage={props.allPage}
                        baseUrl={`/pattern/${props.ver}/${props.order}/`}
                        afterUrl={window.location.search}
                    />
                </PTListBody>
            </>
        );
    }
    return (
        <Error404 />
    );
};

export default PTListPresenter;
