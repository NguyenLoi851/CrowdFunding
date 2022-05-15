const Campaign = require("../models/Campaign");

module.exports = {
  // get all campaigns
  getCampaigns: async (req, res) => {
    try {
      const campaigns = await Campaign.find();
      res.json({ success: true, campaigns });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getCampaignById: async(req, res)=>{
    try {
        const campaign = await Campaign.findById(req.params.id)
        res.json({success: true, campaign})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
  },

  // create campaign
  createCampaign: async (req, res) => {
    const { introduction } = req.body;

    if (!introduction)
      return res
        .status(400)
        .json({ success: false, message: "Introduction is required" });
    try {
      const newCampaign = new Campaign({
        introduction,
      });
      await newCampaign.save();
      res.json({
        success: true,
        message: "Campaign create successfully",
        campaign: newCampaign,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  // update campaign
  updateCampaign: async (req, res) => {
    const { introduction } = req.body;
    if (!introduction)
      return res
        .status(400)
        .json({ success: false, message: "Introduction is required" });
    try {
      let updateCampaign = {
        introduction,
      };
      const campaignUpdateCondition = { _id: req.params.id };
      updateCampaign = await Campaign.findOneAndUpdate(
        campaignUpdateCondition,
        updateCampaign,
        { new: true }
      );
      if (!updateCampaign)
        return res.status(401).json({
          success: false,
          message: "Campaign not found",
        });
      res.json({
        success: true,
        message: "Update successfully",
        campaign: updateCampaign,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  // delete campaign
  deleteCampaign: async (req, res) => {
    try {
      const campaignDeleteCondition = { _id: req.params.id };
      const deletedCampaign = await Campaign.findOneAndDelete(
        campaignDeleteCondition
      );
      if (!deletedCampaign)
        return res.status(401).json({
          success: false,
          message: "Campaign not found",
        });
      res.json({ success: true, campaign: deletedCampaign });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
