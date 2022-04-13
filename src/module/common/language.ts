class Language {
	// Cookie control from stackoverflow
	// https://stackoverflow.com/questions/28654595/how-do-you-create-a-cookie-in-javascript-without-jquery
	lang = this.setLang()

	setLang() {
		let lang = navigator.language;

		if(lang==='ko' || lang==='ko-kr' || lang==='ko-KR') {
			lang = 'ko'
		}
		else if(lang==='ja' || lang==='ja-jp' || lang==='ja-JP') {
			lang = 'jp'
		}
		else {
			lang = 'en'
		}

		return lang
	}
}

const LData = new Language()
export default LData