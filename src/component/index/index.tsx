import React from 'react'
import {Timeline} from 'react-twitter-widgets'
import UserLoginInfo from './userLoginInfo'

import './index.css'
import store from '@/mobx/store'
import { observer } from 'mobx-react'
import { BodyContent, BodyHeader, Container, ItemCol, ItemRow, Button } from '@/styled/styledCommon'
import { Link } from 'react-router-dom'

import txtIndexKo from '@/lang/index/txtIndex-ko'
import txtIndexJp from '@/lang/index/txtIndex-jp'
import txtIndexEn from '@/lang/index/txtIndex-en'

const IndexPage = observer(() => {
    const {language, loginUser, loginStatus} = store
    const lang = language.lang

    const txtIndex =
        lang === 'ko' ? txtIndexKo :
            lang === 'jp' ? txtIndexJp : txtIndexEn

    return (
        <>
            <Container>
                <ItemRow>
                    <ItemCol size={3} isFlatUnderLg={true}>
                        <BodyHeader>
                            <h3>{txtIndex.self.title}</h3>
                        </BodyHeader>
                        <BodyContent style={{textAlign: 'center'}}>
                            <UserLoginInfo />
                        </BodyContent>
                        <BodyHeader className='visible-lg'>
                            <h3>{txtIndex.notice}</h3>
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
                            <ItemRow keepDirHor={true} style={{alignItems:'center'}}>
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
                                <h4>{txtIndex.about.title}</h4>
                            </ItemRow>
                            <ItemRow>
                                {txtIndex.about.cont}
                            </ItemRow>

                            <ItemRow>
                                <h4>{txtIndex.howto.title}</h4>
                            </ItemRow>
                            <ItemRow>
                                {txtIndex.howto.desc}
                            </ItemRow>

                            <ItemRow
                                style={{
                                    border: '1px solid white'
                                }}
                                setVertical={true}>
                                <BodyHeader>
                                    {txtIndex.howto.script}
                                </BodyHeader>
                                <BodyContent>
                                    <ItemRow>
                                    {
                                        (function() {
                                            if(loginStatus.isSigned) {
                                                return txtIndex.howto.addrLogin
                                            }
                                            else {
                                                return <b style={{color:'yellow'}}>★{txtIndex.howto.addrNoLogin}</b>
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
                                {txtIndex.howto.desc2}
                            </ItemRow>
                            <ItemRow>
                                ({txtIndex.howto.desc3})
                            </ItemRow>

                            <ItemRow>
                                <img alt="favo" className="howto-img"
                                    src={process.env.PUBLIC_URL+"/general-img/howto/howto1-register.png"} />
                            </ItemRow>
                            <ItemRow>
                                ※{txtIndex.howto.desc4}
                            </ItemRow>

                            <ItemRow>
                                <img alt="favo" className="howto-img2"
                                    src={process.env.PUBLIC_URL+"/general-img/howto/howto2-browser.png"} />
                            </ItemRow>
                            <ItemRow>
                                ※{txtIndex.howto.desc4}
                            </ItemRow>
                            <ItemRow>
                                ※{txtIndex.howto.browser}
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
                                    <h3>{txtIndex.notice}</h3>
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