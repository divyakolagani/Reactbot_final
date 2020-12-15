'use strict'
  const dialogFlow = require('dialogflow');
    const config = require('../config/keys');
    const structJson = require('./structjson');
    const projectId = config.projectId;
    const credentials = {
      client_email: config.clientEmail,
      private_key: config.privateKey
    }
    const sessionClient = new dialogFlow.SessionsClient({projectId, credentials});
    const sessionPath = sessionClient.sessionPath(projectId, config.dialogFlowLanguageCode)

module.exports = {
    textQuery: async (text,parametres = {}) => {
      let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                text: text,
                languageCode: config.dialogFlowLanguageCode,
              },
            },
            queryParams: {
              payLoad: {
                data: parametres
              }
            }
            
          };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    handleAction: (responses) => {
      return responses;
   }, 
   eventQuery: async(event, parametres = {}) => {
    let self = module.exports;
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
              data: parametres
            }
          }
          
        };
      let responses = await sessionClient.detectIntent(request);
     responses = await self.handleAction(responses);
      return responses;
  } 
}