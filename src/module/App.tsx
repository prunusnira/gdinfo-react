import { atomLanguage } from '@/jotai/language';
import { atomVersion } from '@/jotai/version';
import Language from '@/module/common/language';
import { GlobalStyle } from '@/styled/globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonData from './common/commonData';

import Error404 from './error/404';
import Error500 from './error/500';
import LVDiff from './etc/lvdiff/lvdiff';

import IndexPage from './index/index';
import NoticePage from './notice/notice';
import ClearTableLoginChk from './pattern/cleartable/checkLogin';
import ClearTable from './pattern/cleartable/clearTable';
import NoRecordMusicList from './pattern/noRecordMusic/noRecordList';
import NotPlayedLoginCheck from './pattern/noRecordMusic/npLoginChk';

import PTList from './pattern/patternList/ptList';
import PatternRank from './pattern/patternRank/patternRank';
import Recent from './recent/recent';
import SearchResult from './search/search';

import MySkill from './skill/myskill';
import PlaycountRanking from './skill/playcntrank/playcntrank';
import SkillRanking from './skill/ranking/skillranking';
import EXC from './skill/skill/exc';
import SkillContainer from './skill/skill/skill';
import SkillSnapshot from './skill/skill/skillSnapshot';
import TowerHowto from './tower/towerHowto/towerHowto';

import TowerList from './tower/towerList/towerlist';
import TowerStat from './tower/towerStat/towerStat';
import Login from './user/login/login';
import NewUser from './user/newuser/newuser';
import PlayCountLoginCheck from './user/playcount/checkLogin';
import PlayCount from './user/playcount/playcount';
import ProfileLoginCheck from './user/profile/checkLogin';

import Profile from './user/profile/profile';
import ProfileReset from './user/reset/reset';
import SnapshotLoginCheck from './user/snapshot/checkLogin';
import SnapshotList from './user/snapshot/snapshotList';

/**
 * header/footer를 제외하고는 react-router-dom으로 구성함
 */
const App = () => {
    const [lang, setLang] = useAtom(atomLanguage);
    const [version, setVersion] = useAtom(atomVersion);
    const queryClient = new QueryClient();

    useEffect(() => {
        if (
            version === null ||
            version === undefined ||
            version < CommonData.internalVersion
        ) {
            localStorage.clear();
            setVersion(CommonData.internalVersion);
        }

        if (
            lang === null ||
            lang === undefined ||
            lang === ''
        ) {
            setLang(Language().getLang());
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/index" element={<IndexPage />} />
                    <Route path="/notice/:page" element={<NoticePage />} />
                    <Route path="/recent" element={<Recent />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search/:type/:value/:page" element={<SearchResult />} />
                    <Route path="/newuser" element={<NewUser />} />
                    {/* Profile */}
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/profile" element={<ProfileLoginCheck />} />
                    <Route path="/mybest/:id" element={<PlayCount />} />
                    <Route path="/mybest" element={<PlayCountLoginCheck />} />
                    <Route path="/snapshot" element={<SnapshotLoginCheck />} />
                    <Route path="/skill/snapshot/list/:id" element={<SnapshotList />} />
                    <Route path="/reset" element={<ProfileReset />} />
                    {/* Skill */}
                    <Route path="/myskill/:gtype" element={<MySkill />} />
                    <Route
                        path="/skill/:ptype/:userid/:gtype/:page/:order"
                        element={<SkillContainer share={false} />}
                    />
                    <Route
                        path="/skillscr/:ptype/:userid/:gtype/:page/:order"
                        element={<SkillContainer share={true} />}
                    />
                    <Route
                        path="/skill/snapshot/view/:share/:id/:date/:gtype"
                        element={<SkillSnapshot />}
                    />
                    <Route path="/rank/:gtype/:page" element={<SkillRanking />} />
                    <Route path="/cntrank/:page" element={<PlaycountRanking />} />
                    <Route path="/exc/:gtype" element={<EXC />} />
                    {/* Pattern */}
                    <Route path="/pattern/:ver/:order/:page" element={<PTList />} />
                    <Route path="/ptrank/:mid/:ptcode/:page" element={<PatternRank />} />
                    <Route
                        path="/notplayed/:gtype/:userid/:vertype/:page"
                        element={<NoRecordMusicList />}
                    />
                    <Route path="/notplayed" element={<NotPlayedLoginCheck />} />
                    <Route path="/cleartable/:userid" element={<ClearTable />} />
                    <Route path="/cleartable/" element={<ClearTableLoginChk />} />
                    {/* Tower */}
                    <Route path="/tower/index" element={<TowerList />} />
                    <Route path="/tower/stat/:tower" element={<TowerStat />} />
                    <Route path="/tower/howto" element={<TowerHowto />} />
                    {/* Error */}
                    <Route path="/error/404" element={<Error404 />} />
                    <Route path="/error/500" element={<Error500 />} />
                    {/* Bonus */}
                    <Route path="/lvdiff/:type" element={<LVDiff />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
