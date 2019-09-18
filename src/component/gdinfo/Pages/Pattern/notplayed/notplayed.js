import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import NpItem from './npItem';
import commonData from '../../Common/commonData';
import txtNp from './txtNotplayed';
import {getPatternImg600} from '../../Common/pattern';
import {GDVer} from '../../Common/version';
import LData from '../../Common/language';
import Pager from '../../Common/pager';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';

const lang = LData.lang;

class NotPlayed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            empty: false,
            gtype: "",
            allpage: 0
        }
    }
    
    componentDidMount() {
        this.loadNPData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.loadNPData(nextProps);
    }

    loadNPData(props) {
        const urlprop = props.match.params;
        const search = props.location.search;
        const params = new URLSearchParams(search);

        const lv = params.get("lv");
        const order = params.get("order");
        const ver = params.get("ver");
        const hot = params.get("hot");

        const nplist = [];

        let isEmpty = false;
        let ajaxurl = commonData.commonDataURL+"notplayed/"+
            urlprop.gtype+"/"+urlprop.userid+"/"+
            urlprop.vertype+"/"+urlprop.page;

        if(search !== null) {
            ajaxurl += search;
        }

        axios.post(ajaxurl)
        .then((res) => {
            const json = res.data;
            for(let i = 0; i < json.music.length; i++) {
                const obj = {};
                const cur = json.music[i];

                obj.imgsrc = commonData.commonImageURL+"music/"+cur.id+".jpg";
                obj.link = '/music/'+cur.id+'/'+urlprop.userid;
                obj.name = cur.name;
                obj.pattern = getPatternImg600(cur.ptcode);
                obj.lv = (cur.lv/100).toFixed(2);
                obj.ver = GDVer[cur.version-1].sv;

                nplist.push(obj);
            }

            if(json === null || json.length === 0) {
                isEmpty = true;
            }

            const baseurl = '/notplayed/'+urlprop.gtype+'/'+
                        urlprop.userid+'/'+urlprop.vertype+'/';
            let extvar = "";
            if(lv !== null) {
                if(extvar === "") extvar += "?lv="+lv;
                else extvar += "&lv="+lv;
            }
            if(order !== null) {
                if(extvar === "") extvar += "?order="+order;
                else extvar += "&order="+order;
            }
            if(ver !== null) {
                if(extvar === "") extvar += "?ver="+ver;
                else extvar += "&ver="+ver;
            }
            if(hot !== null) {
                if(extvar === "") extvar += "?hot="+hot;
                else extvar += "&hot="+hot;
            }

            let type = "";
            if(urlprop.gtype === "gf") type = "GuitarFreaks";
            else type = "DrumMania";

            this.setState({
                list: nplist,
                empty: isEmpty,
                gtype: type,
                allpage: json.pages
            });
        });
    }

    render() {
        const self = this;
        const urlprop = self.props.match.params;
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Patterns not played</h3>
                            </CardHeader>
                            <CardBody>
                                <span>{txtNp.desc[lang]}</span>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Option Table</h3>
                            </CardHeader>
                            <CardBody>
                                {/*<Filter />*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Select Type</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="btn-group">
                                        <Button tag={Link} to={"/notplayed/gf/"+urlprop.userid+"/0/1"}
                                                style={{width:"100%"}}>
                                            GF {txtNp.all[lang]}
                                        </Button>
                                        <Button tag={Link} to={"/notplayed/dm/"+urlprop.userid+"/0/1"}
                                                style={{width:"100%"}}>
                                            DM {txtNp.all[lang]}
                                        </Button>
                                    </Col>
                                    <Col xs="12" className="btn-group">
                                        <Button tag={Link} to={"/notplayed/gf/"+urlprop.userid+"/1/1"}
                                                style={{width:"100%"}}>
                                            GF {txtNp.ver[lang]}
                                        </Button>
                                        <Button tag={Link} to={"/notplayed/dm/"+urlprop.userid+"/1/1"}
                                                style={{width:"100%"}}>
                                            DM {txtNp.ver[lang]}
                                        </Button>
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
                                <h3>Non Play List</h3>
                                {/* GuitarFreaks or DrumMania */}
                                <span>{self.state.gtype}</span>
                            </CardHeader>
                            <CardBody>
                                <div className='div-table' id="playlist">
                                    <NpItem list={self.state.list} />
                                </div>
                                <div style={{width:"100%", textAlign:"center"}}>
                                    <h3 id="empty"></h3>
                                </div>
                                <Row className="text-center">
                                    <Pager cpage={urlprop.page}
                                            allpage={self.state.allpage}
                                            baseUrl={"/notplayed/"+
                                                urlprop.gtype+"/"+
                                                urlprop.userid+"/"+
                                                urlprop.vertype+"/"}
                                            afterUrl={""+self.props.location.search} />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NotPlayed;