// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL: 'http://localhost:3000/api',
    // API_URL: 'http://qwerless-server.herokuapp.com/api',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/qwerless/image/upload',
    CLOUDINARY_UPLOAD_PRESET: 'n8cl7xab',
    CLOUDINADY_IMAGE: 'http://res.cloudinary.com/qwerless/image/upload/v1534788909/'
  };

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
