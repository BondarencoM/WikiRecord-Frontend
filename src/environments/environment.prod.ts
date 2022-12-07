export const environment = {
  production: true,
  personasServiceURL: 'https://recommendation-service.azurewebsites.net/api/personas',
  recommendationServiceURL: 'https://recommendation-service.azurewebsites.net/api/recommendations',
  interestServiceURL: 'https://recommendation-service.azurewebsites.net/api/interests',
  commentServiceURL: 'https://comment-service.azurewebsites.net/api/comments',
  authenticationAuthority: 'https://wikirecord.azurewebsites.net',
  baseHref: '/WikiRecord-Frontend/',


  hostsRequiringAccessToken: [
    'https://commendie.azurewebsites.net',
    'https://recommendation-service.azurewebsites.net',
  ]
};
