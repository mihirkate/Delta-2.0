class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.status = statusCode;
    this.message = message;
    console.log(this.status);
    console.log(this.message);
  }
}
module.exports = ExpressError;
