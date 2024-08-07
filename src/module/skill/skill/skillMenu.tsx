import { atomDarkmode } from '@/jotai/darkmode';
import { Button, ThemedLink } from '@/styled/styledCommon';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { Col, Row } from 'reactstrap';

interface Props {
    ptype?: string;
    id?: string;
}

const SkillMenu = (props: Props) => {
    const dark = useAtomValue(atomDarkmode);

    if (props.ptype && parseInt(props.ptype, 10) !== 1000) {
        return (
            <>
                <Row>
                    <Col xs="12">Tri-Boost</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/3/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/4/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/3/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/4/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">Tri-Boost Re:Evolve</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/5/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/6/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/5/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/6/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">Matixx</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/7/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/8/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/7/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/8/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">EXCHAIN</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/9/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/10/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/9/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/10/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">NEXTAGE</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/11/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/12/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/11/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/12/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">HIGH-VOLTAGE</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/13/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/14/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/13/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/14/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">FUZZ-UP</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/15/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/16/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/15/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM 100</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/16/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">GALAXY WAVE</Col>
                    <Col xs="12" className="btn-group">
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/0/${props.id}/gf/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>GF All</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/2/${props.id}/gf/1/1`}
                        >
                            <Button style={{ width: '100%' }}>GF Skill</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/0/${props.id}/dm/1/skilldesc`}
                        >
                            <Button style={{ width: '100%' }}>DM All</Button>
                        </ThemedLink>
                        <ThemedLink
                            style={{ width: '100%' }}
                            $dark={dark}
                            to={`/skill/2/${props.id}/dm/1/1`}
                        >
                            <Button style={{ width: '100%' }}>DM Skill</Button>
                        </ThemedLink>
                    </Col>
                </Row>
            </>
        );
    }
    return (
        <>
            <Row>
                <Col xs={'12'}>Theorical Skill Value</Col>
                <Col xs={'12'} className={'btn-group'}>
                    <ThemedLink
                        $dark={dark}
                        to={'/exc/gf'}>
                        <Button>GF EXCELLENT</Button>
                    </ThemedLink>
                    <ThemedLink
                        $dark={dark}
                        to={'/exc/dm'}>
                        <Button>DM EXCELLENT</Button>
                    </ThemedLink>
                </Col>
            </Row>
        </>
    );
};

export default SkillMenu;
