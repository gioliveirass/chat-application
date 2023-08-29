const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const PORT = 3001;

io.on("connection", (socket) => {
  console.log(`🔵 Usuário conectado em ${socket.id}!`);

  socket.on("disconnect", (reason) => {
    console.log(
      `⚫ Usuário ${socket.data.username} desconectado de ${socket.id}!`
    );
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log(` ℹ️ Usuário nomeado: ${socket.data.username}!`);
  });

  socket.on("message", (message) => {
    console.log(` ℹ️ Nova mensagem recebida: ${message}!`);

    io.emit("receive_message", {
      text: message,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Server is running on port ${PORT}...`)
);
