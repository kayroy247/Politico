import validator from '../validators/inputValidator';
import query from '../database/connection';

class CandidateController {
  static createCandidate(req, res) {
    const { error } = validator.validateCreateCandidate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    query('INSERT INTO candidates (office, party, candidate) VALUES ($1, $2, $3) RETURNING *', [req.body.office, req.body.party, parseInt(req.params.userId, 10)])
      .then((result) => {
        const candidate = result.rows[0];
        return res.status(201).json({
          status: 201,
          data: candidate
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(409).json({
          status: 409,
          error: `Unable to Register Candidate: ${errMessage}`
        });
      });
    return true;
  }

  static getResultById(req, res) {
    query('SELECT office, candidate, count(candidate) as result FROM votes WHERE office = $1 GROUP BY office, candidate', [parseInt(req.params.officeId, 10)])
      .then((result) => {
        if (result.rows[0] == null) {
          return res.status(400).json({
            status: 400,
            error: 'The office with the given id does not exist'
          });
        }
        const electionResult = result.rows[0];
        return res.status(200).json({
          status: 200,
          data: [electionResult]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(400).json({
          status: 400,
          error: `Bad Request ${errMessage}`
        });
      });
  }
}

export default CandidateController;
