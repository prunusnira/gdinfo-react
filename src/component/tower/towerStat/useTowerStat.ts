import axios from "axios"
import { useEffect, useState } from "react"
import store from "../../../mobx/store"
import CommonData from "../../common/commonData"
import { FloorClearData, FloorItemData, TowerData, TowerManage, TowerStatData } from "./towerStatData"
import { GDPat } from "../../common/pattern"
import TitleType from "./data/titleType"
import { titlesp, titletxt } from "../../../lang/tower/titletxt"

import txtTowerKo from '../../../lang/tower/txtTower-ko'
import txtTowerJp from '../../../lang/tower/txtTower-jp'
import txtTowerEn from '../../../lang/tower/txtTower-en'

type TowerStatReturn = [string, string, Array<TowerStatData>]

const useTowerStat = (tower: string): TowerStatReturn => {
	const [list, setList] = useState(Array<TowerStatData>())
	const [isPassed, setPassed] = useState('')
	const [name, setName] = useState('')
    
    useEffect(() => {
		if(loginUser.user.id !== undefined && loginUser.user.id !== '')
			loadTowerStatData()
	}, [])

	const {loginUser, language} = store
	const lang = language.lang

    const txtTower =
        lang === 'ko' ? txtTowerKo :
            lang === 'jp' ? txtTowerJp : txtTowerEn

    const loadTowerStatData = () => {
        const towerRecord = new Array<string>()
        const towercomp = new Array<boolean>()
        let towerlistScr = []
        const clear = []

        axios.post(`${CommonData.dataUrl}towerdata/${tower}/${loginUser.user.id}`)
        .then((res) => {
			const json = res.data
			const tower = JSON.parse(json.tower)
			const towerlist = JSON.parse(json.towerlist)
            const towheight = tower.levels
    
            const pat = new Array<Array<TowerData>>(towheight)
            // 들어가기 전에 일단 패턴 분류부터
            for(let i = 0; i < towheight; i++) {
                pat[i] = new Array<TowerData>()
            }
            
            for(let i = 0; i < towerlist.length; i++) {
                pat[towerlist[i].tower.floor].push(towerlist[i])
            }
            
            for(let i = 0; i < towheight; i++) {
                towercomp[i] = true
                clear[i] = 2
            }

            // 층별 클리어 상태 확인
            clearOX(towheight, pat, towercomp)

            // 각 탑의 정보 추가 (메인)
            towerlistScr = updateTower(tower, pat, towerRecord, tower)
            
            // 탑의 클리어 상태 체크
            updateAllPassed(towercomp)

			setName(tower.name)
			setList(towerlistScr)
        })
    }

    const updateTower = (
        manage: TowerManage,
        pat: Array<Array<TowerData>>,
        towerRecord: Array<string>,
        towername: string
    ) => {
		const size = manage.levels
		const list = new Array<TowerStatData>()

		for(let i = 0; i < size; i++) {
			const obj: TowerStatData = {
                index: 0,
                topid: '',
                btnid: '',
                opbtn: '',
                skillfrom: 0,
                floor: 0,
                floorclear: '',
                titlechangable: '',
                titlechange: {
                    display: '',
                    title: '',
                    type: 0,
                },
                btnchangable: false,
                floorid: '',
                clearnotice: '',
                floorlist: [],
            }
			obj.index = i
			obj.topid = `t${i}`
			obj.btnid = `t${i}p`
			obj.opbtn = '▼'
			obj.skillfrom = (manage.skill + (size-i-1)*500)
			obj.floor = size-i

			const clearstat = checkClear(pat[size-i-1])
			if(clearstat['clear'] && clearstat['rate'] === 100) {
				obj.floorclear = `${process.env.PUBLIC_URL}/general-img/tower/goldpassed.png`
			}
			else if(clearstat['clear']) {
				obj.floorclear = `${process.env.PUBLIC_URL}/general-img/tower/passed.png`
			}
			else {
				obj.floorclear = `${process.env.PUBLIC_URL}/general-img/tower/running.png`
			}
			
			if(clearstat['clear']) {
				if(checkFloorTitleExist(manage.name)) {
					var title =
						getFloorTitle(
							manage.name,
							(manage.levels-i-1),
							clearstat['rate'],
							size,
							lang)

					obj.titlechangable = txtTower.detail.titlechangable
					obj.titlechange = {
						type: 0,
						title: title.title,
						display: title.display
					}
					obj.btnchangable = true
				}
			}
			else {
				obj.titlechangable = txtTower.detail.titleunchangable
				obj.btnchangable = false
			}

			// id
			obj.floorid = 't'+i+'c';
			obj.clearnotice =
				`${txtTower.detail.require1}`+
				`${pat[size-i-1].length}`+
				`${txtTower.detail.require2}`+
				`${Math.ceil(pat[size-i-1].length*0.7)}`+
				`${txtTower.detail.require3}`
			
			obj.floorlist = new Array<FloorItemData>()

			for(let j = 0; j < pat[size-i-1].length; j++) {
				const cfl = pat[size-i-1][j]
				const flist: FloorItemData = {
                    jacket: '',
                    name: '',
                    pattern: '',
                    lv: '',
                    condRate: 0,
                    condFc: false,
                    rate: 0,
                    fc: false,
                    description: '',
                    clear: '',
                    title: {
                        display: '',
                        title: '',
                        type: 0,
                    },
                }
				flist.jacket = `${CommonData.jacketUrl}${cfl.tower.musicid}.jpg`
				flist.name = cfl.tower.mname
				flist.pattern = GDPat[cfl.tower.ptcode-1].pat
				flist.lv = (cfl.tower.level/100).toFixed(2)

				flist.condRate = cfl.tower.rate/100
				if(cfl.tower.fc === true) flist.condFc = true

				if(cfl.skill != null) {
					// 역대 rate 중 가장 높은 것 가져오기
					const ratearr =
						[cfl.skill.rate, cfl.skill.ratetb, cfl.skill.ratetbre,
							cfl.skill.ratemx, cfl.skill.rateex, cfl.skill.ratenx]
					
					let rate = 0
					ratearr.filter(x => { if(rate < x) rate = x })
					
					flist.rate = rate/100
					flist.fc = cfl.skill.checkfc === "Y" ? true : false
				}
				else {
					flist.rate = 0
					flist.fc = false
				}
				
				flist.description = cfl.tower.description
				if(cfl.clear) {
					flist.clear = `${process.env.PUBLIC_URL}/general-img/tower/passed.png`
					if(checkMusicTitleExist(cfl.tower.musicid, cfl.tower.ptcode)) {
						flist.title = getMusicTitle(cfl.tower.musicid, cfl.tower.ptcode, lang)
					}
				}
				else {
					flist.clear = `${process.env.PUBLIC_URL}/general-img/tower/running.png`
					flist.title = {
                        display: '',
                        title: '',
                        type: 0,
                    }
				}
				obj.floorlist.push(flist)
			}
			list.push(obj)
		}
		return list
	}
	
	const checkClear = (list: Array<TowerData>) => {
		let cleared = true
		
		// 일반 곡들을 70%이상 클리어 했는가
		// 개수 세기
		let numc = 0;
		for(let i = 0; i < list.length; i++) {
			if(list[i].clear) numc++
		}
		
		const rate = numc*100/list.length
		if(rate < 70) cleared = false
		
		const status: FloorClearData = {
            clear: false,
            rate: 0,
        }
		status.clear = cleared
		status.rate = rate
		
		return status
	}
	const updateAllPassed = (towercomp: Array<boolean>) => {
		var html = ""
		
		var passed = true
		for(var i = 0; i < towercomp.length; i++) {
			if(!towercomp[i]) {
				passed = false
				break
			}
		}
		
		if(passed) {
			html += `${process.env.PUBLIC_URL}/general-img/tower/towercleared.png`
		}
		else {
			html += `${process.env.PUBLIC_URL}/general-img/tower/towerprogressing.png`
		}

		setPassed(html)
	}
	
	const clearOX = (size: number, pat: Array<Array<TowerData>>, towercomp: Array<boolean>) => {
		for(var i = 0; i < size; i++) {
			// 개수세기
			var numc = 0
			for(var j = 0; j < pat[i].length; j++) {
				if(pat[i][j].clear) numc++
			}
			var rate = numc*100/pat[i].length
			
			if(rate < 70) towercomp[i] = false
			
			if(i-1 >= 0 && !towercomp[i-1]) towercomp[i] = false
		}
	}
	const getFloorTitle = (tower: string,
								floor: number,
								rate: number,
								allfloors: number,
								lang: string) => {
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

		let titlertn: TitleType = {
			type: 0,
			title: '',
			display: ''
		}

		if(titleshort !== '') {
			if(allfloors === floor+1) {
				titlertn.title = `${titleshort}lvm`
			}
			else {
				titlertn.title = `${titleshort}lv${floor+1}`
			}

			if(rate === 100) {
				titlertn.title = `${titlertn.title}g`
			}
		}
		titlertn.display = (titletxt as any)[titlertn.title][lang]

		return titlertn
	}

	const getMusicTitle = (mid: number, ptcode: number, lang: string) => {
		const rtn: TitleType = {
			type: 0,
			title: '',
			display: ''
		};

		rtn.type = (titlesp as any)[mid].type;

		if(rtn.type === 0 && (titlesp as any)[mid][ptcode] !== undefined) {
			rtn.title = (titlesp as any)[mid][ptcode].value;
			rtn.display = (titlesp as any)[mid][ptcode][lang];
		}
		else if(rtn.type === 1 && (titlesp as any)[mid] !== undefined) {
			rtn.title = (titlesp as any)[mid].value;
			rtn.display = (titlesp as any)[mid][lang];
		}
		else if(rtn.type === 2) {
			if((titlesp as any)[mid][ptcode] !== undefined) {
				rtn.title = (titlesp as any)[mid][ptcode].value;
				rtn.display = (titlesp as any)[mid][ptcode][lang];
			}
			else {
				rtn.title = (titlesp as any)[mid].value;
				rtn.display = (titlesp as any)[mid][lang];
			}
		}

		return rtn;
	}

	const checkFloorTitleExist = (towername: string) => {
		let exist = true;
		if(towername.startsWith("towerSp")) {
		exist = false;
		}

		return exist;
	}

	const checkMusicTitleExist = (mid: number, ptcode: number) => {
		let isExist = false;
		if((titlesp as any)[mid] !== undefined &&
			(titlesp as any)[mid] != null) {
		isExist = true;
		}

		return isExist;
	}

    return [name, isPassed, list]
}

export default useTowerStat