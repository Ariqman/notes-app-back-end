require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Notes Plugin
const notes = require('./api/notes');
const NotesService = require('./services/postgres/notesService');
const NotesValidator = require('./validator/notes');

// Users Plugin
const users = require('./api/users');
const UsersService = require('./services/postgres/usersService');
const UsersValidator = require('./validator/users');

// authentications
const auth = require('./api/auth');
const AuthService = require('./services/postgres/authService');
const TokenManager = require('./tokenize/tokenManager');
const AuthValidator = require('./validator/auth');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const authService = new AuthService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: auth,
      options: {
        authService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
