const { removeConnectedUser, getOnlineUsers, getUserInfoBySocketId } = require("../socket/connectedUsers");

const disconnectHandler = (socket, io) => {
    let userInfo = getUserInfoBySocketId(socket.id);
    if (userInfo) {
        console.log('disconnectHandler ', socket.id)
        removeConnectedUser({ socketId: socket.id });
        io.emit('onlineUsers', getOnlineUsers());

        let matchedUser = getUserInfoBySocketId(userInfo.matchedSocketId);
        if (matchedUser) {
            console.log('disconnectHandler -matcher', matchedUser.socketId);
            removeConnectedUser({ socketId: matchedUser.socketId });
            socket.to(matchedUser.socketId).emit("callEnded", userInfo);
        }
    }
}

module.exports = disconnectHandler;