export const pages = [
  {
    path: '/cars',
    name: 'Cars',
    withSubheader: true,
    subAlign: 'start',
    subpaths: [
      ['/cars', 'Used Cars'],
      ['/cars/new-cars', 'New Cars in Stock'],
      ['/part-ex', 'Sell my car'],
    ],
  },
  { path: '/goreserve', name: 'Reservation From' },
  { path: '/part-ex', name: 'Part Ex Form' },
  { path: '/motoring-services', name: 'Motoring Services' },
  {
    path: '/how-it-works',
    name: 'How It Works',
    withSubheader: false,
    subAlign: '',
    subpaths: [
      ['/how-it-works', 'Used Cars'],
      ['/how-it-works/finance-options', 'Finance Options'],
      ['/how-it-works/warranty-insurance', 'Warranty & Insurance'],
      ['/how-it-works/part-exchange', 'Part Exchange'],
      ['/how-it-works/cancellation-returns', 'Cancellations & Returns'],
      ['/how-it-works/faq', 'FAQ'],
      ['/how-it-works/about', 'About Us'],
      ['/how-it-works/contact-us', 'Contact us'],
    ],
  },
];

export const accountPage = {
  path: '/account',
  name: 'My Account',
  withSubheader: true,
  subAlign: 'end',
  subpaths: [
    ['/account/my-cars', 'My Cars'],
    ['/account/details', 'My Details'],
    ['/account/orders', 'My Orders'],
    ['/account/part-exchange', 'My Part-exchange'],
  ],
};
