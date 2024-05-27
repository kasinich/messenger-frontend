import React, { Fragment } from 'react';
import {
    SmileOutlined,
    PictureOutlined,
    AudioOutlined,
    SendOutlined,
    CloseOutlined,
    LoadingOutlined
} from '@ant-design/icons'
import { Input, Button } from "antd"
import { UploadField } from '@navjobs/upload'
import { Picker } from 'emoji-mart'
import { UploadFiles } from "components"

import "./ChatInput.scss";

const { TextArea } = Input

const ChatInput = (props) => {

    const {
        onSelectFiles,
        onHideRecording,
        onRecord,
        sendMessage,
        handleSendMessage,
        handleOnKeyDown,
        removeAttachment,
        emojiPickerVisible,
        toogleEmojiPicker,
        addEmoji,
        value,
        setValue,
        attachments,
        isRecording,
        isLoading
    } = props
    return <Fragment>
        <div className="chat__dialog-input">
            <div className="chat-input">
                <div>
                    <div className="chat-input__smile-btn">
                        <div className="chat-input__emoji-picker">
                            {emojiPickerVisible && (
                                <Picker
                                    set='apple'
                                    emojiSize={26}
                                    style={{
                                        width: "375px"
                                    }}
                                    onSelect={(emojiTag) => addEmoji(emojiTag)}
                                ></Picker>
                            )}
                        </div>
                        {!isRecording ? (
                            <Button
                                type='text'
                                icon={<SmileOutlined />}
                                onClick={toogleEmojiPicker}
                            />
                        ) : (
                            <Button
                                type='text'
                                icon={<CloseOutlined />}
                                onClick={onHideRecording}
                            />
                        )
                        }
                    </div>
                    {isRecording ? (
                        <div className='chat-input__record-status'>
                            <i className='chat-input__record-status-bubble'></i>
                            Recording...
                        </div>
                    ) : (
                        <TextArea
                            size='large'
                            placeholder="Введите текст сообщения…"
                            value={value}
                            autoSize={{ minRows: 1, maxRows: 3 }}
                            onChange={e => setValue(e.target.value)}
                            onKeyUp={handleSendMessage}
                            onKeyDown={handleOnKeyDown}
                        />
                    )}

                    <div className="chat-input__actions">
                        <UploadField
                            onFiles={onSelectFiles}
                            containerProps={{
                                className: 'chat-input__actions-upload-btn'
                            }}
                            uploadProps={{
                                accept: '.jpg,.jpeg,.png,.gif,.bmp',
                                multiple: "multiple"
                            }}
                        >
                            {!isRecording && <Button type='text' icon={<PictureOutlined />} ></Button>}
                        </UploadField>
                        {isRecording || value.trim() !== "" || attachments.length ? (
                            <Button
                                type='text'
                                icon={<SendOutlined />}
                                onClick={sendMessage}
                            />
                        ) : !isLoading ? (
                            <div className='chat-input__record-btn'>
                                <Button
                                    type='text'
                                    icon={<AudioOutlined />}
                                    onClick={onRecord}
                                />
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    width: "32px",
                                    height: "32px"
                                }}
                            >
                                <LoadingOutlined />
                            </div>
                        )}
                    </div>
                </div>
                {attachments.length > 0 && <div className="chat-input__attachments">
                    <UploadFiles
                        removeAttachment={removeAttachment}
                        attachments={attachments}
                    />
                </div>}
            </div >
        </div>
    </Fragment>
}


export default ChatInput; 