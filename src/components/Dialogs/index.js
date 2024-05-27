import React from 'react';
import { DialogItem } from "components"
import { FrownOutlined } from '@ant-design/icons'
import { orderBy } from 'lodash';
import { Input, Empty } from "antd"

import "./Dialogs.scss"

const { Search } = Input;

const Dialogs = ({ items, userId, onSearch, inputValue, currentDialogId }) => {
    return <div className='dialogs'>
        <div className="dialogs__search">
            <Search
                placeholder="Поиск среди контактов"
                onChange={e => onSearch(e.target.value)}
                value={inputValue}
            />
        </div>
        {items.length ? (orderBy(items, ["created_at"], ["desc"]).map(item => (
            <DialogItem
                key={item._id}
                _id={item._id}
                userId={userId}
                user={item.author}
                partner={item.partner}
                lastMessage={item.lastMessage && item.lastMessage}
                read={item.lastMessage && item.lastMessage.read}
                isMeSend={item.lastMessage.user._id === userId}
                isMe={item.author._id === userId}
                currentDialogId={currentDialogId}
            >
            </DialogItem>
        ))) : (
            <Empty
                image={<FrownOutlined style={{ fontSize: "20px" }} />}
                description={"Никого нету"}
            />
        )}
    </div>
}


export default Dialogs;