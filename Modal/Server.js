const { Schema, model } = require("mongoose") 

module.exports = model("servers-settings", new Schema ({
  guild: String,
  lang: String, 
log: String,
  wc: String,
  staff: Array ,
cmd: Array

})) 