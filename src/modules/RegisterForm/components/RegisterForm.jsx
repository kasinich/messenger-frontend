import React from 'react';
import { Form } from "antd"
import { Block, Button, FormField } from 'components';
import { Link } from "react-router-dom"

const RegisterForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
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
                    ></FormField>
                    <FormField
                        name="fullname"
                        type="text"
                        placeholder="Ваше имя"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        values={values}
                    ></FormField>
                    <FormField
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        values={values}
                    ></FormField>
                    <FormField
                        name="password_2"
                        type="password"
                        placeholder="Повторить пароль"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        errors={errors}
                        values={values}
                    ></FormField>
                    <Form.Item>
                        <Button
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </Button>
                    </Form.Item>
                    <Link
                        className="auth__register-link"
                        to="/singin"
                    >
                        Войти в аккаунт
                    </Link>
                </Form>
            </Block>
        </div>
    );
}

export default RegisterForm;