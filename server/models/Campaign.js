const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    introduction: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("campaigns", CampaignSchema)