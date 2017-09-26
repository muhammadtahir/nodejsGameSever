//import express package from module folder
var express=require('express');

// init the express module
var app=express();


var server=require('http').createServer(app);

var io=require('socket.io').listen(server);

app.set('port',process.env.PORT || 3000);

var clients=[];

io.on("connection",function(socket){

    var currentUser;
    socket.on("userConnected",function(){

        console.log("user is connected");

        // when user is connected
        for(var i=0;i<clients.length;i++){
            socket.emit("user is connected" ,{name:clients[i].name,position:clients[i].position});
            console.log("user name "+ clients[i].name+ "user is connected");
        }

        socket.on("Play",function(data){

            currentUser={

                name:data.name,
                position:data.position
            }

            clients.push(currentUser);
            socket.emit("PLAY",currentUser);
        });
    });

});

server.listen(app.get('port'),function(){
    console.log("---- server is running----");
});