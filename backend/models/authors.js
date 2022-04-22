const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const AuthorSchema = new mongoose.Schema({
    /** Тухайн үүсгэгчийн мэдээнд харагдах нэр */
    nickName: {
        type: String,
        required: true
    },
    /** Тухайн үүсгэгчийн цахим хаяг */
    email: {
        type: String,
        required: true,
        unique: true,
    },
    /** Тухайн хүний нэвтрэх нууц үг */
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

/**
 * Хэрэглэгч хадгалахад нууц үгийг hash лах
 */
AuthorSchema.pre('save', function (next) {

    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

/**
 * Нууц үг таарч байгаа эсэхийг шалгах
 * @param {string} password
 */
AuthorSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compareSync(password, this.password)
    return isMatch
}

module.exports = mongoose.model('Author', AuthorSchema);
