const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const { printError } = require('../../helpers/common');

const user = async (userId) => {
  try {
    const fetchedUser = await User.findById(userId);
    return {
      ...fetchedUser._doc,
      _id: fetchedUser.id,
      createdEvents: events.bind(this, fetchedUser._doc.createdEvents),
    };
  } catch (e) {
    printError(e);
    throw e;
  }
};

const transformEvent = (event) => ({
  ...event._doc,
  _id: event.id,
  date: dateToString(event._doc.date),
  creator: user.bind(this, event.creator),
});

const events = async (eventIds) => {
  try {
    const fetchedEvents = await Event.find({ _id: { $in: eventIds } });
    return fetchedEvents.map((event) => transformEvent(event));
  } catch (e) {
    printError(e);
    throw e;
  }
};

const transformBooking = (booking) => ({
  ...booking._doc,
  _id: booking.id,
  user: user.bind(this, booking._doc.user),
  event: singleEvent.bind(this, booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt),
});

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (e) {
    printError(e);
    throw e;
  }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
