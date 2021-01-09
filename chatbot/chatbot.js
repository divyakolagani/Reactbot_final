const dialogFlow = require('dialogflow');
const mongoose = require('mongoose');
const config = require('../config/keys');
const structJson = require('./structjson');

const sessionId = config.dialogFlowSessionId;
const { projectId } = config;
const credentials = {
  client_email: config.clientEmail,
  private_key: config.privateKey,
};
const sessionClient = new dialogFlow.SessionsClient({ projectId, credentials });

const Registration = mongoose.model('registration');

module.exports = {
  textQuery: async (text, userID, parametres = {}) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
    const self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: config.dialogFlowLanguageCode,
        },
      },
      queryParams: {
        payLoad: {
          data: parametres,
        },
      },

    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  handleAction: (responses) => {
    const self = module.exports;
    const { queryResult } = responses[0];

    switch (queryResult.action) {
      case 'RECOMMENDYES':
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
        }
        break;
    }

    return responses;
  },

  saveRegistration: async (fields) => {
    const registration = new Registration({
      name: fields.name.stringValue,
      address: fields.address.stringValue,
      phone: fields.phone.stringValue,
      email: fields.email.stringValue,
      dateSent: Date.now(),
    });
    try {
      await registration.save();
    } catch (err) {
    }
  },
  eventQuery: async (event, userID, parametres = {}) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
    const self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parametres: structJson.jsonToStructProto(parametres),
          languageCode: config.dialogFlowLanguageCode,
        },
      },
      queryParams: {
        payLoad: {
          data: parametres,
        },
      },

    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
};
