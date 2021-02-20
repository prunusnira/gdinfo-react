import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import LData from '../Common/language';
import { CardText } from 'reactstrap';
import CommonData from '../Common/commonData';
import { StoreState } from '../../Redux/reducer';
import { LoginInfo } from '../../Redux/action';
import ProfileData from '../Profiles/profile/profileData';
import txtIndex from './txtIndex';

interface Props {
    login: boolean,
    userinfo: LoginInfo
}

interface State {
    data: ProfileData,
    loading: boolean
}

class UserLoginInfo extends Component<Props, State> {
    lang = LData.lang;

    state: State = {
        data: new ProfileData(),
        loading: false
    }

    componentDidMount() {
        const token = this.props.userinfo.token;
        if(token !== "") {
            axios.post(CommonData.dataUrl+"getuser/"+token)
            .then((res) => {
                this.setState({
                    data: JSON.parse(res.data.mydata),
                    loading: true
                });
            });
        }
    }

    render() {
        if(this.props.login) {
            if(this.state.loading) {
                const data = this.state.data;
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
                            <Link
                                style={{color: "white"}}
                                to={"/skill/2/"+data.id+"/gf/1/1"}>{data.gskill}</Link>
                        </span>&nbsp;&nbsp;&nbsp;
                        <span><b>DM</b>
                            <Link
                                style={{color: "white"}}
                                to={"/skill/2/"+data.id+"/dm/1/1"}>{data.dskill}</Link>
                        </span>
                    </CardText>
                )
            }
            else {
                return (
                    <span>
                        <Link to="/login">{(txtIndex.self.login as any)[this.lang]}</Link>
                        {(txtIndex.self.loginFirst as any)[this.lang]}
                    </span>
                )
            }
        }
        else {
            return (
                <span>
                    <Link to="/login">{(txtIndex.self.login as any)[this.lang]}</Link>
                    {(txtIndex.self.loginFirst as any)[this.lang]}
                </span>
            )
        }
    };
}

const mapStateToProps = (state: StoreState) => {
    return {
        userinfo: state.loginReducer.userinfo,
        login: state.loginReducer.login
    }
};

export default connect(mapStateToProps)(UserLoginInfo);