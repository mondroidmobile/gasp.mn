class MyError extends Error
{
    /**
     * throw Алдааны msg ийг rsp буцаах
     * @param {string} message алдааны message
     * @param  {...any} statusCode алдааны statusCode
     */
    constructor(message, statusCode)
    {
        super(message)
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = MyError
