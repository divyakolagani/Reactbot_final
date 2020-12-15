if(process.env.NODE_ENV === 'production') {
    console.log('if block')
    module.exports = require('./prod.js');
} else {
    console.log('else')
    module.exports = require('./dev.js'); } 