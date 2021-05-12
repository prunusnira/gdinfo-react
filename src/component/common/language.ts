class Language {
	// Cookie control from stackoverflow
	// https://stackoverflow.com/questions/28654595/how-do-you-create-a-cookie-in-javascript-without-jquery
	lang = this.setLang();

	setLang() {
		let lang = navigator.language;

		if(lang==='ko' || lang==='ko-kr' || lang==='ko-KR') {
			lang = 'ko';
		}
		else if(lang==='ja' || lang==='ja-jp' || lang==='ja-JP') {
			lang = 'jp';
		}
		else {
			lang = 'en';
		}

		return lang;
	}

	createCookie(name: string, value: string, days: number) {
		let expires = "";
		if (days) {
			const date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toUTCString();
		}
		else expires = "";
		document.cookie = name+"="+value+expires+"; path=/; SameSite=None; Secure";
	}

	readCookie(name: string) {
		const nameEQ = name + "=";
		const ca = document.cookie.split(';');
		for(let i=0;i < ca.length;i++) {
			let c = ca[i];
			while (c.charAt(0)===' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	eraseCookie(name: string) {
		this.createCookie(name,"",-1);
	}
}

const LData = new Language();
export default LData;