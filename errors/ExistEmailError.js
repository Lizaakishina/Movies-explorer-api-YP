class ExistEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExistEmailError';
    this.statusCode = 409;
  }
}

module.exports = ExistEmailError;
