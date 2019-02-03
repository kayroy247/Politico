import validator from '../validators/inputValidator';
import query from '../database/connection';

class VoteController {
  static createVote(req, res) {
    const { error } = validator.validateCreateVote(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    query('INSERT INTO votes(office, candidate, voter) VALUES ($1, $2, $3) RETURNING *', [req.body.office, req.body.candidate, req.body.voter])
      .then((result) => {
        const vote = result.rows[0];
        return res.status(201).json({
          status: 201,
          data: [vote]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(409).json({
          status: 409,
          error: `Unable to create office: ${errMessage}`
        });
      });
    return true;
  }
}

export default VoteController;
