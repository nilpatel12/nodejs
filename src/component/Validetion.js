
const Validetion = (user) => {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if (user.name === "") {
        error.name = "Name should not be empty"
    }
    if (user.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(user.email)) {
        error.email = "Email Didn't match"
    }
    if (user.password === "") {
        error.password = "Password should not be empty"
    }
    // else if(!password_pattern.test(user.password)){
    //     error.password = "Password didn't match"
    // }
    return error;
}

export default Validetion