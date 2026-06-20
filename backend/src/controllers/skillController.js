const Skill = require('../models/Skill');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

exports.addSkill = async (req, res) => {
  try {
    const { skillName, category, description, proficiencyLevel, yearsOfExperience, isTeaching, isLearning } = req.body;
    const userId = req.user.id;

    if (!skillName || !category) {
      return res.status(400).json({ message: 'Skill name and category are required' });
    }

    const skill = await Skill.create({
      id: uuidv4(),
      userId,
      skillName,
      category,
      description,
      proficiencyLevel,
      yearsOfExperience,
      isTeaching,
      isLearning,
    });

    res.status(201).json({
      message: 'Skill added successfully',
      skill,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add skill', error: error.message });
  }
};

exports.getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;

    const skills = await Skill.findAll({
      where: { userId },
    });

    res.json({
      userId,
      skills,
      count: skills.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills', error: error.message });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};

    const skills = await Skill.findAll({ where });
    const userIds = [...new Set(skills.map((skill) => skill.userId))];
    const users = userIds.length
      ? await User.findAll({
          where: { id: userIds },
          attributes: ['id', 'username', 'fullName', 'bio', 'reputation', 'totalSessionsCompleted'],
        })
      : [];
    const usersById = new Map(users.map((user) => [user.id, user]));

    res.json({
      skills: skills.map((skill) => ({
        ...skill.toJSON(),
        mentor: usersById.get(skill.userId) || null,
      })),
      count: skills.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills', error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skillName, description, proficiencyLevel, yearsOfExperience, isTeaching, isLearning } = req.body;

    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (skillName) skill.skillName = skillName;
    if (description) skill.description = description;
    if (proficiencyLevel) skill.proficiencyLevel = proficiencyLevel;
    if (yearsOfExperience !== undefined) skill.yearsOfExperience = yearsOfExperience;
    if (isTeaching !== undefined) skill.isTeaching = isTeaching;
    if (isLearning !== undefined) skill.isLearning = isLearning;

    await skill.save();

    res.json({
      message: 'Skill updated successfully',
      skill,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update skill', error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByPk(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.destroy();

    res.json({
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill', error: error.message });
  }
};
