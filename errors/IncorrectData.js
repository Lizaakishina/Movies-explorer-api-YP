class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginError';
    this.statusCode = 400;
  }
}

module.exports = IncorrectData;
