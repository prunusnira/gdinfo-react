import html2canvas from 'html2canvas';

const scrShot = (divname: string, filename: string) => {
    window.scrollTo(0, 0);
    html2canvas(document.getElementById(divname)!, {
        useCORS: true
    })
    .then(function(canvas) {
        const el = document.createElement("a");
        el.href = canvas.toDataURL("image/jpeg");
        el.download = filename;
        el.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}

export default scrShot;