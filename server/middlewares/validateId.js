const checkAnyId = (id, res, resource, next) => {
  if (!/^[1-9]+[0-9]*$/.test(id)) {
    return res.status(400).json({
      status: 400,
      error: `${resource} id should be a positive number from 1 upwards`
    });
  }
  return next();
};
const checkId = (req, res, next) => {
  const { officeId } = req.params;
  return checkAnyId(officeId, res, 'Office', next);
};

const checkPartyId = (req, res, next) => {
  const { partyId } = req.params;
  return checkAnyId(partyId, res, 'Party', next);
};

const checkUserId = (req, res, next) => {
  const { userId } = req.params;
  return checkAnyId(userId, res, 'User', next);
};


const idCheck = { checkId, checkPartyId, checkUserId };
export default idCheck;
