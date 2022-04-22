const morgan = require('morgan');
const colors = require('cli-color')

// if (process.env.NODE_ENV === 'development') {
/**
 * Сервер дээр хүсэлт ирсэнийг ялгахын тулд өнгөөр ялгаж өгдөг middleware
 */
const morganChalk = morgan(function (tokens, req, res) {
    return [
        colors.green.bold(tokens.method(req, res)),
        colors.red.bold(tokens.status(req, res)),
        colors.white(tokens.url(req, res)),
        colors.yellow(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
});
// }
// else if (process.env.NODE_ENV === 'production') {
// module.exports.morganChalk = morgan('combined')
// }
// module.exports.morganChalk = () => morgan("dev")
module.exports = morganChalk
