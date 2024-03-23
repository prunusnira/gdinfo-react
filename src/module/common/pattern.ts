export const GDPat = [
    { num: 1, pat: 'BSC-G' },
    { num: 2, pat: 'ADV-G' },
    { num: 3, pat: 'EXT-G' },
    { num: 4, pat: 'MAS-G' },
    { num: 5, pat: 'BSC-B' },
    { num: 6, pat: 'ADV-B' },
    { num: 7, pat: 'EXT-B' },
    { num: 8, pat: 'MAS-B' },
    { num: 9, pat: 'BSC-D' },
    { num: 10, pat: 'ADV-D' },
    { num: 11, pat: 'EXT-D' },
    { num: 12, pat: 'MAS-D' },
];

export const getPatternImg600 = (ptcode: number) => {
    let src = process.env.PUBLIC_URL;
    switch (ptcode) {
        case 1:
            src += '/general-img/diff/basg_600.png';
            break;
        case 2:
            src += '/general-img/diff/advg_600.png';
            break;
        case 3:
            src += '/general-img/diff/extg_600.png';
            break;
        case 4:
            src += '/general-img/diff/masg_600.png';
            break;
        case 5:
            src += '/general-img/diff/basb_600.png';
            break;
        case 6:
            src += '/general-img/diff/advb_600.png';
            break;
        case 7:
            src += '/general-img/diff/extb_600.png';
            break;
        case 8:
            src += '/general-img/diff/masb_600.png';
            break;
        case 9:
            src += '/general-img/diff/basd_600.png';
            break;
        case 10:
            src += '/general-img/diff/advd_600.png';
            break;
        case 11:
            src += '/general-img/diff/extd_600.png';
            break;
        case 12:
            src += '/general-img/diff/masd_600.png';
            break;
        default:
            break;
    }

    return src;
};

export const getPatternImg300 = (ptcode: number) => {
    let src = '';
    switch (ptcode) {
        case 1:
            src = '/general-img/diff/basg_300.png';
            break;
        case 2:
            src = '/general-img/diff/advg_300.png';
            break;
        case 3:
            src = '/general-img/diff/extg_300.png';
            break;
        case 4:
            src = '/general-img/diff/masg_300.png';
            break;
        case 5:
            src = '/general-img/diff/basb_300.png';
            break;
        case 6:
            src = '/general-img/diff/advb_300.png';
            break;
        case 7:
            src = '/general-img/diff/extb_300.png';
            break;
        case 8:
            src = '/general-img/diff/masb_300.png';
            break;
        case 9:
            src = '/general-img/diff/basd_300.png';
            break;
        case 10:
            src = '/general-img/diff/advd_300.png';
            break;
        case 11:
            src = '/general-img/diff/extd_300.png';
            break;
        case 12:
            src = '/general-img/diff/masd_300.png';
            break;
        default:
            break;
    }

    return src;
};