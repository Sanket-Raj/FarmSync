const Farm = require('../models/Farm');

exports.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ user: req.user.id });
    res.status(200).json({ success: true, count: farms.length, data: farms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    if (farm.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    res.status(200).json({ success: true, data: farm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFarm = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const farm = await Farm.create(req.body);
    res.status(201).json({ success: true, data: farm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFarm = async (req, res) => {
  try {
    let farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    if (farm.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: farm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    if (farm.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    await farm.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};