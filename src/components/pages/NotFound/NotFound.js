import React from 'react';
import css from "../../../css/NotFound.module.css";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={css.body}>
            <div id={css.errorPage}>
                <div class={css.content}>
                    <h2 class={css.header} data-text="404">
                        404
                    </h2>
                    <h4 data-text="Opps! Page not found">
                        Opps! Page not found
                    </h4>
                    <p>
                        Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                    </p>
                    <div class={css.btns}>
                        <Link to='/'>Return home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;