import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import LData from '../Common/language';
import { CardText } from 'reactstrap';
import commonData from '../Common/commonData';

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
        if(token !== "") {
            await axios.post(commonData.commonDataURL+"getuser/"+token)
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
                                    if(data.titletower !== "") {
                                        return (<img alt="titletower" className='towertitle35' src={imgurl} />)
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
                    <span>
                        <Link to="/login">{txtIndex.self.login[lang]}</Link>{txtIndex.self.loginFirst[lang]}
                    </span>
                )
            }
        }
        else {
            return (
                <span>
                    <Link to="/login">{txtIndex.self.login[lang]}</Link>{txtIndex.self.loginFirst[lang]}
                </span>
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