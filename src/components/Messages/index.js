import React from 'react';
import propTypes from "prop-types"
import classNames from 'classnames';
import { Message } from "components"
import { Empty, Spin, Modal } from "antd"

import "./Messages.scss"

const Messages = ({
    onRemoveMessage,
    blockRef,
    items,
    user,
    isLoading,
    setPreviewImage,
    previewImage,
    blockHeight,
    isTyping,
    partner
}) => {
    return (
        <div
            className="chat__dialog-messages"
            style={{ height: `calc(100% - ${blockHeight}px)` }
            }>
            <div ref={blockRef} className={classNames("messages", { "messages--loading": isLoading })}>
                {isLoading && !user ? (
                    <Spin size='large'></Spin>
                ) : items && !isLoading ? (
                    items.length > 0 ? (
                        items.map(item => (
                            <Message
                                key={item._id}
                                {...item}
                                isMe={user._id === item.user._id}
                                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                                setPreviewImage={setPreviewImage}
                                date={item.createdAt}
                            ></Message>
                        ))
                    ) : (
                        <Empty description="Диалог пустой" />
                    )
                ) : (
                    <Empty description="Откройте диалог" />
                )}
                {isTyping && <Message isTyping={true} user={partner} />}
                <Modal
                    open={!!previewImage}
                    footer={null}
                    onCancel={() => { setPreviewImage(null) }}
                >
                    <img src={previewImage} alt="Preview" />
                </Modal>
            </div>
        </div>
    )
}

Messages.propTypes = {
    items: propTypes.array
}

export default Messages;