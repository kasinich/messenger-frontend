export default ({ isAuth, values, errors }) => {
    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = "Введите E-mail"
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(value)
            ) {
                errors.email = "Не верный E-mail"
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = "Введите пароль"
            } else if (!isAuth && !/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/i.test(value)) {
                errors.password = "Слишком легкий пароль"
            }
        },
        password_2: (value) => {
            if (!isAuth && value !== values.password) {
                errors.password_2 = "Пароль не совпадает"
            } else if (!value) {
                errors.password_2 = "Введите пароль"
            }
        },
        fullname: (value) => {
            if (!isAuth && !value) {
                errors.fullname = "Укажите свое имя"
            }
        }
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    )

}
