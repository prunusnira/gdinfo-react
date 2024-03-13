import React from "react";
import style from './loading.module.scss';

interface Props {
    full?: boolean;
}

const Loading = ({full}: Props) => (
    <section className={`${full ? style.loadingFullScreen : ''}`}>
        Loading...
    </section>
)

export default Loading;