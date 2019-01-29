import offices from '../models/offices';
import validator from '../validators/inputValidator';

class OfficeController {
  static createOffice(req, res) {
    const { error } = validator.validateCreateOffice(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    const office = {
      officeId: offices[offices.length - 1].officeId + 1,
      type: req.body.type,
      name: req.body.name
    };
    offices.push(office);
    return res.status(201).json({
      status: 201,
      data: [office]
    });
  }

  static getOfficeById(req, res) {
    const { officeId } = req.params;
    const office = offices.find(element => element.officeId === parseInt(officeId, 10));
    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'The Office with the given Id does not exist'
      });
    }
    return res.status(200).json({
      status: 200,
      data: [office]
    });
  }

  static getAllOffices(req, res) {
    const allOffices = offices;
    return res.status(200).json({
      status: 200,
      data: allOffices
    });
  }
}

export default OfficeController;
