const signService = require("../services/sign")

/** Нэвтрэх үйлдлийг хийх нь */
exports.login = async (req, res, next) =>
{
    const { email, password } = req.body

    const user = await signService.in(email, password, res)

    res.sendDataInfo("Амжилттай нэвтэрлээ", user)
}

/**
 * Системээс гарах Logout
 */
exports.logout = async (req, res) =>
{
    await signService.out(req, res)
    res.sendInfo('Гарах үйлдэл амжилттай')
};

/** нууц үг сэргээх */
exports.resetPassword = async (req, res) =>
{
    await signService.sendMailResetPassword(req)
    res.sendInfo('Мэйл хаяг руугаа орж баталгаажуулна уу')
}

/** Шинэ нууц үгийг хадгалах */
exports.confirmPassword = async (req, res) =>
{
    await signService.reset(req)
    res.sendInfo('Нууц амжилттай солилоо')
}
