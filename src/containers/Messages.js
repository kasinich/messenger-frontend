import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Empty } from "antd"
import find from 'lodash/find'

import { messagesActions } from '../redux/actions';
import socket from "core/socket"

import { Messages as BaseMessages } from "components"

const Messages = ({
    currentDialog,
    fetchMessages,
    addMessage,
    items,
    user,
    isLoading,
    removeMessageById,
    attachments
}) => {
    const messagesRef = useRef(null)

    const [previewImage, setPreviewImage] = useState(null)
    const [blockHeight, setBlockHeight] = useState(185);
    const [isTyping, setIsTyping] = useState(false);
    let typingTimeoutId = null;

    const onNewMessage = (data) => {
        addMessage(data)
    }

    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    useEffect(() => {
        socket.on("DIALOGS:TYPING", toggleIsTyping);
    }, []);

    useEffect(() => {
        if (attachments.length) {
            setBlockHeight(298);
        } else {
            setBlockHeight(185);
        }
    }, [attachments]);

    useEffect(() => {
        if (currentDialog) {
            fetchMessages(currentDialog._id)
        }
        socket.on("SERVER:NEW_MESSAGE", onNewMessage)
        return () => {
            socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage)
        }
    }, [currentDialog])

    useEffect(() => {
        if (currentDialog) {
            messagesRef.current.scrollTo(0, 999999)
        }
    }, [items])

    if (!currentDialog) {
        return <Empty description="Откройте диалог" />
    }

    return <BaseMessages
        user={user}
        blockRef={messagesRef}
        items={items}
        isLoading={isLoading && !user}
        onRemoveMessage={removeMessageById}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
        blockHeight={blockHeight}
        isTyping={isTyping}
        partner={
            user._id !== currentDialog.author._id
                ? currentDialog.author
                : currentDialog.partner
        }
    ></BaseMessages>
};

export default connect(
    ({ dialogs, messages, user, attachments }) => ({
        currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
        items: messages.items,
        isLoading: messages.isLoading,
        attachments: attachments.items,
        user: user.data
    }),
    messagesActions
)(Messages)