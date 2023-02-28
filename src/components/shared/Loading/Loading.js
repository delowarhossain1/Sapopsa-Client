import React from 'react';
import css from "../../../css/Loading.module.css";

const Loading = () => {
    return (
        <div className={css.loadingBody}>
            <div className={css.loading}>
                <span className={css.loader}></span>
                <span>Loading...</span>
            </div>
        </div>
    );
};

export default Loading;