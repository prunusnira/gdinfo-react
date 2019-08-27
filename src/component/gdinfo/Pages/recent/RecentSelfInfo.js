import React, {Component} from 'react'
import axios from 'axios';
import LData from '../../js/language';
import { CardText } from 'reactstrap'

const URL = "https://gitadora.info/d/";

const lang = LData.lang;
const txtIndex = require('./txtindex').default;

class RecentSelfInfo extends Component {
    state = {
        userinfo: [],
        isToken: false
    };

    componentDidMount() {
        axios.post(URL+"gettoken/")
        .then((res) => {
            const token = res.data;
            if(token != null) {
                axios.post(URL+"getuser/"+token)
                .then((res) => {
                    this.setState({
                        userinfo: res.data,
                        isToken: true
                    });
                });
            }
            else {
                this.setState({
                    isToken: false
                });
            }
        });
    }

    render() {
        if(this.state.isToken) {
            const data = this.state.userinfo;
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
                                    return (<img class='towertitle35' src={imgurl} />)
                                }
                            })()
                        }
                    </span>
                    <span style='font-size:125%' id='selfname'>
                        data.name
                    </span><br/>
                    <span><b>GF</b>
                        data.gskill
                    </span>&nbsp;&nbsp;&nbsp;
                    <span><b>DM</b>
                        data.dskill
                    </span>
                </CardText>
            )
        }
        else {
            return (
                <span dangerouslySetInnerHTML={ {__html: txtIndex.self.loginFirst[lang]} } />
            )
        }
    };
}

export default RecentSelfInfo;