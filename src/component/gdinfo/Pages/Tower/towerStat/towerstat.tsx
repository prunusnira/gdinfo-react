import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TowerStatList from './towerstatItem';
import txtTower from '../txttower';
import LData from '../../Common/language';
import {GDPat} from '../../Common/pattern';
import {LoginInfo} from '../../../Redux/action';
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
import { StoreState } from '../../../Redux/reducer';
import { TowerStatData, TitleChange, FloorItemData, FloorClearData, TowerManage, TowerData } from './towerStatData';
import { RouteComponentProps } from 'react-router-dom';

interface IMatchProps {
	tower: string
}

interface Props {
	userinfo: LoginInfo,
	login: boolean
}

interface State {
	list: Array<TowerStatData>,
	ispassed: string,
	name: string
}

class TowerStat extends Component<RouteComponentProps<IMatchProps> & Props, State> {
	lang = LData.lang;

    state: State = {
        list: [],
		ispassed: "",
		name: ""
	}
	
	componentDidMount() {
		this.loadTowerStatData(this.props);
	}

    loadTowerStatData(prop: RouteComponentProps<IMatchProps> & Props) {
        const urlprop = prop.match.params;
        const towerRecord = new Array<string>();
        let towerlist = [];
        const towercomp = new Array<boolean>();
        const clear = [];

        axios.post(commonData.commonDataURL+"towerdata/"+
                    urlprop.tower+"/"+prop.userinfo.id)
        .then((res) => {
            const json = res.data;
            const towheight = json.tower.levels;
    
            const pat = new Array<Array<TowerData>>(towheight);
            // 들어가기 전에 일단 패턴 분류부터
            for(let i = 0; i < towheight; i++) {
                pat[i] = new Array<TowerData>();
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
            towerlist = this.updateTower(json.tower, pat, towerRecord, urlprop.tower);
            
            // 탑의 클리어 상태 체크
            this.updateAllPassed(towercomp);

            this.setState({
				name: json.tower.name,
                list: towerlist
            })
        });
    }

    updateTower(manage: TowerManage, pat: Array<Array<TowerData>>, towerRecord: Array<string>, towername: string) {
		const size = manage.levels;
		const list = new Array<TowerStatData>();

		for(let i = 0; i < size; i++) {
			const obj = new TowerStatData();
			obj.index = i;
			obj.topid = 't'+i;
			obj.btnid = 't'+i+'p';
			obj.opbtn = '▼';
			obj.skillfrom = (manage.skill + (size-i-1)*500);
			obj.floor = size-i;

			const recIdx = size-i-1;

			const clearstat = this.checkClear(pat[size-i-1]);
			if(clearstat['clear'] && clearstat['rate'] == 100) {
				obj.floorclear = process.env.PUBLIC_URL+"/general-img/tower/goldpassed.png";
			}
			else if(clearstat['clear']) {
				obj.floorclear = process.env.PUBLIC_URL+"/general-img/tower/passed.png";
			}
			else {
				obj.floorclear = process.env.PUBLIC_URL+"/general-img/tower/running.png";
			}
			
			if(clearstat['clear']) {
				if(towerMethod.checkFloorTitleExist(manage.name)) {
					var titles = towerMethod.getFloorTitle(manage.name, (manage.levels-i-1), clearstat['rate'], size);
					
					for(var j = 0; j < titles.length; j++) {
						towerRecord.push(titles[j]);
					}

					obj.titlechangable = (txtTower.detail.titlechangable as any)[this.lang];
					obj.titlechange = new TitleChange();
					obj.titlechange.tower = manage.name;
					obj.titlechange.floor = manage.levels-i-1;
					obj.titlechange.rate = clearstat['rate'];
					obj.titlechange.allfloors = size;
					obj.btnchangable = true;
				}
			}
			else {
				obj.titlechangable = (txtTower.detail.titleunchangable as any)[this.lang];
				obj.btnchangable = false;
			}

			// id
			obj.floorid = 't'+i+'c';
			obj.clearnotice = (txtTower.detail.require1 as any)[this.lang]+pat[size-i-1].length+(txtTower.detail.require2 as any)[this.lang]+Math.ceil(pat[size-i-1].length*0.7)+(txtTower.detail.require3 as any)[this.lang];
			
			obj.floorlist = new Array<FloorItemData>();

			for(let j = 0; j < pat[size-i-1].length; j++) {
				const cfl = pat[size-i-1][j];
				const flist = new FloorItemData();
				flist.jacket = commonData.commonImageURL+"music/"+cfl.tower.musicid+".jpg";
				flist.name = cfl.tower.mname;
				flist.pattern = GDPat[cfl.tower.ptcode-1].pat;
				flist.lv = (cfl.tower.level/100).toFixed(2);

				flist.condScore = cfl.tower.score;
				flist.condRate = cfl.tower.rate/100;
				flist.condCombo = cfl.tower.combo;
				if(cfl.tower.fc == true) {
					flist.fc += "(FC)";
				}

				if(cfl.skill != null) {
					flist.score = cfl.skill.score;
					flist.rate = cfl.skill.rate/100;
					flist.combo = cfl.skill.combo;
				}
				else {
					flist.score = 0;
					flist.rate = 0;
					flist.combo = 0;
				}
				
				flist.description = cfl.tower.description;
				if(cfl.clear) {
					flist.clear = process.env.PUBLIC_URL+"/general-img/tower/passed.png";
					if(towerMethod.checkMusicTitleExist(cfl.tower.musicid, cfl.tower.ptcode)) {
						const title = towerMethod.getMusicTitle(cfl.tower.musicid, cfl.tower.ptcode).title;

						towerRecord.push(title);

						flist.titlechange = '<button class="btn btn-primary" onclick="musicTitlePopup('
											+cfl.tower.musicid+', '
											+cfl.tower.ptcode
											+', "titlepopup"))">'
											+(txtTower.detail.btntitlechange as any)[this.lang]+'</button>';
					}
				}
				else {
					flist.clear = process.env.PUBLIC_URL+"/general-img/tower/running.png";
					flist.titlechange = '';
				}
				obj.floorlist.push(flist);
			}
			list.push(obj);
		}
		return list;
	}
	
	checkClear(list: Array<TowerData>) {
		let cleared = true;
		
		// 일반 곡들을 70%이상 클리어 했는가
		// 개수 세기
		let numc = 0;
		for(let i = 0; i < list.length; i++) {
			if(list[i].clear) numc++;
		}
		
		const rate = numc*100/list.length;
		if(rate < 70) cleared = false;
		
		const status = new FloorClearData();
		status.clear = cleared;
		status.rate = rate;
		
		return status;
	}
	
	updateAllPassed(towercomp: Array<boolean>) {
		var html = "";
		
		var passed = true;
		for(var i = 0; i < towercomp.length; i++) {
			if(!towercomp[i]) {
				passed = false;
				break;
			}
		}
		
		if(passed) {
			html += process.env.PUBLIC_URL+"/general-img/tower/towercleared.png";
		}
		else {
			html += process.env.PUBLIC_URL+"/general-img/tower/towerprogressing.png";
		}
		
		this.setState({
            ispassed: html
        });
	}
	
	clearOX(size: number, pat: Array<Array<TowerData>>, towercomp: Array<boolean>) {
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

    render() {
        const self = this;
        return (
            <Container fluid={true}>
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
                                        <span>{(txtTower.detail.desc as any)[this.lang]}</span>
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
                                        <TowerStatList id={self.props.userinfo.id} list={self.state.list} />
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

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(TowerStat);