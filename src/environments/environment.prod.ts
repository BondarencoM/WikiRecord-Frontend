export const environment = {
  production: true,
  personasServiceURL: 'https://recommendation-service.azurewebsites.net/api/personas',
  recommendationServiceURL: 'https://recommendation-service.azurewebsites.net/api/recommendations',
  profileServiceURL: 'https://wikirecord-profile-service.azurewebsites.net/api/profiles',
  interestServiceURL: 'https://recommendation-service.azurewebsites.net/api/interests',
  commentServiceURL: 'https://comment-service.azurewebsites.net/api/comments',
  authenticationAuthority: 'https://wikirecord.azurewebsites.net',
  baseHref: '/WikiRecord-Frontend/',


  hostsRequiringAccessToken: [
    'https://wikirecord.azurewebsites.net',
    'https://comment-service.azurewebsites.net',
    'https://wikirecord-profile-service.azurewebsites.net',
    'https://recommendation-service.azurewebsites.net',
  ]
};
