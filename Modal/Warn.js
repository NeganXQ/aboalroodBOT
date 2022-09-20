const { Schema, model } = require("mongoose") 

module.exports = model("warningsDB", new Schema ({
  guild: String,
  user: String,
  userTag: String,
  content: Array 

})) 