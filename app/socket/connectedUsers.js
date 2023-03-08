const connectedUsers = new Map();
let io = null;

const STATE_IDLE = 0;
const STATE_PENDING = 1;
const STATE_CHATTING = 2;
const STATE_FINISHED = 3;

const addNewConnectedUser = ({ socketId, userInfo }) => {
    console.log('addNewConnectedUser', socketId);
    userInfo.state = STATE_IDLE;
    userInfo.matchedSocketId = null;
    connectedUsers.set(socketId, userInfo);
};

const removeConnectedUser = ({ socketId }) => {
    console.log('removeConnectedUser', socketId);
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
    }
};

const chatFinished = (socketId) => {
    var finishedCount = 0;
    const usersCount = getOnlineUsersCount();
    if (usersCount == 0) {
        return 0;
    }

    connectedUsers.forEach(function (value, key) {
        if (socketId == key) {
            value.state = STATE_FINISHED;
            connectedUsers.set(socketId, value);
        }
        console.log('chatFinished key=', key, value);
        if (value.state == STATE_FINISHED) {
            finishedCount++;
        }
    });

    return (100 * finishedCount / usersCount).toFixed();
};

// get active connection of a particular user
const getActiveConnection = (userId) => {
    const activeConnection = null;

    connectedUsers.forEach((value, key) => {
        if (value.userId === userId) {
            activeConnection = key;
        }
    });

    return activeConnection;
};

const getOnlineUsers = () => {
    const onlineUsers = [];

    connectedUsers.forEach((value, key) => {
        onlineUsers.push({
            userId: value.userId,
            email: value.email,
            username: value.username,
            image: value.image,
            tag: value.tag,
            matchedSocketId: value.matchedSocketId,
            state: value.state,
            socketId: key,
        });
    });

    return onlineUsers;
};

function getOnlineUsersCount() {
    var len = 0;
    connectedUsers.forEach((value, key) => {
        len++;
    });

    return len;
}

const getUserInfoBySocketId = (socketId) => {
    if (connectedUsers.has(socketId)) {
        return connectedUsers.get(socketId);
    }
    return null;
};

const getUserState = (socketId) => {
    let userInfo = connectedUsers.get(socketId);
    if (userInfo) {
        return userInfo.state;
    }
    return STATE_FINISHED;
}

const setConnectedUserInfo = ({ socketId, userInfo }) => {
    connectedUsers.set(socketId, userInfo);
};

const resetRoundUsers = () => {
    connectedUsers.forEach((value, key) => {
        value.state = STATE_IDLE;
        value.matchedSocketId = null;
        connectedUsers.set(key, value);
    });
};

const setServerSocketInstance = (ioInstance) => {
    io = ioInstance;
};

const getServerSocketInstance = () => {
    return io;
};

module.exports = {
    STATE_IDLE,
    STATE_PENDING,
    STATE_CHATTING,
    STATE_FINISHED,
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnection,
    setServerSocketInstance,
    getServerSocketInstance,
    getOnlineUsers,
    getOnlineUsersCount,
    chatFinished,
    resetRoundUsers,
    getUserInfoBySocketId,
    setConnectedUserInfo,
    getUserState,
};
