import parties from '../models/parties';
import validator from '../validators/inputValidator';

class PartyController {
  static createParty(req, res) {
    const { error } = validator.validateCreateParty(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    const party = {
      partyId: parties[parties.length - 1].partyId + 1,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoURL: req.body.logoURL
    };
    parties.push(party);
    return res.status(201).json({
      status: 201,
      data: [party]
    });
  }

  static getPartyById(req, res) {
    const { partyId } = req.params;
    const party = parties.find(element => element.partyId === parseInt(partyId, 10));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'Office with the given id was not found'
      });
    }
    return res.status(200).json({
      status: 200,
      data: [party]
    });
  }

  static getAllParties(req, res) {
    const allParties = parties;
    return res.status(200).json({
      status: 200,
      data: allParties
    });
  }

  static EditPartyName(req, res) {
    const { partyId } = req.params;
    const { error } = validator.validatePartyName(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }
    const party = parties.find(element => element.partyId === parseInt(partyId, 10));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'The party with the given id was not found.'
      });
    }
    party.name = req.body.name;
    return res.status(200).json({
      success: true,
      data: [party]
    });
  }

  static deletePartyById(req, res) {
    const { partyId } = req.params;
    const party = parties.find(element => element.partyId === parseInt(partyId, 10));
    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'The party with the given id was not found.'
      });
    }
    const index = parties.indexOf(party);
    parties.splice(index, 1);
    return res.status(200).json({
      status: 200,
      data: [party]
    });
  }
}

export default PartyController;
