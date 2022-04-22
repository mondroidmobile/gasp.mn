const successFn = (req, res, next) => {

    /**
     * Амжилттай болсон мэдээлэл буцаах
     * @param {string} info Буцаах мэдээллийн тайлбар
     * @param {number} statusCode status code
     * @returns response буцаана
     */
    function sendInfo(info, statusCode=200)
    {
        return res.status(statusCode).json(
            {
                success: true,
                info: info,
                error: {}
            }
        )
    }

    /**
     * Амжилттай ажилласаны дараах data -г буцаах нь
     * @param {any} data тухайн service ээс хамаарч юу ч байж болно
     * @param {number} statusCode status code
     * @returns response буцаана
     */
    function sendData(data, statusCode=200) {
        return res.status(statusCode).json(
            {
                success: true,
                data: data,
                error: {}
            }
        )
    }

    /**
     * Амжилттай ажилласаны дараах data болон info буцаах нь
     * @param {string} info Буцаах мэдээллийн тайлбар
     * @param {any} data тухайн service ээс хамаарч юу ч байж болно
     * @param {number} statusCode status code
     * @returns response буцаана
     */
     function sendDataInfo(info, data, statusCode=200) {
        return res.status(statusCode).json(
            {
                success: true,
                info: info,
                data: data,
                error: {}
            }
        )
    }

    res.sendInfo = sendInfo
    res.sendData = sendData
    res.sendDataInfo = sendDataInfo
    next()
}

module.exports = successFn
