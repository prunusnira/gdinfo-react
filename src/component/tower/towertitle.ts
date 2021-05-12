import axios from 'axios';
import txtTower from './txttower';
import LData from '../common/language';
import CommonData from '../common/commonData';

const titletxt = require("./titletxt").titletxt;
const titlesp = require("./titletxt").titlesp;

const lang = LData.lang;

export const getFloorTitle = (tower: string, floor: number, rate: number, allfloors: number) => {
	// 타이틀 목록 가져오기
	let titleshort = "";
	
	// 1. 탑 이름에 따른 접두어 결정
	switch(tower) {
	case "towerDmDKDK": titleshort = "dkdk"; break;
	case "towerDmLeftPedal": titleshort = "lp"; break;
	case "towerDmNote": titleshort = "note"; break;
	case "towerDmFc": titleshort = "dmfc"; break;
	case "towerGfChord": titleshort = "chord"; break;
	case "towerGfAlter": titleshort = "alter"; break;
	case "towerGfMixed": titleshort = "mix"; break;
	case "towerGfFc": titleshort = "gffc"; break;
	case "towerTest": titleshort = "test"; break;
	default: titleshort = ""; break;
	}
	
	const titlelist = [];
	
	// 2. 탑 사이즈와 현재 층을 고려해 타이틀 이름을 리스트에 추가
	switch(allfloors) {
	case 4:
		switch(floor) {
		case 0: titlelist.push(titleshort+'lv1'); if(rate === 100) { titlelist.push(titleshort+'lv1g'); } break;
		case 1: titlelist.push(titleshort+'lv2'); if(rate === 100) { titlelist.push(titleshort+'lv2g'); } break;
		case 2: titlelist.push(titleshort+'lv3'); if(rate === 100) { titlelist.push(titleshort+'lv3g'); } break;
		case 3: titlelist.push(titleshort+'lvm'); if(rate === 100) { titlelist.push(titleshort+'lvmg'); } break;
		}
		break;
	case 5:
		switch(floor) {
		case 0: titlelist.push(titleshort+'lv1'); if(rate === 100) { titlelist.push(titleshort+'lv1g'); } break;
		case 1: titlelist.push(titleshort+'lv2'); if(rate === 100) { titlelist.push(titleshort+'lv2g'); } break;
		case 2: titlelist.push(titleshort+'lv3'); if(rate === 100) { titlelist.push(titleshort+'lv3g'); } break;
		case 3: titlelist.push(titleshort+'lv4'); if(rate === 100) { titlelist.push(titleshort+'lv4g'); } break;
		case 4: titlelist.push(titleshort+'lvm'); if(rate === 100) { titlelist.push(titleshort+'lvmg'); } break;
		}
		break;
	case 6:
		switch(floor) {
		case 0: titlelist.push(titleshort+'lv1'); if(rate === 100) { titlelist.push(titleshort+'lv1g'); } break;
		case 1: titlelist.push(titleshort+'lv2'); if(rate === 100) { titlelist.push(titleshort+'lv2g'); } break;
		case 2: titlelist.push(titleshort+'lv3'); if(rate === 100) { titlelist.push(titleshort+'lv3g'); } break;
		case 3: titlelist.push(titleshort+'lv4'); if(rate === 100) { titlelist.push(titleshort+'lv4g'); } break;
		case 4: titlelist.push(titleshort+'lv5'); if(rate === 100) { titlelist.push(titleshort+'lv5g'); } break;
		case 5: titlelist.push(titleshort+'lvm'); if(rate === 100) { titlelist.push(titleshort+'lvmg'); } break;
		}
		break;
	case 7:
		switch(floor) {
		case 0: titlelist.push(titleshort+'lv1'); if(rate === 100) { titlelist.push(titleshort+'lv1g'); } break;
		case 1: titlelist.push(titleshort+'lv2'); if(rate === 100) { titlelist.push(titleshort+'lv2g'); } break;
		case 2: titlelist.push(titleshort+'lv3'); if(rate === 100) { titlelist.push(titleshort+'lv3g'); } break;
		case 3: titlelist.push(titleshort+'lv4'); if(rate === 100) { titlelist.push(titleshort+'lv4g'); } break;
		case 4: titlelist.push(titleshort+'lv5'); if(rate === 100) { titlelist.push(titleshort+'lv5g'); } break;
		case 5: titlelist.push(titleshort+'lv6'); if(rate === 100) { titlelist.push(titleshort+'lv6g'); } break;
		case 6: titlelist.push(titleshort+'lvm'); if(rate === 100) { titlelist.push(titleshort+'lvmg'); } break;
		}
		break;
	case 8:
		switch(floor) {
		case 0: titlelist.push(titleshort+'lv1'); if(rate === 100) { titlelist.push(titleshort+'lv1g'); } break;
		case 1: titlelist.push(titleshort+'lv2'); if(rate === 100) { titlelist.push(titleshort+'lv2g'); } break;
		case 2: titlelist.push(titleshort+'lv3'); if(rate === 100) { titlelist.push(titleshort+'lv3g'); } break;
		case 3: titlelist.push(titleshort+'lv4'); if(rate === 100) { titlelist.push(titleshort+'lv4g'); } break;
		case 4: titlelist.push(titleshort+'lv5'); if(rate === 100) { titlelist.push(titleshort+'lv5g'); } break;
		case 5: titlelist.push(titleshort+'lv6'); if(rate === 100) { titlelist.push(titleshort+'lv6g'); } break;
		case 6: titlelist.push(titleshort+'lv7'); if(rate === 100) { titlelist.push(titleshort+'lv7g'); } break;
		case 7: titlelist.push(titleshort+'lvm'); if(rate === 100) { titlelist.push(titleshort+'lvmg'); } break;
		}
		break;
	}

	return titlelist;
}

export const floorTitlePopup = (tower: string, floor: number, rate: number, allfloors: number) => {
	const titlelist = getFloorTitle(tower, floor, rate, allfloors);
	
	// 팝업 셀렉트
	const titleselect = document.getElementById("titleselect")!;
	titleselect.innerHTML = '';
	const option = new Array(titlelist.length);
	for(let i = 0; i < titlelist.length; i++) {
		option[i] = document.createElement("option");
		option[i].setAttribute("value", titlelist[i]);
		
		const t = document.createTextNode(titletxt[titlelist[i]][lang]);
		option[i].appendChild(t);
		
		titleselect.appendChild(option[i]);
	}
	
	const targetDiv = document.getElementById("titlepopup")!;
	targetDiv.style.display = "block";
}

export const getMusicTitle = (mid: number, ptcode: number) => {
	const rtn = {
		type: 0,
		title: ""
	};

	rtn.type = titlesp[mid].type;
	
	if(rtn.type === 0) {
		rtn.title = titlesp[mid][ptcode].value;
	}
	else if(rtn.type === 1) {
		rtn.title = titlesp[mid].value;
	}
	else if(rtn.type === 2) {
		if(titlesp[mid][ptcode] != null) {
			rtn.title = titlesp[mid][ptcode].value;
		}
		else {
			rtn.title = titlesp[mid].value;
		}
	}

	return rtn;
}

export const musicTitlePopup = (mid: number, ptcode: number, div: string) => {
	const mtitle = getMusicTitle(mid, ptcode);
	
	// 팝업 셀렉트
	const titleselect = document.getElementById("titleselect")!;
	titleselect.innerHTML = '';
	const option = [];
	option[0] = document.createElement("option");
	option[0].setAttribute("value", mtitle.title);
	
	let t: Node;
	if(mtitle.type === 0) {
		t = document.createTextNode(titlesp[mid][ptcode][lang]);
	}
	else if(mtitle.type === 1) {
		t = document.createTextNode(titlesp[mid][lang]);
	}
	else if(mtitle.type === 2) {
		if(titlesp[mid][ptcode] != null) {
			t = document.createTextNode(titlesp[mid][ptcode][lang]);
		}
		else {
			t = document.createTextNode(titlesp[mid][lang]);
		}
	}
	option[0].appendChild(t!);
	
	titleselect.appendChild(option[0]);
	
	const popup = document.getElementById(div)!;
	popup.style.display = "block";
}

export const popupRemove = (div: string) => {
	const popup = document.getElementById(div)!;
	popup.style.display = "none";
}

export const setTitle = (userid: string, currentTitleValue: string, jqdiv: string) => {
	// 확정된 칭호를 프로필 DB에 등록
	axios.post(CommonData.dataUrl+"towertitleapply/"+userid+"/"+currentTitleValue)
	.then((res) => {
		alert((txtTower.title.changed as any)[lang]);
		popupRemove(jqdiv);
	});
}

export const getTowerTitle = (userid: number, handler: (d: string) => void) => {
	axios.post(CommonData.dataUrl+"towertitle/"+userid)
	.then((res) => {
		handler(res.data);
	});
}

export const checkFloorTitleExist = (towername: string) => {
	let exist = true;
	if(towername.startsWith("towerSp")) {
		exist = false;
	}

	return exist;
}

export const checkMusicTitleExist = (mid: number, ptcode: number) => {
	let isExist = false;
	if(titlesp[mid] !== undefined &&
		titlesp[mid] != null) {
		if(titlesp[mid].type === 0) {
			if(titlesp[mid][ptcode] !== undefined &&
				titlesp[mid][ptcode] != null) {
				isExist = true;
			}
		}
		else {
			isExist = true;
		}
	}
	
	return isExist;
}

export const addTowerTitleImage = (type: string, title: string) => {
	const image = document.createElement("img");
	image.src = "/img/title/"+title+".png";
	
	if(type === "35") {
		image.className = "towertitle35";
	}
	else if(type === "50") {
		image.className = "towertitle50";
	}
	
	return image;
}