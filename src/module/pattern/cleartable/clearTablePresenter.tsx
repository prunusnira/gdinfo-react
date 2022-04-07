import { Link } from "react-router-dom";
import ClearTableRow from "./clearTableRow";
import React from "react";
import ClearTableData from "./clearTableData";
import CommonLayout from "@/component/layout/commonLayout";
import ContentLayout from "@/component/content/standardContent";
import { ClearTableWrapper, TableHeader } from "./clearTablePresenter.style";

interface Props {
    profileLink: string;
    titleTower: string;
    userName: string;
    glist: Array<ClearTableData>;
    dlist: Array<ClearTableData>;
}

const ClearTablePresenter = (props: Props) => {
    return (
        <CommonLayout>
            <ContentLayout title={"Clear Status Table"}>
                <Link to={props.profileLink} className="innerhref" style={{ fontSize: "130%" }}>
                    {(function () {
                        if (props.titleTower !== "") {
                            return (
                                <img
                                    alt="titletower"
                                    src={`${process.env.PUBLIC_URL}/general-img/title/${props.titleTower}.png`}
                                />
                            );
                        }
                    })()}
                    {props.userName}
                </Link>

                <ContentLayout title={"GuitarFreaks"}>
                    <ClearTableWrapper>
                        <TableHeader>#</TableHeader>
                        <TableHeader>EXC</TableHeader>
                        <TableHeader>SS</TableHeader>
                        <TableHeader>S</TableHeader>
                        <TableHeader>A</TableHeader>
                        <TableHeader>B</TableHeader>
                        <TableHeader>C</TableHeader>
                        <TableHeader>F</TableHeader>
                        <TableHeader>No</TableHeader>
                        <TableHeader>Total</TableHeader>
                        <ClearTableRow list={props.glist} />
                    </ClearTableWrapper>
                </ContentLayout>

                <ContentLayout title={"DrumMania"}>
                    <ClearTableWrapper>
                        <TableHeader>#</TableHeader>
                        <TableHeader>EXC</TableHeader>
                        <TableHeader>SS</TableHeader>
                        <TableHeader>S</TableHeader>
                        <TableHeader>A</TableHeader>
                        <TableHeader>B</TableHeader>
                        <TableHeader>C</TableHeader>
                        <TableHeader>F</TableHeader>
                        <TableHeader>No</TableHeader>
                        <TableHeader>Total</TableHeader>
                        <ClearTableRow list={props.dlist} />
                    </ClearTableWrapper>
                </ContentLayout>
            </ContentLayout>
        </CommonLayout>
    );
};

export default ClearTablePresenter;