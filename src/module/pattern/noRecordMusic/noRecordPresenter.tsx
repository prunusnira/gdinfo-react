import ContentLayout from '@/component/content/standardContent';
import { INoRecord } from '@/data/INoRecord';
import Pager from '@/module/common/pager';
import React from 'react';
import { Navigate } from 'react-router-dom';
import NpItem from './npItem';

interface Props {
    switchLv: boolean;
    switchVer: boolean;
    switchHot: boolean;
    switchOther: boolean;
    switchClear: boolean;

    lv: number;
    ver: string;
    allPage: number;
    list: Array<INoRecord>;

    gtype?: string;
    userid?: string;
    vertype?: string;
    page?: string;
}

const NoRecordPresenter = (props: Props) => {
    if (props.switchLv) {
        return (
            <Navigate replace
                      to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?lv=${props.lv}`}
            />
        );
    }
    if (props.switchVer) {
        return (
            <Navigate replace
                      to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?ver=${props.ver}`}
            />
        );
    }
    if (props.switchHot) {
        return (
            <Navigate replace to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?hot=h`} />
        );
    }
    if (props.switchOther) {
        return (
            <Navigate replace to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1?hot=o`} />
        );
    }
    if (props.switchClear) {
        return <Navigate replace to={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/1`} />;
    }
    return (
        <ContentLayout
            title={`${props.gtype === 'gf' ? 'GuitarFreaks' : 'DrumMania'} No record list`}
        >
            <NpItem list={props.list} />
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h3>
                    {(function() {
                        if (props.list.length === 0) return 'List is empty';
                        return '';
                    })()}
                </h3>
            </div>
            {props.gtype && props.userid && props.vertype && props.page &&
                (<Pager
                    cpage={parseInt(props.page, 10)}
                    allpage={props.allPage}
                    baseUrl={`/notplayed/${props.gtype}/${props.userid}/${props.vertype}/`}
                    afterUrl={window.location.search}
                />)
            }
        </ContentLayout>
    );
};

export default NoRecordPresenter;
