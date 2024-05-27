import { withFormik } from "formik";
import LoginForm from "../components/LoginForm";
import validateForm from "utils/validate"

import { userActions } from "../../../redux/actions" 

import store from "../../../redux/store"

const LoginFormContainer = withFormik({
    mapPropsToValues: () => (
        {
            email: "",
            password: ""
        }),
    validate: values => {
        let errors = {}

        validateForm({ isAuth: true, values, errors })

        return errors
    },
    handleSubmit: async (values, { setSubmitting, props }) => {
        try {
            const response = await store.dispatch(userActions.fetchUserLogin(values));
            if (response && response.status === "success") {
                props.history.replace("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        } finally {
            setSubmitting(false);
        }
    },
    displayName: "LoginForm"

})(LoginForm);

export default LoginFormContainer