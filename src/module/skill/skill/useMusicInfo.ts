import { getMusicData } from '@/api/getMusicData';
import { GDVer } from '@/module/common/version';
import { useEffect, useState } from 'react';

const useMusicInfo = (mid: string) => {
    const [musicName, setMusicName] = useState('');
    const [composer, setComposer] = useState('');
    const [version, setVersion] = useState('');

    const loadMusicInfo = () => {
        getMusicData(mid).then((data) => {
            const json = JSON.parse(data.music);
            setMusicName(json.name);
            setComposer(json.composer);
            setVersion(GDVer[json.version - 1].full);
        });
    };

    useEffect(() => {
        if (mid !== '0') loadMusicInfo();
        else {
            setMusicName('');
            setComposer('');
            setVersion('');
        }
    }, [mid]);

    return { musicName, composer, version };
};

export default useMusicInfo;
