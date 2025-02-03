import User from "./models/userModel.js";
import Game from "./models/gameModel.js";
import Event from "./models/eventModel.js";
// import UserGame from "./models/userGameModel.js";
import { readJSON } from "./utils/utils.js";

const insertInitialUserData = async () => {
  const userData = readJSON("./public/data/users.json");
  await User.bulkCreate(userData, { ignoreDuplicates: true });

  const gameData = readJSON("./public/data/games.json");
  await Game.bulkCreate(gameData, { ignoreDuplicates: true });

  const eventData = readJSON("./public/data/events.json");
  await Event.bulkCreate(eventData, { ignoreDuplicates: true });

  // Create a map of usernames to user ids
  const users = await User.findAll();
  const userMap = {};
  users.forEach((user) => {
    userMap[user.username] = user.id_user;
  });

  /*let userGameData = readJSON("../public/data/userGame.json");

  userGameData = userGameData.map((entry) => ({
    ...entry,
    userId: userMap[entry.userId],
  }));

  await UserGame.bulkCreate(userGameData, { ignoreDuplicates: true });*/
};

export { insertInitialUserData };
