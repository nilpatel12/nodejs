
const Validetion = (users) => {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if (users.name === "") {
        error.name = "Name should not be empty"
    }
    if (users.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(users.email)) {
        error.email = "Email Didn't match"
    }
    if (users.message === "") {
        error.message = "message should not be empty"
    }
   
    return error;
}

export default Validetion