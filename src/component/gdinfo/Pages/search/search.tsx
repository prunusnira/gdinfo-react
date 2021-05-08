import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import Pager from '../Common/pager';
import txtSearch from './txtsearch';
import RecentTableDiv from '../recent/recentTableDiv';
import PatternListItem from '../Pattern/pattern/ptListItem';

import CommonData from '../Common/commonData';
import { useParams } from 'react-router-dom';
import RecentData from '../recent/recentData';
import { PatternMem, PatternData, EachDiffLine } from '../Pattern/pattern/patternData';
import store from '../../../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Container, ItemRow } from '../../../../styled/styledCommon';
import RecentUser from './recentUser';

const SearchResult = observer(() =>  {
    const [userlist, setUserlist] = useState(Array<RecentData>())
    const [musiclist, setMusiclist] = useState(Array<PatternData>())
    const [allpage, setAllpage] = useState(0)

    const type = useParams<string>()
    const page = useParams<string>()
    const value = useParams<string>()

    const {language, loginStatus, loginUser} = store
    const lang = language.lang

    useEffect(() => {
        if(type === "music") {
            getMusicList(type, page, value);
        }
        else {
            getUserList(type, page, value);
        }
    }, [])

    const getUserList = (type: string, page: string, value: string) => {
        axios.post(`${CommonData.dataUrl}search/${type}/${value}/${page}`)
        .then((res) => {
            const json = res.data;
            const userList = JSON.parse(json.userList);
            const userlistDisp = [];
            if(JSON.parse(json.resultexist) === "yes") {
                for(let i = 0; i < userList.length; i++) {
                    const cur = userList[i];
                    const obj = new RecentUser();
                    if(cur.titletower !== '') {
                        obj.titletower = cur.titletower;
                    }
                    else {
                        obj.titletower = '';
                    }
                    obj.id = cur.id;
                    obj.name = cur.name;
                    obj.gskill = cur.gskill;
                    obj.dskill = cur.dskill;
                    obj.glink = "/skill/2/"+cur.id+"/gf/1/1";
                    obj.dlink = "/skill/2/"+cur.id+"/dm/1/1";
                    obj.uptimelong = cur.updatetime;
                    
                    userlistDisp.push(obj);
                }

                setUserlist(userlistDisp)
                setAllpage(json.pages)
            }
        });
    }

    const getMusicList = (type: string, page: string, value: string) => {
        axios.post(`${CommonData.dataUrl}search/${type}/${value}/${page}`)
        .then((res) => {
            const json = res.data;
            const userList = JSON.parse(json.userList);
            const ptlist = [];
            if(JSON.parse(json.resultexist) === "yes") {
                for(let i = 0; i < userList.length; i++) {
                    const cur = userList[i];
                    const obj = new PatternMem();
                    obj.jacket = CommonData.jacketUrl+cur.id+".jpg";
                    if(loginStatus.isSigned)
                        obj.link = `/music/${cur.id}/${loginUser.user.id}`;
                    else
                        obj.link = "#no_div";
                    obj.name = cur.name;
                    obj.removed = parseInt(cur.removed);

                    for(let j = 0; j < 4; j++) {
                        const d = new EachDiffLine();
                        if(j === 0) {
                            d.diff = "BASIC";
                            if(cur.gbsc !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/1/1";
                                d.glv = (cur.gbsc/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.bbsc !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/5/1";
                                d.blv = (cur.bbsc/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dbsc !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/9/1";
                                d.dlv = (cur.dbsc/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        else if(j === 1) {
                            d.diff = "ADVANCED";
                            if(cur.gadv !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/2/1";
                                d.glv = (cur.gadv/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.badv !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/6/1";
                                d.blv = (cur.badv/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dadv !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/10/1";
                                d.dlv = (cur.dadv/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        else if(j === 2) {
                            d.diff = "EXTREME";
                            if(cur.gext !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/3/1";
                                d.glv = (cur.gext/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.bext !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/7/1";
                                d.blv = (cur.bext/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dext !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/11/1";
                                d.dlv = (cur.dext/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        else if(j === 3) {
                            d.diff = "MASTER";
                            if(cur.gmas !== 0) {
                                d.glink = "/ptrank/"+cur.id+"/4/1";
                                d.glv = (cur.gmas/100).toFixed(2);
                            }
                            else {
                                d.glink = "#no_div";
                                d.glv = "";
                            }
                            if(cur.bmas !== 0) {
                                d.blink = "/ptrank/"+cur.id+"/8/1";
                                d.blv = (cur.bmas/100).toFixed(2);
                            }
                            else {
                                d.blink = "#no_div";
                                d.blv = "";
                            }
                            if(cur.dmas !== 0) {
                                d.dlink = "/ptrank/"+cur.id+"/12/1";
                                d.dlv = (cur.dmas/100).toFixed(2);
                            }
                            else {
                                d.dlink = "#no_div";
                                d.dlv = "";
                            }
                        }
                        obj.difflist.push(d);
                    }
                    ptlist.push(obj);
                }

                setMusiclist(ptlist)
                setAllpage(json.pages)
            }
        });
    }

    return (
        <Container>
            <ItemRow>
                <BodyHeader>
                    <h3>Search</h3>
                    <span>{(txtSearch.desc as any)[lang]}</span>
                </BodyHeader>
                <BodyContent>
                    <ItemRow>
                        <RecentTableDiv isMain={false} list={userlist} />
                    </ItemRow>
                    <ItemRow>
                        <PatternListItem list={musiclist} />
                    </ItemRow>
                    <Pager cpage={parseInt(page)} allpage={allpage}
                        baseUrl={`/search/${type}/${value}/`}
                        afterUrl={""} />
                </BodyContent>
            </ItemRow>
        </Container>
    )
})

export default SearchResult