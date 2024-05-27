import React, { useState, useRef, useEffect } from 'react';
import propTypes from "prop-types"
import classNames from 'classnames';
import { Time, IconReaded, Avatar } from 'components';
import { convertCurrentTime, isAudio } from "utils/helpers"
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons'
import { Popover, Button } from 'antd';
import { Emoji } from "emoji-mart"
import reactStringReplace from "react-string-replace"

import waveSvg from "assets/img/wave.svg"
import playSvg from "assets/img/play.svg"
import pauseSvg from "assets/img/pause.svg"

import "./Message.scss"

const MessageAudio = ({ item }) => {
    const [audioSrc, duration] = [item.url, item.duration]

    const audioElem = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    }

    useEffect(() => {
        audioElem.current.volume = "0.5"
        audioElem.current.addEventListener("playing", () => {
            setIsPlaying(true)
        }, false)
        audioElem.current.addEventListener("ended", () => {
            setIsPlaying(false)
            setProgress(0)
            setCurrentTime(0)
        }, false)
        audioElem.current.addEventListener("pause", () => {
            setIsPlaying(false)
        }, false)
        audioElem.current.addEventListener("timeupdate", () => {
            const duration = (audioElem.current && audioElem.current.duration) || 0
            setCurrentTime(audioElem.current.currentTime)
            setProgress((audioElem.current.currentTime / duration) * 110);
        })
    }, [])

    return <div className='message__audio'>
        <audio src={audioSrc} ref={audioElem} preload="auto"></audio>
        <div
            className="message__audio-progress"
            style={{ width: progress + "%" }}
        >
        </div>
        <div className="message__audio-info">
            <div className="message__audio-btn">
                <button onClick={togglePlay}>
                    {isPlaying
                        ? <img src={pauseSvg} alt="pauseSvg" />
                        : <img src={playSvg} alt="playSvg" />}
                </button>
            </div>
            <div className="message__audio-wave">
                <img src={waveSvg} alt="Wave svg" />
            </div>
            <span className="message__audio-duration">
                {currentTime === 0
                    ?
                    "00:" + (duration < 10
                        ?
                        "0" + Math.floor(duration)
                        :
                        Math.floor(duration)
                    )
                    :
                    convertCurrentTime(currentTime)}
            </span>
        </div>
    </div>
}

const Message = ({
    user,
    text,
    date,
    isMe,
    read,
    attachments,
    isTyping,
    onRemoveMessage,
    setPreviewImage
}) => {
    const renderAttachment = (item) => {
        if (item.ext !== "webm") {
            return (
                <div
                    key={item._id}
                    className='message__attachments-item'
                    onClick={() => { setPreviewImage(item.url) }}
                >
                    <div className='message__attachments-item-overlay'>
                        <EyeOutlined style={{ color: "white", fontSize: "18px" }} />
                    </div>
                    <img
                        src={item.url}
                        alt={item.filename}
                    />
                </div>
            )
        }
        else {
            return (
                <MessageAudio key={item._id} item={item}></MessageAudio>
            )
        }

    }

    return <div className={classNames('message', {
        'message--isme': isMe,
        "message--is-typing": isTyping,
        "message--is-audio": isAudio(attachments),
        "message--image":
            !isAudio(attachments) &&
            attachments &&
            attachments.length === 1 &&
            !text
    })}
    >
        <div className='message__content'>
            <IconReaded isMe={isMe} isReaded={read}></IconReaded>
            <Popover
                content={
                    <div>
                        <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
                    </div>
                }
                trigger="click"
            >
                <div className="message__icon-actions">
                    <Button type='text' size='small' icon={<EllipsisOutlined />}></Button>
                </div>
            </Popover>
            <div className='message__avatar'>
                <Avatar user={user}></Avatar>
            </div>
            <div className='message__info'>
                {(text || isTyping) && (
                    <div className="message__bubble">
                        {text && (
                            <p className="message__text">
                                {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                    <Emoji key={i} emoji={match} set="apple" size={16} />
                                ))}
                            </p>
                        )}
                        {isTyping && (
                            <div className="message__typing">
                                <span />
                                <span />
                                <span />
                            </div>
                        )}
                    </div>
                )}
                {attachments && attachments.length > 0 && (
                    <div className='message__attachments'>
                        {attachments.map(item => renderAttachment(item))}
                    </div>
                )}
                {date && <span className='message__date'>
                    <Time date={date}></Time>
                </span>}
            </div>
        </div>
    </div>
}


Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: propTypes.string,
    user: propTypes.string,
    text: propTypes.string,
    date: propTypes.object,
    attachments: propTypes.array,
    isTyping: propTypes.bool,
    isMe: propTypes.bool,
    isReaded: propTypes.bool,
    audio: propTypes.string
}

export default Message;