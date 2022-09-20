const { Schema, model } = require("mongoose") 

module.exports = model("mute", new Schema ({
  guild: String,
member: String,
  time: String,
})) 