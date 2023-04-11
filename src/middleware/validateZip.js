function validateZip(req, res, next) {
  const zip = req.params.zip;
  var validZipTest = /(^\d{5}$)/;
  if (!validZipTest.test(zip)) {
    next(`Zip (${zip}) is invalid!`);
  } else {
    next();
  }
}

module.exports = validateZip;
