exports.isEmpty = obj => Object.keys(obj).length === 0

exports.isEmail = email => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return emailRegex.test(email)
}

exports.isPhoneValid = (p) => {
    const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/
    const digits = p.replace(/\D/g, "")
    return phoneRe.test(digits)
}
