import User from "./models/userModel.js";
import Game from "./models/gameModel.js";
import UserGame from "./models/userGameModel.js";

const insertInitialUserData = async () => {
  const userData = [
    {
      email: "mail1@mail.com",
      password: "$2b$10$7vPrsms/jteRnzDWsZg1pek9SaJGn2NWhL/xDLdu1.HOC1e1lZMLK", //dracudev123
      username: "User1",
      roles: ["user", "admin", "mod"],
      latitude: 40.416775,
      longitude: -3.70379,
    },
    {
      email: "mail2@mail.com",
      password: "$2b$10$7vPrsms/jteRnzDWsZg1pek9SaJGn2NWhL/xDLdu1.HOC1e1lZMLK",
      username: "User2",
      roles: ["user"],
    },
    {
      email: "mail3@mail.com",
      password: "$2b$10$7vPrsms/jteRnzDWsZg1pek9SaJGn2NWhL/xDLdu1.HOC1e1lZMLK",
      username: "User3",
      roles: ["user"],
    },
    {
      email: "mail4@mail.com",
      password: "$2b$10$7vPrsms/jteRnzDWsZg1pek9SaJGn2NWhL/xDLdu1.HOC1e1lZMLK",
      username: "User4",
      roles: ["user"],
    },
    {
      email: "mail5@mail.com",
      password: "$2b$10$7vPrsms/jteRnzDWsZg1pek9SaJGn2NWhL/xDLdu1.HOC1e1lZMLK",
      username: "User5",
      roles: ["user"],
    },
  ];

  await User.bulkCreate(userData, { ignoreDuplicates: true });

  // Create a map of usernames to user ids
  const users = await User.findAll();
  const userMap = {};
  users.forEach((user) => {
    userMap[user.username] = user.id_user;
  });

  const gameData = [
    {
      title: "TituloA",
      year: 1999,
      platform: ["PC", "Xbox"],
      genre: ["Action", "Puzzle"],
    },
    { title: "TituloB", year: 1999, platform: ["PC"] },
    { title: "TituloC", year: 1475, platform: ["Xbox"] },
    { title: "TituloD", year: 2021, platform: ["Nintendo"] },
    { title: "TituloE", year: 2021, platform: ["Mobile"] },
  ];

  await Game.bulkCreate(gameData, { ignoreDuplicates: true });

  const userGameData = [
    { userId: userMap["User1"], gameId: 1 },
    { userId: userMap["User2"], gameId: 1 },
    { userId: userMap["User2"], gameId: 4 },
    { userId: userMap["User1"], gameId: 5 },
    { userId: userMap["User4"], gameId: 2 },
    { userId: userMap["User5"], gameId: 3 },
  ];

  await UserGame.bulkCreate(userGameData, { ignoreDuplicates: true });
};

export { insertInitialUserData };
