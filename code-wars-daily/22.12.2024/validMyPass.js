/*I will give you a string. You respond with "VALID" if the string meets the requirements or "INVALID" if it does not.

Passwords must abide by the following requirements:

More than 3 characters but less than 20.

Must contain only alphanumeric characters.

Must contain letters and numbers.*/
const validPass = (password) => {
    const rules = /^[a-zA-Z0-9]{4,19}$/;
    return rules.test(password) && /\d/.test(password) && /[a-zA-Z]/.test(password) ? "VALID" : "INVALID";
}
console.log(validPass("Username123")); 