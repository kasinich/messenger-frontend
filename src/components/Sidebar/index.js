import React from 'react';
import { TeamOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Modal, Select, Input, Form } from "antd"
import { Dialogs } from 'containers';

const { Option } = Select
const { TextArea } = Input;

const Sidebar = ({
    user,
    users,
    visible,
    inputValue,
    messageText,
    selectedUserId,
    isLoading,
    onShow,
    onClose,
    onSearch,
    onChangeInput,
    onChangeTextArea,
    onSelectUser,
    onModalOk
}) => {
    const options = users.map(user => (
        <Option key={user._id}>{user.fullname}</Option>
    ))

    return <div className="chat__sitebar">
        <div className="chat__sitebar-header">
            <div>
                <TeamOutlined />
                <span>Список диалогов</span>
            </div>
            <Button
                type='text'
                size='small'
                icon={<FormOutlined />}
                onClick={onShow}
            />
        </div>
        <div className="chat__sitebar-dialogs">
            <Dialogs userId={user && user._id}></Dialogs>
        </div>
        <Modal
            title="Создать диалог"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button
                    key="back"
                    onClick={onClose}
                >
                    Закрыть
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={!messageText}
                    loading={isLoading}
                    onClick={onModalOk}
                >
                    Создать
                </Button>
            ]}
        >
            <Form layout='vertical'>
                <Form.Item label="Введите имя пользователя или почту">
                    <Select
                        showSearch
                        value={inputValue}
                        placeholder="Введите имя пользователя или почту"
                        style={{ width: "100%" }}
                        onSearch={onSearch}
                        onChange={onChangeInput}
                        onSelect={onSelectUser}
                        notFoundContent={null}
                        defaultActiveFirstOption={false}
                        suffixIcon={null}
                        filterOption={false}
                    > {options}
                    </Select>
                </Form.Item>
                {selectedUserId && <Form.Item label="Введите сообщение">
                    <TextArea
                        placeholder="..."
                        autoSize={{ minRows: 3, maxRows: 10 }}
                        onChange={onChangeTextArea}
                        value={messageText}
                    />
                </Form.Item>}
            </Form>
        </Modal>
    </div>
};

Sidebar.defaultProps = {
    users: []
}

export default Sidebar;