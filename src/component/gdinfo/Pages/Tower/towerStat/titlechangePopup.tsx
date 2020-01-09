import React, {Component} from 'react';
import {Button} from 'reactstrap';
import * as towerMethod from '../towertitle';

interface Props {
    id: string
}

class TitleChangePopup extends Component<Props> {
    render() {
        const self = this;
        
        return (
            <section className="crawler" id="titlepopup" style={{display:"none"}}>
                <h3 id="titleoftitlechange"></h3>
                <select className="form-control" id="titleselect">
                </select>
                {/* titleselect는 val */}
                <Button href="#no_div" onClick={() => towerMethod.setTitle(self.props.id, "titleselect", "titlepopup")}>OK</Button>
                <Button href="#no_div" onClick={() => towerMethod.popupRemove("titlepopup")}>CANCEL</Button>
            </section>
        )
    }
}

export default TitleChangePopup;