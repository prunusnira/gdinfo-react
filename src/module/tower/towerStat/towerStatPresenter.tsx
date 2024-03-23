import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import { ITowerStat } from '@/data/tower/ITowerStat';
import { ITowerTitle } from '@/data/tower/ITowerTitle';
import { atomLanguage } from '@/jotai/language';
import { atomLoginUser } from '@/jotai/loginUser';
import { towerName } from '@/lang/tower/towername';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate } from 'react-router-dom';
import TowerStatList from './towerStatList';
import { TowerStatTable } from './towerStatPresenter.style';

interface Props {
    name: string;
    isPassed: string;
    list: Array<ITowerStat>;

    showTitleChangeModal: boolean;
    setTitleToBeChanged: (t: ITowerTitle) => void;
    setTitleChangeModal: (b: boolean) => void;
}

const TowerStatPresenter = (props: Props) => {
    const lang = useAtomValue(atomLanguage);
    const loginUser = useAtomValue(atomLoginUser);

    if (loginUser) {
        return (
            <CommonLayout>
                <ContentLayout
                    title={(towerName as any)[props.name] && (towerName as any)[props.name][lang]}
                >
                    <TowerStatTable>
                        <TowerStatList
                            id={loginUser?.id}
                            list={props.list}
                            setTitleChangeModal={props.setTitleChangeModal}
                            setTitleToBeChanged={props.setTitleToBeChanged}
                        />
                    </TowerStatTable>
                </ContentLayout>
            </CommonLayout>
        );
    }
    return (
        <Navigate to={'/'} />
    );
};

export default TowerStatPresenter;
