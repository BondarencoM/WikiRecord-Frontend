export const environment = {
  production: true,
  personasServiceURL: 'https://recommendation-service.azurewebsites.net/api/personas',
  recommendationServiceURL: 'https://recommendation-service.azurewebsites.net/api/recommendations',
  interestServiceURL: 'https://recommendation-service.azurewebsites.net/api/interests',
  authenticationAuthority: 'https://commendie.azurewebsites.net',
  baseHref: '/Commendie-Frontend/',


  hostsRequiringAccessToken: [
    'https://commendie.azurewebsites.net',
    'https://recommendation-service.azurewebsites.net',
  ]
};
