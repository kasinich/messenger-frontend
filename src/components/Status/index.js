import React from 'react';
import propTypes from "prop-types"
import classNames from 'classnames';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import "./Status.scss"

const Status = ({ online, fullname }) => {
    return <div className="chat__dialog-header">
        <Link to="/" className="chat__dialog-right">Назад</Link>
        <div className="chat__dialog-header-center">
            <b className="chat__dialog-header-username">{fullname}</b>
            <div className="chat__dialog-header-status">
                <span
                    className={classNames("status", { "status--online": online })}>
                    {online ? "Онлайн" : "Офлайн"}
                </span>
            </div>
        </div>
        <div className="chat__dialog-right"></div>
    </div>
}

Status.propTypes = {
    online: propTypes.bool,
}

export default Status;