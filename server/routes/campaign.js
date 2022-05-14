const express = require("express");
const router = express.Router();

const Campaign = require("../models/Campaign");
const {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaign");

// @route GET api/campaigns
// @desc Get campaigns
// @access public
router.get("/", async(req, res)=>{
    await getCampaigns(req, res);
})

// @route POST api/campaigns
// @desc Post campaign
// @access public
router.post("/", async(req, res)=>{
    await createCampaign(req, res)
})

// @route PUT api/campaigns
// @desc Update campaign
// @access public
router.put("/:id", async(req, res)=>{
    await updateCampaign(req, res)
})

// @route DELETE api/campaigns
// @desc Delete campaign
// @access public
router.delete("/:id", async(req, res)=>{
    await deleteCampaign(req, res)
})

module.exports = router