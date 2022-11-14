class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginError';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
