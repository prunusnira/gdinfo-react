import ContentLayout from '@/component/content/standardContent';
import CommonLayout from '@/component/layout/commonLayout';
import Loading from '@/component/loading/loading';
import CommonData from '@/module/common/commonData';
import { getPatternImg600 } from '@/module/common/pattern';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DiffBox, DiffCell, DiffImg, DiffJacket, DiffRow, DiffRowWrap, DiffTitle, DiffWrapper } from './lvdiff.style';
import useLvDiff from './useLvDiff';

const LVDiff = () => {
    const { type } = useParams<{type: string}>();
    const { list, isLoading } = useLvDiff(type);

    const diffColor = (val: number) => val > 0 ? 'skyblue' : 'pink';

    return (
        <CommonLayout>
            <ContentLayout
                title={`Level Difference (GALAXY WAVE - FUZZ-UP) - ${type?.toUpperCase()}`}
            >
                {isLoading ? <Loading /> : <></>}
                <DiffBox>
                    {list.map((x) => (
                        <DiffWrapper>
                            <DiffJacket
                                src={`${CommonData.jacketUrl}${x.mid}.jpg`}
                            />
                            <DiffRowWrap>
                                <DiffTitle>{x.title}</DiffTitle>
                                <DiffRow>
                                    <DiffImg src={getPatternImg600(x.ptcode)} />
                                    <DiffCell>
                                        GALAXY WAVE {(x.lv / 100).toFixed(2)}
                                    </DiffCell>
                                    <DiffCell>
                                        FUZZ-UP {(x.lvold / 100).toFixed(2)}
                                    </DiffCell>
                                    <DiffCell
                                        color={diffColor(
                                            x.lv / 100 - x.lvold / 100,
                                        )}
                                    >
                                        DIFF{' '}
                                        {(x.lv / 100 - x.lvold / 100).toFixed(
                                            2,
                                        )}
                                    </DiffCell>
                                </DiffRow>
                            </DiffRowWrap>
                        </DiffWrapper>
                    ))}
                </DiffBox>
            </ContentLayout>
        </CommonLayout>
    );
};

export default LVDiff;
