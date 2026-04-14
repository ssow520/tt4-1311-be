const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
    io = new Server(server,{
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        socket.emit("socker:ready", {
            message: "WebSocket connection established."
        })
    })

    return io;
}

const emitTaskCreated = (task) => {
    if(!io){
        return;
    }

    io.emit("task:created", {
        message: "A new task was created.",
        data: { task }
    });
}

const emitTaskUpdated = (task) => {
    if(!io){
        return;
    }

    io.emit("task:updated", {
        message: "A task was updated.",
        data: { task }
    });
}

const emitTaskDeleted = (taskId) => {
    if(!io){
        return;
    }

    io.emit("task:deleted", {
        message: "A task was deleted.",
        data: { taskId }
    });
}

module.exports = { initializeSocket,  emitTaskCreated, emitTaskUpdated, emitTaskDeleted};