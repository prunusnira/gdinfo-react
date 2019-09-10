import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TowerStatList from './towerstatItem';
import txtTower from '../txttower';
import LData from '../../Common/language';
import {GDPat} from '../../Common/pattern';
import * as action from '../../../Redux/actions/index';
import * as towerMethod from '../towertitle';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import commonData from '../../Common/commonData';

const lang = LData.lang;

class TowerStat extends Component {
    state = {
        list: [],
        ispassed: ""
    }

    loadTowerStatData(prop) {
        const urlprop = prop.match.params;
        const towerRecord = [];
        const towerlist = [];
        const towercomp = [];
        const clear = [];

        axios.post(commonData.commonDataURL+"towerdata/"+
                    urlprop.tower+"/"+prop.userinfo.id)
        .then((res) => {
            const json = res.data;
            const towheight = json.tower.levels;
            towerRecord[urlprop.tower] = [];
    
            const pat = new Array(towheight);
            // 들어가기 전에 일단 패턴 분류부터
            for(let i = 0; i < towheight; i++) {
                pat[i] = [];
            }
            
            for(let i = 0; i < json.towerlist.length; i++) {
                pat[json.towerlist[i].tower.floor].push(json.towerlist[i]);
            }
            
            for(let i = 0; i < towheight; i++) {
                towercomp[i] = true;
                clear[i] = 2;
            }

            // 층별 클리어 상태 확인
            this.clearOX(towheight, pat, towercomp);

            // 각 탑의 정보 추가 (메인)
            towerlist = this.updateTower(json.tower, json.towerlist, pat, towerRecord, urlprop.tower);
            
            // 탑의 클리어 상태 체크
            this.updateAllPassed(towercomp);

            this.setState({
                list: towerlist
            })
        });
    }

    updateTower(manage, tower, pat, towerRecord, towername) {
		const size = manage.levels;
		const list = [];

		for(let i = 0; i < size; i++) {
			const obj = {};
			obj.index = i;
			obj.topid = 't'+i;
			obj.btnid = 't'+i+'p';
			obj.divopen = 'divopen('+i+');'
			obj.opbtn = '▼';
			obj.skillfrom = (manage.skill + (size-i-1)*500);
			obj.floor = size-i;

			const recIdx = size-i-1;

			const clearstat = this.checkClear(pat[size-i-1]);
			if(clearstat['clear'] && clearstat['rate'] == 100) {
				obj.floorclear = '/img/tower/goldpassed.png';
			}
			else if(clearstat['clear']) {
				obj.floorclear = '/img/tower/passed.png';
			}
			else {
				obj.floorclear = '/img/tower/running.png';
			}
			
			if(clearstat['clear']) {
				if(towerMethod.checkFloorTitleExist(manage.name)) {
					var titles = towerMethod.getFloorTitle(manage.name, (manage.levels-i-1), clearstat['rate'], size);
					
					for(var j = 0; j < titles.length; j++) {
						towerRecord[towername].push(titles[j]);
					}

					obj.titlechangable = txtTower.detail.titlechangable[lang];
					obj.btnchangable = '<button class="btn btn-primary" onclick="floorTitlePopup(\''+manage.name+'\', '+(manage.levels-i-1)+', '+clearstat['rate']+', '+size+', $(\'#titlepopup\'))">'+txtTower.detail.btntitlechange[lang]+'</button>';
				}
			}
			else {
				obj.titlechangable = txtTower.detail.titleunchangable[lang];
				obj.btnchangable = '';
			}

			// id
			obj.floorid = 't'+i+'c';
			obj.clearnotice = txtTower.detail.require1[lang]+pat[size-i-1].length+txtTower.detail.require2[lang]+Math.ceil(pat[size-i-1].length*0.7)+txtTower.detail.require3[lang];
			
			obj.floorlist = [];

			for(let j = 0; j < pat[size-i-1].length; j++) {
				const cfl = pat[size-i-1][j];
				const flist = {};
				flist.jacket = '/img/music/'+cfl.tower.musicid+'.jpg';
				flist.name = cfl.tower.mname;
				flist.pattern = GDPat[cfl.tower.ptcode-1].pat;
				flist.lv = (cfl.tower.level/100).toFixed(2);

				if(cfl.score > 0) {
					let score = 0
					if(cfl.skill != null) {
						score = cfl.skill.score;
					}

					if(score < cfl.tower.score) {
						flist.score = '<font color="blue">'+score+"</font>";
					}
					else {
						flist.score = '<font color="red">'+score+"</font>";
					}
					flist.condScore = cfl.tower.score;
				}
				else {
					flist.score = 0;
					flist.condScore = 0;
				}

				if(cfl.tower.rate > 0) {
					let rate = 0
					if(cfl.skill != null) {
						rate = cfl.skill.rate;
					}

					if(rate < cfl.tower.rate) {
						flist.rate = '<font color="blue">'+(rate/100).toFixed(2)+"</font>";
					}
					else {
						flist.rate = '<font color="red">'+(rate/100).toFixed(2)+"</font>";
					}
					flist.condRate = (cfl.tower.rate/100).toFixed(2);
				}
				else {
					flist.rate = 0;
					flist.condRate = 0;
				}

				if(cfl.tower.combo > 0) {
					let combo = 0;
					if(cfl.skill != null) {
						combo = cfl.skill.combo;
					}

					if(combo < cfl.tower.combo) {
						flist.combo = '<font color="blue">'+combo+"</font>";
					}
					else {
						flist.combo = '<font color="red">'+combo+"</font>";
					}
					flist.condCombo = cfl.tower.combo;
					if(cfl.tower.fc == true) {
						flist.condCombo += "(FC)";
					}
				}
				else {
					flist.combo = 0;
					flist.condCombo = 0;
				}
				
				flist.description = cfl.tower.description;
				if(cfl.clear) {
					flist.clear = '/img/tower/passed.png';
					if(towerMethod.checkMusicTitleExist(cfl.tower.musicid, cfl.tower.ptcode)) {
						var title = towerMethod.getMusicTitle(cfl.tower.musicid, cfl.tower.ptcode);

						towerRecord[towername].push(title);

						flist.titlechange = '<button class="btn btn-primary" onclick="musicTitlePopup('+cfl.tower.musicid+', '+cfl.tower.ptcode+', $(\'#titlepopup\'))">'+txtTower.detail.btntitlechange[lang]+'</button>';
					}
				}
				else {
					flist.clear = '/img/tower/running.png';
					flist.titlechange = '';
				}
				obj.floorlist.push(flist);
			}
			list.push(obj);
		}
		return list;
	}
	
	checkClear(list) {
		let cleared = true;
		
		// 일반 곡들을 70%이상 클리어 했는가
		// 개수 세기
		let numc = 0;
		for(let i = 0; i < list.length; i++) {
			if(list[i].clear) numc++;
		}
		
		const rate = numc*100/list.length;
		if(rate < 70) cleared = false;
		
		const status = [];
		status['clear'] = cleared;
		status['rate'] = rate;
		
		return status;
	}
	
	updateAllPassed(towercomp) {
		var html = "";
		
		var passed = true;
		for(var i = 0; i < towercomp.length; i++) {
			if(!towercomp[i]) {
				passed = false;
				break;
			}
		}
		
		if(passed) {
			html += process.env.PUBLIC_URL+"/img/tower/towercleared.png";
		}
		else {
			html += process.env.PUBLIC_URL+"/img/tower/towerprogressing.png";
		}
		
		this.setState({
            ispassed: html
        });
	}
	
	clearOX(size, pat, towercomp) {
		for(var i = 0; i < size; i++) {
			// 개수세기
			var numc = 0;
			for(var j = 0; j < pat[i].length; j++) {
				if(pat[i][j].clear) numc++;
			}
			var rate = numc*100/pat[i].length;
			
			if(rate < 70) towercomp[i] = false;
			
			if(i-1 >= 0 && !towercomp[i-1]) towercomp[i] = false;
		}
	}
	
	divopen(i) {
		var div = $("#t"+i+"c");
		
		if(div.is(":visible")) {
			div.hide();
			$("#t"+i+"p").html("▼");
		}
		else {
			div.show();
			$("#t"+i+"p").html("▲");
		}
	}

    render() {
        const self = this;
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3 id="towername"></h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Row>
                                    <Col xs="12">
                                        <span id="towerdesc"></span><br/><br/>
                                        <span>{txtTower.detail.desc[lang]}</span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col sm="6">
                                        <h3>Clear Status</h3>
                                    </Col>
                                    <Col sm="6" className="text-center">
                                        <img alt="ispassed" style={{width:"100%"}}
                                            src={self.state.ispassed} />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* 진행 상태 표기 */}
                                <Row>
                                    <Col xs="12" id="towerlist">
                                        <TowerStatList list={self.state.list} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserinfo: () => {
            dispatch(action.setLogout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TowerStat);