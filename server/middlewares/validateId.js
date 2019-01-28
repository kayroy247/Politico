
const checkId = (req, res, next) => {
  const { officeId } = req.params;
  if (!/^[1-9]+[0-9]*$/.test(officeId)) {
    res.status(400).json({
      status: 400,
      error: 'Office id should be a positive integer from 1'
    });
  }
  return next();
};

const checkPartyId = (req, res, next) => {
  const { partyId } = req.params;
  if (!/^[1-9]+[0-9]*$/.test(partyId)) {
    res.status(400).json({
      status: 400,
      error: 'Office id should be a positive integer from 1'
    });
  }
  return next();
};
const idCheck = { checkId, checkPartyId };
export default idCheck;
