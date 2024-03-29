// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  personasServiceURL: 'https://localhost:5002/api/personas',
  recommendationServiceURL: 'https://localhost:5002/api/recommendations',
  profileServiceURL: 'https://localhost:5001/api/profiles',
  interestServiceURL: 'https://localhost:5002/api/interests',
  commentServiceURL: 'https://localhost:5003/api/comments',
  authenticationAuthority: 'https://localhost:5000',
  baseHref: '/WikiRecord-Frontend/',

  hostsRequiringAccessToken: [
    'https://localhost:5001',
    'https://localhost:5002',
    'https://localhost:5003',
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
