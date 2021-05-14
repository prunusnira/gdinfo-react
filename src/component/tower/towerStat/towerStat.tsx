import React, {useEffect, useState} from 'react'
import axios from 'axios'
import txtTower from '../txttower'
import {GDPat} from '../../common/pattern'
import * as towerMethod from '../towertitle'
import CommonData from '../../common/commonData'
import { TowerStatData, TitleChange, FloorItemData, FloorClearData, TowerManage, TowerData } from './towerStatData'
import { Redirect, useParams } from 'react-router-dom'
import store from '../../../mobx/store'
import { observer } from 'mobx-react'
import TowerStatPresenter from './towerStatPresenter'

interface MatchProps {
	tower: string
}

const TowerStat = observer(() => {
	const [list, setList] = useState(Array<TowerStatData>())
	const [isPassed, setPassed] = useState('')
	const [name, setName] = useState('')

	const {loginUser, loginStatus, language} = store
	const {tower} = useParams<MatchProps>()
	const lang = language.lang
	
	useEffect(() => {
		if(loginUser.user.id !== undefined && loginUser.user.id !== '')
			loadTowerStatData()
	}, [])

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

    const updateTower = (manage: TowerManage, pat: Array<Array<TowerData>>, towerRecord: Array<string>, towername: string) => {
		const size = manage.levels
		const list = new Array<TowerStatData>()

		for(let i = 0; i < size; i++) {
			const obj = new TowerStatData()
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
				if(towerMethod.checkFloorTitleExist(manage.name)) {
					var titles = towerMethod.getFloorTitle(manage.name, (manage.levels-i-1), clearstat['rate'], size)
					
					for(var j = 0; j < titles.length; j++) {
						towerRecord.push(titles[j])
					}

					obj.titlechangable = (txtTower.detail.titlechangable as any)[lang]
					obj.titlechange = new TitleChange()
					obj.titlechange.tower = manage.name
					obj.titlechange.floor = manage.levels-i-1
					obj.titlechange.rate = clearstat['rate']
					obj.titlechange.allfloors = size
					obj.btnchangable = true
				}
			}
			else {
				obj.titlechangable = (txtTower.detail.titleunchangable as any)[lang]
				obj.btnchangable = false
			}

			// id
			obj.floorid = 't'+i+'c';
			obj.clearnotice =
				(txtTower.detail.require1 as any)[lang]+
				pat[size-i-1].length+
				(txtTower.detail.require2 as any)[lang]+
				Math.ceil(pat[size-i-1].length*0.7)+
				(txtTower.detail.require3 as any)[lang]
			
			obj.floorlist = new Array<FloorItemData>()

			for(let j = 0; j < pat[size-i-1].length; j++) {
				const cfl = pat[size-i-1][j]
				const flist = new FloorItemData()
				flist.jacket = `${CommonData.jacketUrl}${cfl.tower.musicid}.jpg`
				flist.name = cfl.tower.mname
				flist.pattern = GDPat[cfl.tower.ptcode-1].pat
				flist.lv = (cfl.tower.level/100).toFixed(2)

				flist.condScore = cfl.tower.score
				flist.condRate = cfl.tower.rate/100
				flist.condCombo = cfl.tower.combo
				if(cfl.tower.fc === true) {
					flist.fc += "(FC)"
				}

				if(cfl.skill != null) {
					flist.score = cfl.skill.score
					flist.rate = cfl.skill.rate/100
					flist.combo = cfl.skill.combo
				}
				else {
					flist.score = 0
					flist.rate = 0
					flist.combo = 0
				}
				
				flist.description = cfl.tower.description
				if(cfl.clear) {
					flist.clear = `${process.env.PUBLIC_URL}/general-img/tower/passed.png`
					if(towerMethod.checkMusicTitleExist(cfl.tower.musicid, cfl.tower.ptcode)) {
						const title = towerMethod.getMusicTitle(cfl.tower.musicid, cfl.tower.ptcode).title

						towerRecord.push(title)

						flist.titlechange = '<button class="btn btn-primary" onclick="musicTitlePopup('
											+cfl.tower.musicid+', '
											+cfl.tower.ptcode
											+', "titlepopup"))">'
											+(txtTower.detail.btntitlechange as any)[lang]+'</button>';
					}
				}
				else {
					flist.clear = `${process.env.PUBLIC_URL}/general-img/tower/running.png`
					flist.titlechange = ''
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
		
		const status = new FloorClearData()
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

    if(!loginStatus.isSigned) {
		return <Redirect to={"/error/500"} />
	}
	return (
		<TowerStatPresenter
			name={name}
			isPassed={isPassed}
			id={loginUser.user.id}
			list={list}
			lang={lang} />
	)
})

export default TowerStat