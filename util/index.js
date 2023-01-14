function resolver(data) {
  return JSON.parse(JSON.stringify(data));
}

module.exports = {
  resolver,
};
