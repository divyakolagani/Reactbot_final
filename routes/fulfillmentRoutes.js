const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');

module.exports = (app) => {
  app.post('/', async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    const Demand = mongoose.model('demand');
    const Coupon = mongoose.model('Coupons');
    function fallback() {
      agent.add('I didnt understand');
      agent.add('sorry!! I didnt understand');
    }

    function snoopy() {
      agent.add('Welcome to my snoopy fullfillment');
    }

    async function saveDemand() {
      const demandLocation = new Demand({ location: agent.parameters['geo-state'] });
      await demandLocation.save();
    }

    async function demand() {
      Demand.findOne({ location: agent.parameters['geo-state'] }, (err, location) => {
        if (location !== null) {
          location.counter++;
          location.save();
        } else {
          saveDemand(agent);
        }
      });
      const coupon = await Coupon.findOne({ location: agent.parameters['geo-state'] });
      if (coupon !== null) {
        agent.add(`You are planning to visit ${agent.parameters['geo-state']}.Here is the link to all the tour packages available: ${coupon.link};`);
      } else {
        agent.add(`You are planning to visit ${agent.parameters['geo-state']}.Here is the link https: //go checkgoogle .com`);
      }
    }

    const intentMap = new Map();

    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('snoopy', snoopy);
    intentMap.set('get tour packages', demand);
    agent.handleRequest(intentMap);
  });
};
