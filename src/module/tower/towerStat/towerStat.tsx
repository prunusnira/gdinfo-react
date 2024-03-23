import { atomLoginUser } from '@/jotai/loginUser';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import TitleChangeModal from './titleChangeModal/titleChangeModal';
import TowerStatPresenter from './towerStatPresenter';
import useTitleModal from './useTitleModal';
import useTowerStat from './useTowerStat';

const TowerStat = () => {
    const loginUser = useAtomValue(atomLoginUser);
    const { tower } = useParams();
    const { name, isPassed, list } = useTowerStat(tower);
    const {
        showTitleChangeModal,
        titleToBeChanged,
        setTitleChangeModal,
        setTitleToBeChanged,
        changeTitle,
    } = useTitleModal();

    if (!loginUser) {
        return <Navigate replace to={'/login'} />;
    }
    return (
        <>
            <TowerStatPresenter
                name={name}
                isPassed={isPassed}
                list={list}
                showTitleChangeModal={showTitleChangeModal}
                setTitleChangeModal={setTitleChangeModal}
                setTitleToBeChanged={setTitleToBeChanged}
            />
            <TitleChangeModal
                showTitleChangeModal={showTitleChangeModal}
                titleToBeChanged={titleToBeChanged}
                setTitleChangeModal={setTitleChangeModal}
                changeTitle={changeTitle}
            />
        </>
    );
};

export default TowerStat;
