import React, { useEffect, useState } from 'react';
import { Result } from 'antd';

import { userApi } from "utils/api"
import { Block, Button } from 'components';

const renderTextInfo = (hash, verified) => {

    if (hash) {
        if (verified) {
            return {
                status: "success",
                message: "Аккаунт успешно подтвержден!"
            }
        } else {
            return {
                status: "error",
                message: "Ошибка при подтверждении аккаунта!"
            }
        }
    } else {
        return {
            status: "success",
            message: `
            Ссылка с подтверждение аккаунта отправлена на E-mail.
            Закройте эту вкладку.
            `
        }
    }
}

const CheckEmailInfo = ({ location, history }) => {
    console.log(location, history)
    const [verified, setVerified] = useState(false)
    const hash = location.search.split('hash=')[1]

    useEffect(() => {
        if (hash) {
            userApi.verifyHash(hash)
                .then(({ data }) => {
                    if (data.status === "success") {
                        setVerified(true)
                    }
                })
        }
    })

    const { status, message } = renderTextInfo(hash, verified)

    return (
        <div>
            <Block>
                <Result
                    status={status}
                    title={status === "success" ? "Готово!" : "Ошибка!"}
                    subTitle={message}
                    extra={
                        status === "success" && verified &&
                        <Button type="primary" onClick={() => history.replace("/singin")}>Войти</Button>
                    }
                    style={{ userSelect: 'none' }}
                />
            </Block>
        </div>
    );
};

export default CheckEmailInfo;