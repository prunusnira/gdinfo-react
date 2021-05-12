import html2canvas from 'html2canvas'

const scrShot = (divname: string, filename: string) => {
    window.scrollTo(0, 0);
    html2canvas(document.getElementById(divname)!, {
        useCORS: true,
    })
    .then(canvas => {
        // dataUrl로 뽑으면 파일명이 너무 길어서
        // 웹킷 브라우저에서는 길이 제한으로 잘라버림
        // 그래서 blob으로 변경할 필요가 있음
        const dataUrl = canvas.toDataURL("image/jpeg")
        const blob = uriToBlob(dataUrl)
        const downloadUrl = URL.createObjectURL(blob)

        const el = document.createElement("a")
        el.href = downloadUrl
        el.download = filename
        el.click()

        URL.revokeObjectURL(downloadUrl)
    })
    .catch(error => {
        console.error('html2canvas error', error)
    })
}

function uriToBlob(uri: String): Blob {
    let byteString: String = "";

    // base64 데이터를 raw binary로 변환
    if(uri.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(uri.split(',')[1]);
    }
    else {
        byteString = unescape(uri.split(',')[1]);
    }

    // mime type 추출
    const mime = uri.split(',')[0].split(':')[1].split(';')[0];

    // typed array에 string 쓰기
    const ia = new Uint8Array(byteString.length);
    for(let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mime});
}

export default scrShot;