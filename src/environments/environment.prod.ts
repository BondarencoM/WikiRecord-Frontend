export const environment = {
  production: true,
  personasServiceURL: 'https://localhost:5002/api/personas',
  recommendationServiceURL: 'https://localhost:5002/api/recommendations',
  interestServiceURL: 'https://localhost:5002/api/interests',
  authenticationAuthority: 'https://localhost:5000',

  hostsRequiringAccessToken: [
    'https://localhost:5001',
    'https://localhost:5002',
  ]
};
