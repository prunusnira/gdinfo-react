import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/styled/styledCommon";
import { PagerWrapper } from "./pager.style";

interface Props {
    cpage: number;
    allpage: number;
    baseUrl: string;
    afterUrl: string;
}

const Pager = (props: Props) => {
    const createPager = (current: number, end: number, urla: string, urlb: string) => {
        var outer = document.createElement("span");
        outer.style.width = "100%";

        // 페이지가 7개 이하인 경우 모두 표시
        if (end === (0 || 1)) {
            return <Button>1</Button>;
        } else if (end < 8) {
            const list = [];
            for (let i = 0; i < end; i++) {
                list.push(i);
            }
            return (
                <>
                    {list.map((v, i) => {
                        return (
                            <Link to={`${urla}${v + 1}${urlb}`}>
                                <Button>{v + 1}</Button>
                            </Link>
                        );
                    })}
                </>
            );
        } else {
            // 페이지가 3 이하면 1~5까지 표시
            if (current < 4) {
                const list = [0, 1, 2, 3, 4];
                return (
                    <>
                        {list.map((v, i) => {
                            return (
                                <Link to={`${urla}${v + 1}${urlb}`}>
                                    <Button>{v + 1}</Button>
                                </Link>
                            );
                        })}

                        <span>......</span>
                        <Link to={`${urla}${end}${urlb}`}>
                            <Button>{end}</Button>
                        </Link>
                    </>
                );
            }

            // 페이지가 end-3 이내이면 end-5에서 end까지 표시
            else if (end - current < 4) {
                const list = [];
                for (let i = end - 5; i < end; i++) {
                    list.push(i);
                }
                return (
                    <>
                        <Link to={`${urla}1${urlb}`}>
                            <Button>1</Button>
                        </Link>
                        <span>......</span>
                        {list.map((v) => {
                            return (
                                <Link to={`${urla}${v + 1}${urlb}`}>
                                    <Button>{v + 1}</Button>
                                </Link>
                            );
                        })}
                    </>
                );
            }

            // 그 외에는 1과 end를 표시하고 current-2, current+2까지 표시
            else {
                const list = [];
                for (let i = current - 3; i < current + 2; i++) {
                    list.push(i);
                }
                return (
                    <>
                        <Link to={`${urla}1${urlb}`}>
                            <Button>1</Button>
                        </Link>
                        <span>...</span>
                        {list.map((v, i) => {
                            return (
                                <Link to={`${urla}${v + 1}${urlb}`}>
                                    <Button>{v + 1}</Button>
                                </Link>
                            );
                        })}
                        <span>...</span>
                        <Link to={`${urla}${end}${urlb}`}>
                            <Button>{end}</Button>
                        </Link>
                    </>
                );
            }
        }
    };

    return (
        <PagerWrapper>
            {(function () {
                return createPager(props.cpage, props.allpage, props.baseUrl, props.afterUrl);
            })()}
        </PagerWrapper>
    );
};

export default Pager;
