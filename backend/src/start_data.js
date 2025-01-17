import User from "./models/userModel.js";
import Game from "./models/gameModel.js";
import UserGame from "./models/userGameModel.js";

const insertInitialUserData = async () => {
  const userData = [
    {
      email: "mail1@mail.com",
      password: "1234",
      username: "User1",
      roles: ["user", "admin", "mod"],
    },
    {
      email: "mail2@mail.com",
      password: "1234",
      username: "User2",
      roles: ["user"],
    },
    {
      email: "mail3@mail.com",
      password: "1234",
      username: "User3",
      roles: ["user"],
    },
    {
      email: "mail4@mail.com",
      password: "1234",
      username: "User4",
      roles: ["user"],
    },
    {
      email: "mail5@mail.com",
      password: "1234",
      username: "User5",
      roles: ["user"],
    },
  ];

  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  // Para actualizar solo algunas columnas: updateOnDuplicate: ["email", "password"]
  await User.bulkCreate(userData, { ignoreDuplicates: true });

  const users = await User.findAll();
  const userMap = {};
  users.forEach((user) => {
    userMap[user.username] = user.id_user;
  });

  const gameData = [
    { title: "TituloA", year: 1999, platform: ["PC"] },
    { title: "TituloB", year: 1999, platform: ["PC"] },
    { title: "TituloC", year: 1475, platform: ["Xbox"] },
    { title: "TituloD", year: 2021, platform: ["Nintendo"] },
    { title: "TituloE", year: 2021, platform: ["Mobile"] },
  ];

  await Game.bulkCreate(gameData, { ignoreDuplicates: true });

  const games = await Game.bulkCreate(gameData, { ignoreDuplicates: true });

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
