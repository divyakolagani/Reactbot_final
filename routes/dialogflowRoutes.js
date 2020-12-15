const chatbot = require('../chatbot/chatbot');
module.exports = app => {
    
app.get('/',(req,res) => {
    res.send({'Hello': 'I am Divya Kolagani'});
});

app.post('/api/df_text_query',async (req,res) => {
    
   const responses = await chatbot.textQuery(req.body.text, req.body.parametres); 
    res.send(responses[0].queryResult);
});

app.post('/api/df_event_query',async (req,res) => {
    const responses = await chatbot.eventQuery(req.body.event, req.body.parametres); 
    res.send(responses[0].queryResult);
});

}
