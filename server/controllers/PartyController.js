import validator from '../validators/inputValidator';
import query from '../database/connection';

class PartyController {
  static createParty(req, res) {
    const { error } = validator.validateCreateParty(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    query('INSERT INTO parties(name, hq_address, logo_url) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.hqAddress, req.body.logoURL])
      .then((result) => {
        const party = result.rows[0];
        return res.status(201).json({
          status: 201,
          data: [party]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(409).json({
          status: 409,
          error: `Unable to create party: ${errMessage}`
        });
      });
    return true;
  }

  static getPartyById(req, res) {
    const { partyId } = req.params;
    query('SELECT * FROM parties WHERE id = $1', [partyId])
      .then((result) => {
        console.log(result.rows.length);
        if (result.rows.length < 1) {
          return res.status(400).json({
            status: 400,
            error: 'The party with the given id does not exist'
          });
        }
        const party = result.rows[0];
        return res.status(200).json({
          status: 200,
          data: [party]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(404).json({
          status: 404,
          error: `The Party with the given id does not exist ${errMessage}`
        });
      });
  }

  static getAllParties(req, res) {
    query('SELECT * FROM parties', [])
      .then((result) => {
        const offices = result.rows;
        return res.status(200).json({
          status: 200,
          data: offices
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(404).json({
          status: 404,
          error: `Unable to fetch all offices ${errMessage}`
        });
      });
  }

  static EditPartyName(req, res) {
    const { partyId } = req.params;
    query('UPDATE parties SET name = $1 WHERE id = $2 RETURNING *', [req.body.name, partyId])
      .then((result) => {
        console.log(result.rows);
        const party = result.rows[0];
        return res.status(202).json({
          status: 202,
          data: [party]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(404).json({
          status: 404,
          error: `The Party with the given id does not exist ${errMessage}`
        });
      });
  }

  static deletePartyById(req, res) {
    const { partyId } = req.params;
    query('DELETE FROM parties WHERE id = $1 RETURNING *', [partyId])
      .then((result) => {
        console.log(result.rows.length);
        if (result.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'The Party with the given id does not exist'
          });
        }
        const party = result.rows[0];
        return res.status(202).json({
          status: 202,
          data: [party]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(404).json({
          status: 404,
          error: `The Party with the given id does not exist ${errMessage}`
        });
      });
  }
}

export default PartyController;
