const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');
const { v4: uuidv4 } = require('uuid');

class CreditService {
  // Deduct credits for learning a session
  async deductCreditsForSession(userId, sessionId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('User not found');

      if (user.credits < 2) {
        throw new Error('Insufficient credits');
      }

      user.credits -= 2;
      await user.save();

      await CreditTransaction.create({
        id: uuidv4(),
        userId,
        amount: -2,
        type: 'spent',
        reason: 'Session attendance',
        relatedSessionId: sessionId,
      });

      return user.credits;
    } catch (error) {
      throw new Error(`Credit deduction failed: ${error.message}`);
    }
  }

  // Award credits to mentor after session completion
  async awardCreditsToMentor(userId, sessionId, amount = 10) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('User not found');

      user.credits += amount;
      await user.save();

      await CreditTransaction.create({
        id: uuidv4(),
        userId,
        amount,
        type: 'earned',
        reason: 'Session completion',
        relatedSessionId: sessionId,
      });

      return user.credits;
    } catch (error) {
      throw new Error(`Credit award failed: ${error.message}`);
    }
  }

  // Penalize credits for missed session
  async penalizeCredits(userId, sessionId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('User not found');

      user.credits -= 5;
      await user.save();

      await CreditTransaction.create({
        id: uuidv4(),
        userId,
        amount: -5,
        type: 'penalty',
        reason: 'Missed session',
        relatedSessionId: sessionId,
      });

      return user.credits;
    } catch (error) {
      throw new Error(`Penalty application failed: ${error.message}`);
    }
  }

  // Get credit transaction history
  async getTransactionHistory(userId, limit = 50) {
    try {
      const transactions = await CreditTransaction.findAll({
        where: { userId },
        limit,
        order: [['createdAt', 'DESC']],
      });

      return transactions;
    } catch (error) {
      throw new Error(`Failed to fetch transaction history: ${error.message}`);
    }
  }
}

module.exports = new CreditService();
