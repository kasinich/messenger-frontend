import React from 'react';
import { Form } from "antd"
import { Block, Button, FormField } from 'components';
import { Link } from "react-router-dom"

const LoginForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props
    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    name="normal_login"
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <FormField
                        name="email"
                        type="text"
                        placeholder="E-Mail"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        values={values}
                    />
                    <FormField
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        values={values}
                    />
                    <Form.Item>
                        <Button
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                        >
                            ВОЙТИ В АККАУНТ
                        </Button>
                    </Form.Item>
                    <Link
                        className="auth__register-link"
                        to="/singup"
                    >
                        Зарегистрироваться
                    </Link>
                </Form>
            </Block>
        </div>
    );
}

export default LoginForm;