const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Member = require("../models/members.model");
let member;

//Get all members
router.get("/members", async (req, res) => {
  member = await Member.find({}).sort({ createdAt: -1 });
  res.status(200).json(member);
});

//Get one Member
router.get("/members/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "There's no such Member" });
  }

  member = await Member.findById(id);

  if (!member) {
    return res.status(400).json({ msg: "There's no such Member" });
  }

  res.status(200).json(member);
});

//Add new member
router.post("/members", async (req, res) => {
  member = await Member.create({ ...req.body });
  res.status(200).json({ msg: "Added a new member" });
});

//Delete a member
router.delete("/members/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "There's no such Member" });
  }

  member = await Member.findByIdAndDelete(id);

  if (!member) {
    return res.status(400).json({ msg: "Family fember not found" });
  }

  res.status(200).json(member);
});

//Update a member
router.patch("/members/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Family fember not found" });
  }

  member = await Member.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(member);
});

module.exports = router;
