export const rooms = {};

export const createRoom = (idRoom, user) => {
  rooms[idRoom] = { users: [user] };
};
