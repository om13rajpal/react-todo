const zod = require("zod");

const todoSchema = zod.object({
  title: zod.string().min(2),
  description: zod.string().optional(),
});

module.exports = {
    todoSchema
}
