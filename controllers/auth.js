const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// Authentication middleware
// This middleware will check access token in authorization headers of a request
// It will verify access token against Auth0 JSON web key set
exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://raulrosa.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://raulrosa.us.auth0.com/api/v2/',
  issuer: 'https://raulrosa.us.auth0.com/',
  algorithms: ['RS256']
})
