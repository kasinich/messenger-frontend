import React from 'react';
import classNames from 'classnames';
import { IconReaded, Avatar } from "components"
import isToday from "date-fns/isToday"
import format from "date-fns/format"
import { Link } from "react-router-dom"
import reactStringReplace from "react-string-replace"
import { Emoji } from "emoji-mart"

const getMessageTime = (created_at) => {
    if (isToday(created_at)) {
        return format(created_at, 'HH:mm')
    } else {
        return format(created_at, 'dd.MM.yy')
    }
}

const renderLastMessage = (message, userId) => {
    let text = "";
    if (!message.text && message.attachments.length) {
        text = "прикрепленный файл";
    } else {
        text = message.text;
    }
    let inputText = reactStringReplace(text, /:(.+?):/g, (match, i) => (
        <Emoji key={i} emoji={match} set='apple' size={16} />
    ));
    return (
        <>
            {message.user._id === userId ? "Вы: " : ""}
            {inputText}
        </>
    );
};

const DialogItem = ({
    _id,
    user,
    partner,
    lastMessage,
    currentDialogId,
    read,
    isMeSend,
    isMe,
    userId,
}) => {
    return <Link to={`/dialog/${_id}`}>
        <div
            className={classNames('dialogs__item', {
                "dialogs__item--online": partner.isOnline,
                "dialogs__item--selected": currentDialogId === _id
            })}
        >
            <div className="dialogs__item-avatar">
                <Avatar user={!isMe ? user : partner} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>
                        {!isMe ? 
                        user.fullname  : 
                        (user.fullname === partner.fullname ? "Заметки" : partner.fullname)}
                        </b>
                    <span>
                        {lastMessage && getMessageTime(lastMessage.createdAt)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>
                        {lastMessage && renderLastMessage(lastMessage, userId)}
                    </p>
                    {isMeSend && <IconReaded isMe={isMeSend} isReaded={read}></IconReaded>}
                    {lastMessage && lastMessage.unreaded > 0 &&
                        <div className="dialogs__item-info-bottom-count">
                            {lastMessage.unreaded > 99 ? "+99" : lastMessage.unreaded}
                        </div>}
                </div>
            </div>
        </div>
    </Link>
}


export default DialogItem;