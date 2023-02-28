const { body } = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("The name is required.")
            .isLength({ min: 3 })
            .withMessage("The name needs to have at least 3 characters."),
        body("email")
            .isString()
            .withMessage("The email is required.")
            .isEmail()
            .withMessage("Enter a valid email."),
        body("password")
            .isString()
            .withMessage("The password is required.")
            .isLength({ min: 6 })
            .withMessage("The password needs to have 6 characters."),
        body("confirmPassword")
            .isString()
            .withMessage("The password confirmation is required.")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("The password doesn't match.")
                }
                return true
            })
    ]
}

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("The email is required.")
            .isEmail()
            .withMessage("Enter with a valid email"),
        body("password")
            .isString()
            .withMessage("The password is required."),
    ]
}

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: 3 })
            .withMessage("Name needs to have at least 3 characters"),
        body("password")
            .optional()
            .isLength({ min: 5 })
            .withMessage("Password needs to have at least 5 characters")
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
}