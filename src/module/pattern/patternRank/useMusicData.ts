import { getMusicData } from '@/api/getMusicData';
import { getPatternImg600 } from '@/module/common/pattern';
import { useEffect, useState } from 'react';

interface Props {
    ptcode?: string,
    mid?: string,
    setLoaded?: (b: boolean) => void
}

const useMusicData = ({ ptcode, mid, setLoaded }: Props) => {
    const [pattern, setPattern] = useState('');
    const [level, setLevel] = useState('');
    const [mname, setMName] = useState('');
    const [composer, setComposer] = useState('');

    const setupPattern = () => {
        switch (ptcode) {
            case '1':
                setPattern('BSC-G');
                break;
            case '2':
                setPattern('ADV-G');
                break;
            case '3':
                setPattern('EXT-G');
                break;
            case '4':
                setPattern('MAS-G');
                break;
            case '5':
                setPattern('BSC-B');
                break;
            case '6':
                setPattern('ADV-B');
                break;
            case '7':
                setPattern('EXT-B');
                break;
            case '8':
                setPattern('MAS-B');
                break;
            case '9':
                setPattern('BSC-D');
                break;
            case '10':
                setPattern('ADV-D');
                break;
            case '11':
                setPattern('EXT-D');
                break;
            case '12':
                setPattern('MAS-D');
                break;
            default:
                break;
        }
    };

    const loadMusicData = () => {
        if (ptcode && mid && setLoaded) {
            getMusicData(mid).then((json) => {
                const music = JSON.parse(json.music);

                const patternUrl = getPatternImg600(parseInt(ptcode, 10));
                let levelNum: string;
                switch (parseInt(ptcode, 10)) {
                    case 1:
                        levelNum = (music.gbsc / 100).toFixed(2);
                        break;
                    case 2:
                        levelNum = (music.gadv / 100).toFixed(2);
                        break;
                    case 3:
                        levelNum = (music.gext / 100).toFixed(2);
                        break;
                    case 4:
                        levelNum = (music.gmas / 100).toFixed(2);
                        break;
                    case 5:
                        levelNum = (music.bbsc / 100).toFixed(2);
                        break;
                    case 6:
                        levelNum = (music.badv / 100).toFixed(2);
                        break;
                    case 7:
                        levelNum = (music.bext / 100).toFixed(2);
                        break;
                    case 8:
                        levelNum = (music.bmas / 100).toFixed(2);
                        break;
                    case 9:
                        levelNum = (music.dbsc / 100).toFixed(2);
                        break;
                    case 10:
                        levelNum = (music.dadv / 100).toFixed(2);
                        break;
                    case 11:
                        levelNum = (music.dext / 100).toFixed(2);
                        break;
                    case 12:
                        levelNum = (music.dmas / 100).toFixed(2);
                        break;
                    default:
                        levelNum = '';
                        break;
                }

                setPattern(patternUrl);
                setMName(music.name);
                setComposer(music.composer);
                setLevel(levelNum);
                setLoaded(true);
            });
        }
    };

    useEffect(() => {
        // setup Pattern
        if (ptcode && mid && setLoaded) {
            setupPattern();
            loadMusicData();
        }
    }, [ptcode]);

    return { pattern, level, mname, composer };
};

export default useMusicData;
