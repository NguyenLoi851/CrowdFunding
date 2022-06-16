const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        require: true
    },
    detailInfor: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("campaigns", CampaignSchema)