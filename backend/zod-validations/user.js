const zod = require("zod")

const userSchema = zod.object({
    username: zod.string().min(5),
    password: zod.string().min(6)
})

module.exports = {
    userSchema: userSchema
}