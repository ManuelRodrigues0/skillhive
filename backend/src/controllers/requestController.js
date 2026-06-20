const { Op } = require('sequelize');
const SkillRequest = require('../models/SkillRequest');
const User = require('../models/User');

const attachParticipants = async (requests) => {
  const userIds = [
    ...new Set(
      requests
        .flatMap((item) => [item.learnerId, item.mentorId])
        .filter(Boolean)
    ),
  ];
  const users = userIds.length
    ? await User.findAll({
        where: { id: userIds },
        attributes: ['id', 'username', 'fullName'],
      })
    : [];
  const usersById = new Map(users.map((user) => [user.id, user]));

  return requests.map((item) => ({
    ...item.toJSON(),
    learner: usersById.get(item.learnerId) || null,
    mentor: usersById.get(item.mentorId) || null,
  }));
};

exports.createRequest = async (req, res) => {
  try {
    const {
      skillName,
      category,
      description,
      preferredSchedule,
      duration,
      expectedOutcomes,
    } = req.body;

    if (!skillName || !category) {
      return res.status(400).json({ message: 'Skill name and category are required' });
    }

    const request = await SkillRequest.create({
      learnerId: req.user.id,
      skillName,
      category,
      description,
      preferredSchedule,
      duration: Number(duration) || 1,
      expectedOutcomes,
    });

    return res.status(201).json({
      message: 'Learning request created successfully',
      request: (await attachParticipants([request]))[0],
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const { category, status, mine } = req.query;
    const where = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (mine === 'true' && req.user?.id) {
      where[Op.or] = [{ learnerId: req.user.id }, { mentorId: req.user.id }];
    }

    const requests = await SkillRequest.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return res.json({
      requests: await attachParticipants(requests),
      count: requests.length,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await SkillRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.json({ request: (await attachParticipants([request]))[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch request', error: error.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await SkillRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.learnerId === req.user.id) {
      return res.status(400).json({ message: 'You cannot accept your own request' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending requests can be accepted' });
    }

    request.mentorId = req.user.id;
    request.status = 'accepted';
    await request.save();

    return res.json({
      message: 'Request accepted successfully',
      request: (await attachParticipants([request]))[0],
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to accept request', error: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid request status' });
    }

    const request = await SkillRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const isParticipant = request.learnerId === req.user.id || request.mentorId === req.user.id;
    if (!isParticipant) {
      return res.status(403).json({ message: 'You can only update your own requests' });
    }

    request.status = status;
    await request.save();

    return res.json({
      message: 'Request updated successfully',
      request: (await attachParticipants([request]))[0],
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update request', error: error.message });
  }
};
