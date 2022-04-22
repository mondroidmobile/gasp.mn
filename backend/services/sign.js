const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const configService = require('./config')
const nodemailer = require('nodemailer')

const MyError = require("../middleware/error")
const Authors = require('../models/authors')
const Verification = require("../models/verification")

const { timeToMs } = require('../utils')

/**
 *  Нэвтрэлт
 * @param {string} email        нэвтрэх цахим хаяг
 * @param {string} password     нэвтрэх нууц үг
 * @param {object} res          cookie г оноох
 * @returns нэвтрэх мэдээлэл
 */
exports.in = async (email, password, res) =>
{

    if (!email)
    {
        throw new MyError('Имэйл эсвэл нууц үг буруу байна')
    }

    //хэрэглэгчийн имейлийг шалгана
    const user = await Authors.findOne(
        {
            email: email.toLowerCase().trim(),
        }
    )
    //хэрэглэгчийн мэдээлэл байгаа эсэхийг шалгаж буй
    if (user === null) {
        throw new MyError('Имэйл эсвэл нууц үг буруу байна')
    }

    /**
     *  Нууц үг таарч байгаа эсэхийг шалгах
     */
    const isMatch = await user.comparePassword(password)
    if(!isMatch)
        throw new Error('Имэйл эсвэл нууц үг буруу байна')

    // нэвтрэх үед хэрэглэгчийн id-г токенд хадгална
    let token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        //токений хүчинтэй хугацааг хадгалж буй
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE_TIME
        }
    )

    /** Cookie үүсгэж байгаа түүний тохиргоо */
    const cookieOption =
    {
        expires: new Date(Date.now() + timeToMs(process.env.JWT_EXPIRE_TIME)),
        httpOnly: true,
    }

    //Токенийг cookie-нд хадгална
    res.cookie(process.env.TOKEN_NAME, token, cookieOption);
    const author = await Authors.findOne(
        {
            email: email,
        }
    ).select("-password")
    return author
}

/**
 * cookie-г аван cookie ны хугацааг дуусгана
 */
exports.out = (req, res) =>
{
    res.cookie(process.env.TOKEN_NAME, "", { maxAge: 0 })
};

/** Мэйл явуулах */
exports.sendMail = async (mailOptions) =>
{

    const configs = await configService.getConfigs(['SITE_EMAIL', 'SITE_EMAIL_PASS'])

    const email = configs[0].value.trim()
    const password = configs[1].value.trim()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password,
        }
    });

    mailOptions.from = email
    transporter.sendMail(mailOptions)
}

/**
 * Нууц үг солих mail илгээх
 * @param {Object} req.body.email Нууц үг солих хэрэглэгчийн mail
 */
exports.sendMailResetPassword = async (req) =>
{
    /** Нууц үг солих мэйл */
    const email = req.body.email

    var user = await Authors.findOne({ email: email })
    // verification --> Түр хугацаанд ашиглах 6 оронтой токен болон хэрэглэгчийн email хадаглагдана
    var verification = {}
    if(!user)
        throw MyError("Email буруу байна")

    verification = {
        token: crypto.randomBytes(6).toString('hex'),
        value: email
    }

    await Verification.create(verification)

    const confirmEmailUrl = process.env.CLIENT_URL + "/admin/resetpassword/" + verification.token

    var mailOptions = {
        to: email,
        subject: 'Нууц үг сэргээх',
        html: `
            <div>
                Та ийшээ орж нууц үгээ сэргээнэ үү
                <a href="${confirmEmailUrl}">Энд дарна уу</a>
                ${confirmEmailUrl}
            </div>
        `
    };
    await this.sendMail(mailOptions)
}

/**
 * Хэрэглэгчийн баталгаажуулах mail-ийн токеноос мэдээлэл авах
 * @param {Object} req.query.token нууц үг солих хүсэлтийн токен
 */
exports.reset = async (req) =>
{
    /** баталгаажуулах токен */
    const token = req.query.token
    const varifcation = await Verification.findOne({ token });

    if (req.body.password !== req.body.password2)
    {
        throw new Error('Нууц үгийг таарахгүй байна')
    }

    if(!varifcation)
        throw new Error('Баталгаажуулах линк буруу байна')

    const user = await Authors.findOne(
        {
            email: varifcation.value
        }
    )

    user.password = req.body.password
    await user.save()

    await Verification.deleteOne({ token })
}
