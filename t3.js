'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register(require('inert'),(exp) => {
    if(exp) throw exp;

    server.route({
        method:'GET',
        path:'/pages/{path}',
        handler: function(request, reply){
            reply.file('./pages/'+request.params.path);
        }
    });
});

server.start((exp) => {
    if(exp) throw exp;
});
