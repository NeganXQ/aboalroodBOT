const { Schema, model } = require("mongoose") 

module.exports = model("notification role", new Schema ({
  Rguild: String,
  Rname: String, 
  Rid: String,
  Remoji: String
})) 
