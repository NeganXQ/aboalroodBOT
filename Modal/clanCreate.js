const { Schema, model } = require("mongoose") 

module.exports = model("clans", new Schema ({
  Gid: String,
  ClanN: String, 
  ClanR: String,
  ClanINV: String,
  ClanId: String,
})) 

