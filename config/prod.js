module.exports = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  dialogFlowSessionId: process.env.DIALOGFLOW_SESSION_ID,
  dialogFlowLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  privateKey: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
  mongoURI: process.env.MONGO_URI,
};
