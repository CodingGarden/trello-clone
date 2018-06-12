import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';

let API_URL = 'https://cg-trello-clone.now.sh';

if (window.location.hostname === 'localhost') {
  API_URL = 'http://localhost:3030';
}

const socket = io(API_URL, {
  transports: ['websocket'],
});

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage,
  }));

export default feathersClient;
