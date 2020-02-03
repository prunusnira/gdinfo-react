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
        console.log(filename);
        el.click();
        console.log("Check Click Worked");
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    })
    .then(function() {
        console.log("THEN");
    });
}

export default scrShot;