import React from 'react';
import { Input, Form } from "antd"
import { validateField } from 'utils/helpers';

const FormField = ({
    name,
    type,
    placeholder,
    handleChange,
    handleBlur,
    touched,
    errors,
    values
}) => {
    return (
        <Form.Item
            name={name}
            validateStatus={validateField(name, touched, errors)}
            hasFeedback
            help={!touched[name] ? "" : errors[name]}
        >
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                size='large'
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Form.Item>
    );
};

export default FormField;