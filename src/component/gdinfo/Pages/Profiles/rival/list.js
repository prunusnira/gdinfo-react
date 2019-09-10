import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import txtRivalList from './txtRivalList';
import LData from '../../Common/language';
import RivalTable from './table';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

const lang = LData.lang;

class RivalList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            grival: [],
            drival: [],
            gempty: true,
            dempty: true
        }
    }

    componentDidMount() {
        axios.post("https://gitadora.info/d/rivallist/"+this.props.userinfo.id)
        .then((res) => {
            const json = res.data;

            const glist = [];
            const dlist = [];
            let gempty = true;
            let dempty = true;

            for(let i = 0; i < json.gf.length; i++) {
                glist.push(this.updateRival(json.gf[i], 'gf'));
            }

            for(let i = 0; i < json.dm.length; i++) {
                dlist.push(this.updateRival(json.dm[i], 'dm'));
            }


            if(json.gf.length > 0) {
                gempty = false;
            }
            if(json.dm.length > 0) {
                dempty = false;
            }

            this.setState({
                grival: glist,
                drival: dlist,
                gempty: gempty,
                dempty: dempty
            });
        });
    }

    updateRival(data, type) {
        const obj = {};
		obj.proflink = '/profile/'+data.id;
		obj.name = data.name;
		if(type === 'gf')
			obj.skill = data.gskill;
		else if(type === 'dm')
			obj.skill = data.dskill;
		obj.compbtn = '/comparison/'+data.id+'/'+type+'/1';
		obj.comptxt = txtRivalList.compare[lang];
		obj.remove = '/d/rivalrm/'+data.id+'/'+type;
		obj.removetxt = txtRivalList.remove[lang];

		return obj;
    }

    render() {
        if(this.props.login) {
            return (
                <Container>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <h3>Rival List</h3>
                                </CardHeader>
                                <CardBody id="rivalist">
                                    <Row>
                                        <Col sm="6" xs="12">
                                            <h3><b>GuitarFreaks Rivals</b></h3>
                                            <RivalTable
                                                empty={this.state.gempty}
                                                rival={this.state.grival} />
                                        </Col>
                                        
                                        <Col sm="6" xs="12">
                                            <h3><b>DrumMania Rivals</b></h3>
                                            <RivalTable
                                                empty={this.state.dempty}
                                                rival={this.state.drival} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
        else {
            return (<Redirect to="/error/500" />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

export default connect(mapStateToProps)(RivalList);