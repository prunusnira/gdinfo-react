import React, {Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import LData from '../../js/language';
import { CardText } from 'reactstrap'

const URL = "http://test.gitadora.info:8080/d/";//"https://gitadora.info/d/";

const lang = LData.lang;
const txtIndex = require('./txtindex').default;

class RecentSelfInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            userinfo: this.props.userinfo,
            data: [],
            loading: false
        }
    }

    async componentDidMount() {
        const token = this.state.userinfo.token;
        if(token != "") {
            await axios.post(URL+"getuser/"+token)
            .then((res) => {
                this.setState({
                    data: res.data,
                    loading: true
                });
            });
        }
        else {
            this.setState({
                login: false
            });
        }
    }

    render() {
        if(this.state.login) {
            if(this.state.loading) {
                const data = this.state.data.mydata;
                const imgurl = process.env.PUBLIC_URL+"/general-img/title/"+data.titletower+".png";
                return (
                    <CardText>
                        <span id='selftitle'>
                            ({data.title})
                        </span><br/>
                        <span id='towertitleself'>
                            {
                                (function() {
                                    if(data.titletower != "") {
                                        return (<img className='towertitle35' src={imgurl} />)
                                    }
                                })()
                            }
                        </span>
                        <span style={{fontSize:'125%'}} id='selfname'>
                            {data.name}
                        </span><br/>
                        <span><b>GF</b>
                            {data.gskill}
                        </span>&nbsp;&nbsp;&nbsp;
                        <span><b>DM</b>
                            {data.dskill}
                        </span>
                    </CardText>
                )
            }
            else {
                return (
                    <span dangerouslySetInnerHTML={ {__html: txtIndex.self.loginFirst[lang]} } />
                )
            }
        }
        else {
            return (
                <span dangerouslySetInnerHTML={ {__html: txtIndex.self.loginFirst[lang]} } />
            )
        }
    };
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.tokenReducer.userinfo,
        login: state.tokenReducer.login
    }
};

export default connect(mapStateToProps)(RecentSelfInfo);