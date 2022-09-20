const { Schema, model } = require("mongoose") 

module.exports = model("voice", new Schema ({
  guild: String,
  voice:String,
  chat:String,
  owner:String,
})) 