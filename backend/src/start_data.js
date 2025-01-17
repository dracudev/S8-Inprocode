import User from "./models/userModel.js";
import Game from "./models/gameModel.js";

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
    {
      title: "TituloA",
      year: 1999,
      user_id: userMap["User1"],
      platform: ["PC"],
    },
    {
      title: "TituloA",
      year: 1999,
      user_id: userMap["User2"],
      platform: ["PC"],
    },
    {
      title: "TituloC",
      year: 1475,
      user_id: userMap["User2"],
      platform: ["Xbox"],
    },
    {
      title: "TituloD",
      year: 2021,
      user_id: userMap["User3"],
      platform: ["Nintendo"],
    },
    {
      title: "TituloE",
      year: 2021,
      user_id: userMap["User4"],
      platform: ["Mobile"],
    },
  ];

  await Game.bulkCreate(gameData, { ignoreDuplicates: true });
};

export { insertInitialUserData };
