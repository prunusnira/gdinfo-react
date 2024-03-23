import { atomLanguage } from '@/jotai/language';
import { atomLoginUser } from '@/jotai/loginUser';
import txtIndexEn from '@/lang/index/txtIndex-en';
import txtIndexJp from '@/lang/index/txtIndex-jp';
import txtIndexKo from '@/lang/index/txtIndex-ko';
import { IndexContent, IndexScript, IndexScriptWrapper, IndexTitle } from '@/module/index/index.style';
import { useAtomValue } from 'jotai/index';
import React from 'react';

const ComponentIndexScript = () => {
    const lang = useAtomValue(atomLanguage);
    const loginUser = useAtomValue(atomLoginUser);
    const txtIndex = lang === 'ko' ? txtIndexKo : lang === 'jp' ? txtIndexJp : txtIndexEn;

    return (
        <>
            <IndexContent>{txtIndex.script.cont}</IndexContent>
            <IndexContent>
                <IndexScriptWrapper>
                    <IndexTitle>{txtIndex.script.scriptTitle}</IndexTitle>
                    <IndexContent>
                        {loginUser ? (
                            txtIndex.script.scriptLogin
                        ) : (
                            <b style={{ color: 'blue' }}>
                                ★{txtIndex.script.scriptNoLogin}
                            </b>
                        )}
                    </IndexContent>
                    <IndexScript
                        onClick={() => {
                            if(loginUser) {
                                navigator.clipboard.writeText(
                                    `avascript:$.getScript('https://sindata.nira.one/$/update?token=${loginUser.token}');`,
                                )
                                alert(txtIndex.script.alert);
                            }
                        }}
                    >
                        {loginUser ? (
                            <b>
                                javascript:$.getScript('https://sindata.nira.one/$/update?token=
                                {loginUser.token}');
                            </b>
                        ) : (
                            <b>Please login first</b>
                        )}
                    </IndexScript>
                </IndexScriptWrapper>
            </IndexContent>
        </>
    )
}

export default ComponentIndexScript;