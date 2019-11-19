const Channel = require("../models/Channel");
const auth = require("../util/auth");

exports.createChanel = async channelObj => {
  const { name, about, token } = channelObj;
  try {
    const user = await auth(token);
    console.log(user);
    if (!user) {
      return false;
    }
    const channel = await Channel.create({ name, about, admin: user });
    console.log(channel);
    return channel;
  } catch (err) {
    console.log(err);
    return false;
  }
};
