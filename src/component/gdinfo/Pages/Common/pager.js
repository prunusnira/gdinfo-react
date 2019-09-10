import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {
    Button
} from 'reactstrap';

class Pager extends Component {
    createPager(current, end, urla, urlb) {
        var outer = document.createElement("span");
        outer.style.width = "100%";
        
        // 페이지가 7개 이하인 경우 모두 표시
        if(end < 8) {
            return (
                <Fragment>
                    {
                        (function() {
                            const list = [];
                            for(let i = 0; i < parseInt(end); i++) {
                                list.push(i);
                            }

                            list.map((v, i) => {
                                if(v !== current-1) {
                                    return (
                                        <Button tag={Link} to={urla+(v+1)+urlb}>
                                            {v+1}
                                        </Button>
                                    )
                                }
                                else {
                                    return (
                                        <Button className="btn-warning">
                                            {v+1}
                                        </Button>
                                    )
                                }
                            });
                        })()
                    }
                </Fragment>
            )
        }
        else {
            // 페이지가 3 이하면 1~5까지 표시
            if(current < 4) {
                return (
                    <Fragment>
                        {
                            (function() {
                                const list = [0, 1, 2, 3, 4];
                                list.map((v, i) => {
                                    if(v !== current-1) {
                                        return (
                                            <Button tag={Link} to={urla+(v+1)+urlb}>
                                                {v+1}
                                            </Button>
                                        )
                                    }
                                    else {
                                        return (
                                            <Button className="btn-warning">
                                                {v+1}
                                            </Button>
                                        )
                                    }
                                });
                            })()
                        }
    
                        <span>......</span>
                        <Button tag={Link} to={urla+end+urlb}>
                            {end}
                        </Button>
                    </Fragment>
                )
            }
    
            // 페이지가 end-3 이내이면 end-5에서 end까지 표시
            else if(end-current < 4) {
                return (
                    <Fragment>
                        <Button tag={Link} to={urla+1+urlb}>
                            1
                        </Button>
                        <span>......</span>
                        {
                            (function() {
                                const list = [];
                                for(let i = parseInt(end)-5; i < end; i++) {
                                    list.push(i);
                                }
                                list.map((v, i) => {
                                    if(v !== current-1) {
                                        return (
                                            <Button tag={Link} to={urla+(v+1)+urlb}>
                                                {v+1}
                                            </Button>
                                        )
                                    }
                                    else {
                                        return (
                                            <Button className="btn-warning">
                                                {v+1}
                                            </Button>
                                        )
                                    }
                                });
                            })()
                        }
                    </Fragment>
                )
            }
    
            // 그 외에는 1과 end를 표시하고 current-2, current+2까지 표시
            else {
                return (
                    <Fragment>
                        <Button tag={Link} to={urla+1+urlb}>
                            1
                        </Button>
                        <span>...</span>
                        {
                            (function() {
                                const list = [];
                                for(let i = parseInt(current)-3; i < parseInt(current)+2; i++) {
                                    list.push(i);
                                }
                                list.map((v, i) => {
                                    if(v !== parseInt(current)-1) {
                                        return (
                                            <Button tag={Link} to={urla+(v+1)+urlb}>
                                                {v+1}
                                            </Button>
                                        )
                                    }
                                    else {
                                        return (
                                            <Button className="btn-warning">
                                                {v+1}
                                            </Button>
                                        )
                                    }
                                });
                            })()
                        }
                        <span>...</span>
                        <Button tag={Link} to={urla+end+urlb}>
                            {end}
                        </Button>
                    </Fragment>
                )
            }
        }
    
        // 맨 뒤에 입력-GO가 가능한 input 추가
        /*var inp = document.createElement("input");
        inp.type = "number";
        inp.id = "pageinp";
        outer.appendChild(inp);
    
        var gobtn = document.createElement("button");
        gobtn.className = "btn btn-secondary";
        gobtn.href="#no_div";
        gobtn.setAttribute("onclick", "window.location.href='"+urla + $("#pageinp").val() + urlb+"';");
        gobtn.textContent = "GO";
        outer.appendChild(gobtn);*/
    }

    render() {
        const cpage = this.props.cpage;
        const allpage = this.props.allpage;
        const baseUrl = this.props.baseUrl;
        const afterUrl = this.props.afterUrl;
        const self = this;
        return (
            <Fragment>
                {
                    (function() {
                        return self.createPager(cpage, allpage, baseUrl, afterUrl)
                    })()
                }
            </Fragment>
        )
    }
}

export default Pager;