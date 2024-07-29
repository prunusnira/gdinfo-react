import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import {atomLanguage} from '@/jotai/language';
import txtSnapshotEn from '@/lang/user/snapshot/txtSnapshot-en';
import txtSnapshotJp from '@/lang/user/snapshot/txtSnapshot-jp';
import txtSnapshotKo from '@/lang/user/snapshot/txtSnapshot-ko';
import {useAtomValue} from 'jotai/index';
import React from 'react';
import SnapshotItem from './snapshotItem';
import {SnapshotListWrapper} from './snapshotListPresenter.style';

interface Props {
    id?: string;
    glist: Array<string>;
    dlist: Array<string>;
}

const SnapshotListPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const txtSnapshot =
        lang === 'ko' ? txtSnapshotKo : lang === 'jp' ? txtSnapshotJp : txtSnapshotEn;

    return (
        <CommonLayout>
            <ContentLayout title={'Snapshot List'}>
                <p>
                    {txtSnapshot.desc1}
                    <br/>
                    <b style={{color: 'coral'}}>{txtSnapshot.desc2}</b>
                    <br/>
                    {txtSnapshot.desc3}
                </p>
                <ContentLayout title={'GuitarFreaks'}>
                    <SnapshotListWrapper>
                        {
                            (props.glist.length === 0) ?
                                <h3>LIST IS EMPTY</h3>
                                :
                                (props.id) ?
                                    <SnapshotItem id={props.id} date={props.glist} gtype="gf"/>
                                    :
                                    <></>
                        }
                    </SnapshotListWrapper>
                </ContentLayout>
                <ContentLayout title={'DrumMania'}>
                    <SnapshotListWrapper>
                        {
                            (props.dlist.length === 0) ?
                                <h3>LIST IS EMPTY</h3>
                                :
                                (props.id) ?
                                    <SnapshotItem id={props.id} date={props.dlist} gtype="dm"/>
                                    :
                                    <></>
                        }
                    </SnapshotListWrapper>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
};

export default SnapshotListPresenter;
