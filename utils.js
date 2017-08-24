/**
 * RESTful web server with cache - common utils functions file
 * @author: Christian Palazzo
 * @date: 23, Aug 2017
 */


let createRandomString = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

/**
 * exports
 */

module.exports.createRandomString = createRandomString;