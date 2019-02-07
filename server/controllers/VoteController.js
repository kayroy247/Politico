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
    query('INSERT INTO votes(office, candidate, voter) VALUES ($1, $2, $3) RETURNING *', [req.body.office, req.body.candidate, req.decoded.id])
      .then((result) => {
        const vote = result.rows[0];
        return res.status(201).json({
          status: 201,
          data: [vote]
        });
      })
      .catch((err) => {
        if (err.message.includes('update on table')) {
          return res.status(404).json({
            status: 404,
            error: 'Atleast one of your input does not exist'
          });
        }
        if (err.message.includes('duplicate')) {
          return res.status(409).json({
            status: 409,
            error: 'You can only vote once'
          });
        }
        return res.status(409).json({
          status: 409,
          error: 'Unable to create vote'
        });
      });
    return true;
  }
}

export default VoteController;
