import offices from '../models/offices';
import validateCreateOffice from '../validators/inputValidator';



class OfficeController {
  static createOffice(req, res) {
    const { error } = validateCreateOffice(req.body);
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
      data: [office],
      message: 'Office Successfully Created'
    });
  }

  static getOfficeById(req, res) {
    const { officeId } = req.params;
    const office = offices.find(element => element.officeId === parseInt(officeId, 10));
    if (!office) {
      return res.status(404).json({
        success: false,
        error: 'The Office with the given Id does not exist'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Office successfully fetched by ID',
      data: [office]
    });
  }

  static getAllOffices(req, res) {
    const allOffices = offices;
    return res.status(200).json({
      success: true,
      message: 'All Offices Successfully Fetched',
      data: allOffices
    });
  }
}

export default OfficeController;
