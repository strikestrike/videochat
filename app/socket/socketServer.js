const socket = require("socket.io");
const { setServerSocketInstance, getOnlineUsers,
    addNewConnectedUser, chatFinished,
    resetRoundUsers, setConnectedUserInfo, getUserInfoBySocketId,
    STATE_CHATTING,
    STATE_PENDING } = require("./connectedUsers");
const disconnectHandler = require("../socketControllers/disconnectHandler");
const { addFavorite, removeFavorite } = require("../socketControllers/favoriteHandler");
const { startMatchingUsers, connectMatchedUsers } = require("../socketControllers/matchHandler");

const createSocketServer = (server) => {
    const io = socket(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
        },
    });

    setServerSocketInstance(io);

    io.on("connection", (socket) => {
        socket.on('joinRound', (data) => {
            try {
                addNewConnectedUser({ socketId: socket.id, userInfo: data });
                socket.emit("me", socket.id);
                io.emit('onlineUsers', getOnlineUsers());

                startMatchingUsers();
                connectMatchedUsers(socket);
            } catch (err) {
                console.log('joinRound Error: ', err);
            }
        });

        socket.on('sendMessage', (data) => {
            socket.to(socket.id).emit("sendMessageBroadCast", data);
        });

        socket.on("calluser", ({ userToCall, signalData, from, name }) => {
            socket.to(userToCall).emit("calluser", { signal: signalData, from, name });
        });

        socket.on("answercall", (data) => {
            let fromUser = getUserInfoBySocketId(socket.id);
            if (!fromUser || fromUser.state != STATE_PENDING) {
                return;
            }
            let toUser = getUserInfoBySocketId(fromUser.matchedSocketId);
            if (toUser) {
                fromUser.state = STATE_CHATTING;
                setConnectedUserInfo({ socketId: fromUser.socketId, userInfo: fromUser });
                toUser.state = STATE_CHATTING;
                setConnectedUserInfo({ socketId: fromUser.matchedSocketId, userInfo: toUser });
            }

            console.log('server answerCall ', data.to);
            socket.to(data.to).emit("callaccepted", data.signal);
        });

        socket.on("addFavorite", (data) => {
            addFavorite({ socketId: socket.id, userInfo: data });
        });

        socket.on("removeFavorite", (data) => {
            removeFavorite({ socketId: socket.id, userInfo: data });
        });

        socket.on("markStar", () => {
            console.log('server on markStar ', socket.id);
            const percent = chatFinished(socket.id);
            if (percent > 50) {
                resetRoundUsers();
            }
            io.emit('progressChanged', percent);
        });

        socket.on("disconnect", () => {
            console.log('server disconnet socketId: ', socket.id);
            disconnectHandler(socket, io);
        });

    });

};

module.exports = {
    createSocketServer,
}
