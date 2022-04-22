const jwt = require('jsonwebtoken');
const CError = require('./error')

const asyncHandler = require('./asyncHandler');

/**
 * Токеноос хэрэглэгч нэвтэрсэн байгаа эсэхийг шалгана
 * @param {*} req.cookies Cookie
 * @param {*} res.user Хэрэглэгчийн токен
 * @param {*} next Дараагийн middware лүү шилжих
 */
const loginRequired = asyncHandler(async (req, res, next) =>
{
    const token = req.cookies[process.env.TOKEN_NAME];

    if (!token)
        throw new CError("Та нэвтрэх үйлдэл хийнэ үү");
    try
    {
        const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = validToken.id;
        req.userEmail = validToken.email
        next();
    }
    catch (err)
    {
        throw new CError("Та нэвтрэх үйлдэл хийнэ үү");
    }
})

module.exports = loginRequired
