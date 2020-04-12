const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./merge');

const { printError } = require('../../helpers/common');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => transformEvent(event));
    } catch (e) {
      printError(e);
      throw e;
    }
  },
  createEvent: async (args) => {
    const event = Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5e8f15fde56f610b107602d3',
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById('5e8f15fde56f610b107602d3');
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (e) {
      printError(e);
      throw e;
    }
  },
};
