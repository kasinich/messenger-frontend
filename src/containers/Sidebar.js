import React, { useState } from 'react';
import { connect } from "react-redux"
import { userApi, dialogsApi } from "utils/api"
import { Sidebar as SidebarBase } from 'components';

const Sidebar = ({ user }) => {
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [messageText, setMessageText] = useState("")
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState("")

    const onClose = () => {
        setVisible(false)
    }

    const onShow = () => {
        setVisible(true)
    }

    const onSearch = (value) => {
        setIsLoading(true)
        userApi.findUsers(value)
            .then(({ data }) => {
                setUsers(data)
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
            })
    }

    const onAddDialog = () => {
        dialogsApi
            .create({
                partnerId: selectedUserId,
                text: messageText
            })
            .then(()=>{
                setInputValue("")
                setMessageText("")
                setSelectedUserId("")
                onClose()
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err.response.data.message)
            })
    }

    const handleChangeInput = (value) => {
        setInputValue(value)
    }

    const onChangeTextArea = (e) => {
        setMessageText(e.target.value)
    }

    const onSelectUser = (userId) => {
        setSelectedUserId(userId)
    }

    return (
        <SidebarBase
            user={user}
            inputValue={inputValue}
            visible={visible}
            users={users}
            messageText={messageText}
            selectedUserId={selectedUserId}
            isLoading={isLoading}
            onShow={onShow}
            onClose={onClose}
            onSearch={onSearch}
            onChangeInput={handleChangeInput}
            onChangeTextArea={onChangeTextArea}
            onSelectUser={onSelectUser}
            onModalOk={onAddDialog}
        />
    )
}

export default connect(({ user }) => ({ user: user.data }))(Sidebar);