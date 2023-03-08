const { STATE_IDLE, STATE_PENDING, getOnlineUsers, getUserState, setConnectedUserInfo } = require("../socket/connectedUsers");

const startMatchingUsers = () => {
    let onlineUsers = getOnlineUsers();
    for (let i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i].state == STATE_IDLE) {
            let bestMatch = getBestMatch(onlineUsers[i]);
            if (bestMatch) {
                bestMatch.state = STATE_PENDING;
                bestMatch.matchedSocketId = onlineUsers[i].socketId;
                setConnectedUserInfo({ socketId: bestMatch.socketId, userInfo: bestMatch });
                onlineUsers[i].state = STATE_PENDING;
                onlineUsers[i].matchedSocketId = bestMatch.socketId;
                setConnectedUserInfo({ socketId: onlineUsers[i].socketId, userInfo: onlineUsers[i] });
                console.log('mateching with: ' + onlineUsers[i].socketId + ' and ' + bestMatch.socketId);
            }
        }
    }
}

const connectMatchedUsers = (socket) => {
    let onlineUsers = getOnlineUsers();
    for (let i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i].state == STATE_PENDING) {
            socket.to(onlineUsers[i].socketId).emit('matchUser', onlineUsers[i]);
            // TODO: fix double calling of 'matchUser'
        }
    }
}

const getBestMatch = (userInfo) => {
    let state = getUserState(userInfo.socketId);
    if (state != STATE_IDLE) {
        return null;
    }

    let matchedUser = null;
    let onlineUsers = getOnlineUsers();
    for (let i = 0; i < onlineUsers.length; i++) {
        // TODO: implement match users logic
        if (onlineUsers[i].userId != userInfo.userId && getUserState(onlineUsers[i].socketId) == STATE_IDLE) {
            matchedUser = onlineUsers[i];
            break;
        }
    }
    return matchedUser;
};

module.exports = {
    startMatchingUsers,
    connectMatchedUsers,
    getBestMatch,
};