import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { dialogsActions } from '../redux/actions';
import socket from "core/socket"
import { Dialogs as BaseDialogs } from "components"

const Dialogs = ({ fetchDialogs, updateReadedStatus, currentDialogId, items, userId }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);


    const onChangeInput = (value) => {
        setInputValue(value);
    };

    useEffect(() => {
        fetchDialogs();

        socket.on('SERVER:MESSAGES_READED', updateReadedStatus);
        socket.on("SERVER:NEW_MESSAGE", fetchDialogs);
        socket.on("SERVER:DIALOG_CREATED", fetchDialogs);
        return () => {
            socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs);
            socket.removeListener("SERVER:NEW_MESSAGE", fetchDialogs);
        }
    }, []);

    useEffect(() => {
        const sortedItems = [...items].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        const filteredSortedItems = sortedItems.filter(
            dialog =>
                dialog.author.fullname.toLowerCase().includes(inputValue.toLowerCase()) ||
                dialog.partner.fullname.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredItems(filteredSortedItems);
    }, [inputValue, items]);

    return (
        <BaseDialogs
            userId={userId}
            items={filteredItems}
            inputValue={inputValue}
            currentDialogId={currentDialogId}
            onSearch={onChangeInput}
        />
    );
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
