import React, { useState, useEffect } from 'react';
import { ChatInput as ChatInputBase } from 'components';
import { connect } from "react-redux"
import { messagesActions, attachmentsActions } from "../redux/actions"
import { attachmentsApi } from "utils/api"
import socket from "core/socket"

const ChatInput = (props) => {
    const {
        dialogs: { currentDialogId },
        attachments,
        fetchSendMessage,
        removeAttachment,
        setAttachments,
        user
    } = props

    window.navigator.getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia

    const [value, setValue] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false)
    const [isLoading, setLoading] = useState(false);

    const toogleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible)
    }
    
    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setShowEmojiPicker(false)
        }
    }

    const addEmoji = ({ colons }) => {
        setValue((value + " " + colons).trim())
    }

    const sendAudio = (audioId) => {
        return fetchSendMessage({
            text: null,
            dialogId: currentDialogId,
            attachments: [audioId]
        });
    };

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop()
        }
        else {
            if ((value.trim() !== "" || attachments.length > 0) && currentDialogId) {
                fetchSendMessage({
                    text: value,
                    dialogId: currentDialogId,
                    attachments: attachments.map(file => file.uid)
                })
                setValue("")
                setAttachments([])
            } else if (attachments.length > 0 && !value.trim()) {
                fetchSendMessage({
                    text: "",
                    dialogId: currentDialogId,
                    attachments: attachments.map(file => file.uid)
                })
                setAttachments([])
            }
        }
    }

    const handleSendMessage = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
            setValue(value => value + "\n")
        }
        else if (e.key === "Enter") {
            sendMessage()
        }
    }

    const handleOnKeyDown = (e) => {
        socket.emit("DIALOGS:TYPING", { dialogId: currentDialogId, user });
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, onRecording, onError)
        }
    }

    const onRecording = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder)
        recorder.start()

        recorder.onstart = () => {
            setIsRecording(true)
        }

        recorder.onstop = () => {
            setIsRecording(false)
        }

        recorder.ondataavailable = (e) => {
            const file = new File([e.data], "audio.webm")
            setLoading(true);
            attachmentsApi.upload(file).then(({ data }) => {
                sendAudio(data.file._id).then(() => {
                    setLoading(false);
                })
            })
        }
    }

    const onError = err => {
        console.log("The following error occured: " + err)
    };

    const onHideRecording = () => {
        setIsRecording(false)
    }

    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: "uploading"
                }
            ];
            setAttachments(uploaded);

            await attachmentsApi.upload(file).then(({ data }) => {
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            status: "done",
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url
                        };
                    }
                    return item;
                });
            });
        }
        setAttachments(uploaded);
    };

    useEffect(() => {
        const el = document.querySelector(".chat-input__smile-btn")

        document.addEventListener("click", handleOutsideClick.bind(this, el))

        return () => {
            document.removeEventListener("click", handleOutsideClick.bind(this, el))
        }
    })

    if (!currentDialogId) {
        return null
    }

    return (
        <ChatInputBase
            value={value}
            emojiPickerVisible={emojiPickerVisible}
            handleSendMessage={handleSendMessage}
            handleOnKeyDown={handleOnKeyDown}
            toogleEmojiPicker={toogleEmojiPicker}
            addEmoji={addEmoji}
            setValue={setValue}
            sendMessage={sendMessage}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
            onHideRecording={onHideRecording}
            onRecord={onRecord}
            isRecording={isRecording}
            isLoading={isLoading}
            removeAttachment={removeAttachment}
        >
        </ChatInputBase>
    );
};

export default connect(({ dialogs, attachments, user }) => ({
    dialogs,
    attachments: attachments.items,
    user: user.data
}),
    { ...messagesActions, ...attachmentsActions }
)(ChatInput);