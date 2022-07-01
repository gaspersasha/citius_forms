import { CONTACTS, URL } from '~constants';

const { FACEBOOK, TWITTER, LINKEDIN, INSTAGRAM, PRIVACY, AUTOVIA_ORIGIN } = URL;

export const links = [
  { title: 'Reservation', href: '/cars' },
  { title: 'Used Cars', href: '/cars' },
  { title: 'New Cars in Stock', href: '/cars/new-cars' },
  { title: 'Vans', href: '/vans' },
  { title: 'How It Works', href: '/how-it-works' },
  { title: 'FAQ', href: '/how-it-works/faq' },
  { title: 'About Us', href: '/how-it-works/about' },
  { title: 'As seen in the press', href: '/press' },
  { title: "Buyer's Guides", href: '/buyers-guides' },
  { title: 'News', href: '/news' },
  { title: 'Advice', href: '/advice' },
  { title: 'Complaints', href: '/how-it-works/contact-us#complaints' },
  {
    title: 'Initial Disclosure Document',
    href: '/cars/1224/initial-disclosure-document',
  },
  {
    title: 'Work For Us',
    href: `${AUTOVIA_ORIGIN}/careers/search/?department=&brand=BuyaCar&location=&typeOfEmployment=`,
    target: '_blank',
  },
  { title: 'Dealer Sales', href: '/dealer-sales' },
  {
    title: 'Privacy Policy',
    href: PRIVACY,
    target: '_blank',
  },
  {
    title: 'Cookie Policy',
    href: `${AUTOVIA_ORIGIN}/cookies-policy`,
    target: '_blank',
  },
  { title: 'Sitemap', href: '/sitemap' },
];

export const footerSocials = [
  {
    title: 'facebook',
    href: FACEBOOK,
    target: '_blank',
    rel: 'noreferrer',
  },
  {
    title: 'twitter',
    href: TWITTER,
    target: '_blank',
    rel: 'noreferrer',
  },
  {
    title: 'linkedin',
    href: LINKEDIN,
    target: '_blank',
    rel: 'noreferrer',
  },
  {
    title: 'email',
    href: `mailto:${CONTACTS.EMAIL}`,
  },
  {
    title: 'instagram',
    href: INSTAGRAM,
    target: '_blank',
    rel: 'noreferrer',
  },
];
