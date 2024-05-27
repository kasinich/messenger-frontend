import React from 'react';
import propTypes from "prop-types"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import ruLovale from "date-fns/locale/ru";

import "./Time.scss"

const Time = ({ date }) => {
    return (
        <div className="time-container">
            {formatDistanceToNow(date, { addSuffix: true, locale: ruLovale })}
        </div>
    )
}

Time.propTypes = {
    date: propTypes.string
}

export default Time;