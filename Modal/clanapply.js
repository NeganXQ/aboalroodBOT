const { Schema, model } = require("mongoose") 

module.exports = model("apply", new Schema ({
  guild: String,
  Clan: String, 
ClanId: String,
  MessageId: String,
  MemberId: String 
})) 

