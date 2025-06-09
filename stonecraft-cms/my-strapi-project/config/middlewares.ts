// export default [
//   'strapi::logger',
//   'strapi::errors',
//   {
//     name: 'strapi::cors',
//     config: {
//       enabled: true,
//       origin: ['http://127.0.0.1:5500'], 
//     },
//   },
//   'strapi::security',
//     {
//     name: 'strapi::cors',
//     config: {
//       origin: ['http://127.0.0.1:5500'],
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       headers: ['Content-Type', 'Authorization'],
//     },
//   },
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];

// Default cors code

export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
