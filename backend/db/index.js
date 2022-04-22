const colors = require("cli-color")
var mongoose = require('mongoose');

module.exports =
{
    /**
     * MONGODB Баазтай холбогдох нь
     */
    dbConntect: async () => {

        /** Холболтын үг */
        let msg = "connected"

        const db = await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            msg = "not connected"
            console.error(err.reason);
        });

        console.log(colors.bgBlue.black('MongoDB', msg));
    }
}
