import {Router} from 'express';
import {apiStatus} from '../../../lib/util';
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config }) => {
  let api = Router();
  api.post('/label/list', (req, res) => {
    const client = Magento2Client(config.magento2.api);

    client.addMethods('sendLabels', (restClient) => {
      let module = {};

      module.formData = function (data) {
        return restClient.post('/amasty_labels/labels', data);
      }
      return module;
    })
    client.sendLabels.formData(req.body).then((result) => {
      apiStatus(res, result, 200); // just dump it to the browser, result = JSON object
    }).catch(err => {
      apiStatus(res, err, 500);
    });
  });
  return api;
};
