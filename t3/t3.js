'use strict';

var Api = {
    Get : require('./api/get.js')
}

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register(require('inert'),(exp) => {
    if(exp) throw exp;

    // Default index.html routes
    server.route({
        method:'GET',
        path:'/pages/',
        handler: function(request, reply){
            reply.file('./pages/index.html');
        }
    });
    server.route({
        method:'GET',
        path:'/pages',
        handler: function(request, reply){
            reply.file('./pages/index.html');
        }
    });

    server.route({
        method:'GET',
        path:'/api/get',
        handler: function(request, reply){
            reply(Api.Get.GetTasks());
        }
    });

    // All "pages" routes
    server.route({
        method:'GET',
        path:'/pages/{path*}',
        handler: function(request, reply){
            reply.file('./pages/'+request.params.path);
        }
    });
});

server.start((exp) => {
    if(exp) throw exp;
});
