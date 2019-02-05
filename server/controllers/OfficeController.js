import validator from '../validators/inputValidator';
import query from '../database/connection';

class OfficeController {
  static createOffice(req, res) {
    const { error } = validator.validateCreateOffice(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    query('INSERT INTO offices(type, name) VALUES ($1, $2) RETURNING *', [req.body.type, req.body.name])
      .then((result) => {
        const offices = result.rows[0];
        return res.status(201).json({
          status: 201,
          data: offices
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

  static getOfficeById(req, res) {
    const { officeId } = req.params;
    query('SELECT * FROM offices WHERE id = $1', [officeId])
      .then((result) => {
        if (result.rows[0] == null) {
          return res.status(400).json({
            status: 400,
            error: 'The office with the given id does not exist'
          });
        }
        const office = result.rows[0];
        return res.status(200).json({
          status: 200,
          data: [office]
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        return res.status(404).json({
          status: 404,
          error: `The office with the given id does not exist ${errMessage}`
        });
      });
    return true;
  }

  static getAllOffices(req, res) {
    query('SELECT * FROM offices', [])
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
    return true;
  }
}

export default OfficeController;
