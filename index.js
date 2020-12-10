const express = require('express');
const app = express();

app.get('/',(req,res) => {
    console.log('request sent');
    res.send({'Hello': 'There'});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);