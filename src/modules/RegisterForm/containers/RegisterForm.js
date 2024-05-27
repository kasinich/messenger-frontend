import { withFormik } from 'formik';
import RegisterForm from "../components/RegisterForm";
import validateForm from "utils/validate"

import { userActions } from "../../../redux/actions"

import store from "../../../redux/store"

const RegisterFormContainer = withFormik({
    mapPropsToValues: () => (
        {
            email: "",
            fullname: "",
            password: "",
            password_2: ""
        }),
    validate: values => {
        let errors = {}

        validateForm({ isAuth: false, values, errors })

        return errors
    },
    handleSubmit: async (values, { setSubmitting, props }) => {
        try {
            const response = await store.dispatch(userActions.fetchUserRegister(values));
            if (response) {
                setTimeout(() => {
                    props.history.replace("/singup/verify");
                }, 150);
            }
        } catch (error) {
            console.error("Error during registration:", error);
        } finally {
            setSubmitting(false);
        }
    },
    displayName: "RegisterForm"

})(RegisterForm);

export default RegisterFormContainer