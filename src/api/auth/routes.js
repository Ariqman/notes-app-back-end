const routes = (handler) => [
  {
    method: 'POST',
    path: '/auth',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/auth',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
