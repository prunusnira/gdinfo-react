import React from 'react';
import {Timeline} from 'react-twitter-widgets';
import UserLoginInfo from './userLoginInfo';
import txtIndex from './txtIndex';

import './index.css';
import store from '../../mobx/store';
import { observer } from 'mobx-react';
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow, Button } from '../../styled/styledCommon';
import { Link } from 'react-router-dom';

const IndexPage = observer(() => {
    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    return (
        <>
            <Container>
                <ItemRow>
                    <ItemCol size={3} isFlatUnderLg={true}>
                        <BodyHeader>
                            <h3>{(txtIndex.self.title as any)[lang]}</h3>
                        </BodyHeader>
                        <BodyContent style={{textAlign: 'center'}}>
                            <UserLoginInfo />
                        </BodyContent>
                        <BodyHeader className='visible-lg'>
                            <h3>{(txtIndex.notice as any)[lang]}</h3>
                        </BodyHeader>
                        <BodyContent className='visible-lg'>
                            <Timeline
                                dataSource={{
                                    sourceType: 'profile',
                                    screenName: '_nira_one'
                                }}
                                options={{
                                    height: '400'
                                }}
                            />
                        </BodyContent>
                    </ItemCol>
                    <ItemCol size={7} isFlatUnderLg={true}>
                        <BodyHeader>
                            <h3>Skill Navigator</h3>
                        </BodyHeader>
                        <BodyContent>
                            <ItemRow keepDirHor={true}>
                            {
                                (function() {
                                    if(loginStatus.isSigned) {
                                        return (
                                            <>
                                                <Link to='/profile'>
                                                    <Button>Profile</Button>
                                                </Link>
                                                <Link to='/myskill/gf'>
                                                    <Button>GF Skill</Button>
                                                </Link>
                                                <Link to='/myskill/dm'>
                                                    <Button>DM Skill</Button>
                                                </Link>
                                                <Link to='/mybest'>
                                                    <Button>My Best</Button>
                                                </Link>
                                                <Link to='/tower/index'>
                                                    <Button>Tower</Button>
                                                </Link>
                                            </>
                                        );
                                    }
                                    else {
                                        return null;
                                    }
                                })()
                            }
                            </ItemRow>

                            <ItemRow>
                                <h4>{(txtIndex.about.title as any)[lang]}</h4>
                            </ItemRow>
                            <ItemRow>
                                {(txtIndex.about.cont as any)[lang]}
                            </ItemRow>

                            <ItemRow>
                                <h4>{(txtIndex.howto.title as any)[lang]}</h4>
                            </ItemRow>
                            <ItemRow>
                                {(txtIndex.howto.desc as any)[lang]}
                            </ItemRow>

                            <ItemRow
                                style={{
                                    border: '1px solid white'
                                }}
                                setVertical={true}>
                                <BodyHeader>
                                    {(txtIndex.howto.script as any)[lang]}
                                </BodyHeader>
                                <BodyContent>
                                    <ItemRow>
                                    {
                                        (function() {
                                            if(loginStatus.isSigned) {
                                                return (txtIndex.howto.addrLogin as any)[lang]
                                            }
                                            else {
                                                return <b style={{color:'yellow'}}>★{(txtIndex.howto.addrNoLogin as any)[lang]}</b>
                                            }
                                        })()
                                    }
                                    </ItemRow>
                                    <ItemRow>
                                        {
                                            (function() {
                                                if(loginStatus.isSigned) {
                                                    return <b>javascript:$.getScript('https://sindata.nira.one/$/update?token={loginUser.user.token}');</b>;
                                                }
                                                else {
                                                    return <b>Please login first</b>;
                                                }
                                            })()
                                        }
                                    </ItemRow>
                                </BodyContent>
                            </ItemRow>

                            <ItemRow>
                                {(txtIndex.howto.desc2 as any)[lang]}
                            </ItemRow>
                            <ItemRow>
                                ({(txtIndex.howto.desc3 as any)[lang]})
                            </ItemRow>

                            <ItemRow>
                                <img alt="favo" className="howto-img"
                                    src={process.env.PUBLIC_URL+"/general-img/howto/howto1-register.png"} />
                            </ItemRow>
                            <ItemRow>
                                ※{(txtIndex.howto.desc4 as any)[lang]}
                            </ItemRow>

                            <ItemRow>
                                <img alt="favo" className="howto-img2"
                                    src={process.env.PUBLIC_URL+"/general-img/howto/howto2-browser.png"} />
                            </ItemRow>
                            <ItemRow>
                                ※{(txtIndex.howto.desc4 as any)[lang]}
                            </ItemRow>
                            <ItemRow>
                                ※{(txtIndex.howto.browser as any)[lang]}
                            </ItemRow>
                            <ItemRow>
                                Google Chrome (for all OS), Safari (for iOS)
                            </ItemRow>

                            <ItemRow keepDirHor={true}>
                                <ItemCol size={5}>
                                    <img alt="favo" className="howto-img2"
                                        src={process.env.PUBLIC_URL+"/general-img/howto/howto3-k.png"} />
                                </ItemCol>
                                <ItemCol size={5}>
                                    <img alt="favo" className="howto-img2"
                                        src={process.env.PUBLIC_URL+"/general-img/howto/howto3-j.png"} />
                                </ItemCol>
                            </ItemRow>

                            <ItemRow>
                                <BodyHeader className='visible-underlg'>
                                    <h3>{(txtIndex.notice as any)[lang]}</h3>
                                </BodyHeader>
                                <BodyContent className='visible-underlg'>
                                    <Timeline
                                        dataSource={{
                                            sourceType: 'profile',
                                            screenName: '_nira_one'
                                        }}
                                        options={{
                                            height: '400'
                                        }}
                                    />
                                </BodyContent>
                            </ItemRow>
                        </BodyContent>
                    </ItemCol>
                </ItemRow>
            </Container>
        </>
    );
})

export default IndexPage