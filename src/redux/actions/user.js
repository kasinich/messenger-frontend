import { openNotification } from "utils/helpers";
import { userApi } from "utils/api";

const actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe()
        .then(({ data }) => {
            dispatch(actions.setUserData(data));
        })
        .catch((err)=>{
            if (err.response.status === 403) {
                dispatch(actions.setIsAuth(false));
                delete window.localStorage.token
            }
        })
    },
    fetchUserLogin: postData => dispatch => {
        return userApi.signIn(postData)
            .then(({ data }) => {
                const { status, token } = data;
                if (status === "success") {
                    openNotification({
                        title: "Отлично!",
                        text: "Авторизация успешна.",
                        type: "success"
                    })
                    window.axios.defaults.headers.common["token"] = token;
                    window.localStorage["token"] = token;
                    dispatch(actions.fetchUserData());
                    dispatch(actions.setIsAuth(true));
                }
                else {
                    openNotification({
                        title: "Ошибка при авторизации",
                        text: "Неверный логин или пароль",
                        type: "error"
                    })
                }
                return data;
            })
    },
    fetchUserRegister: postData => dispatch => {
        return userApi.signUp(postData).then(({ data }) => {
            return data;
        });
    }
};


export default actions