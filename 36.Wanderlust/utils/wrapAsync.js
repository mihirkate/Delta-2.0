// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
module.exports = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
