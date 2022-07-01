const capitalize = (value = '') =>
  typeof value === 'string' && value.length > 0
    ? value[0].toUpperCase() + value.slice(1)
    : value;

const formatOption = (type = '') => {
  const word = type.split('_').join(' ').toLowerCase();

  return capitalize(word);
};

export const TITLES = ['mr', 'mrs', 'dr', 'ms', 'miss'].map((t) => ({
  value: t.toUpperCase(),
  option: capitalize(t),
}));

export const DRIVING_LICENCES = [
  'Full UK',
  'European',
  'Provisional',
  'International',
  'None',
].map((l) => ({
  value: l.split(' ')[0].toUpperCase(),
  option: l,
}));

export const MARITAL_STATUSES = [
  'Single',
  'Married',
  'Common Law',
  'Separated',
  'Divorced',
  'Widowed',
  'Civil partnership',
  'Dissolved civil partnership',
  'Co-habiting',
].map((s) => {
  const value = s.toUpperCase().split(' ').join('_');

  return {
    value: value.includes('-') ? value.split('-').join('') : value,
    option: s,
  };
});

export const DEPENDANT_STATUSES = [
  { value: 0, option: capitalize('none') },
  { value: 1, option: capitalize('one') },
  { value: 2, option: capitalize('two') },
  { value: 3, option: capitalize('three') },
  { value: 4, option: capitalize('four') },
  { value: 5, option: capitalize('five or more') },
];

export const RESIDENTIAL_STATUSES = [
  'home owner',
  'council tenant',
  'housing association',
  'living with family',
  'private tenant',
  'student accommodation',
  'work accommodation',
  'military accommodation',
  'other',
].map((str) => ({
  value: str.toUpperCase().split(' ').join('_'),
  option: capitalize(str),
}));

export const COUNTRIES = [
  'United Kingdom',
  'Afghanistan',
  'Åland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, The Democratic Republic of The',
  'Cook Islands',
  'Costa Rica',
  "Cote D'ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands (Malvinas)',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-bissau',
  'Guyana',
  'Haiti',
  'Heard Island and Mcdonald Islands',
  'Holy See (Vatican City State)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran, Islamic Republic of',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea, Democratic People's Republic of",
  'Korea, Republic of',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libyan Arab Jamahiriya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Macedonia, The Former Yugoslav Republic of',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia, Federated States of',
  'Moldova, Republic of',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestinian Territory, Occupied',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Helena',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Pierre and Miquelon',
  'Saint Vincent and The Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and The South Sandwich Islands',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan (ROC)',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Timor-leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United States',
  'United States Minor Outlying Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Viet Nam',
  'Virgin Islands, British',
  'Virgin Islands, U.S.',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export const YEARS_AT = [
  {
    value: '0',
    option: '0 Years',
  },
  {
    value: '1',
    option: '1 Year',
  },
  {
    value: '2',
    option: '2 Years',
  },
  {
    value: '3',
    option: '3+ Years',
  },
];

export const MONTHS_AT = Array(12)
  .fill()
  .map((item, i) => ({
    option: `${i} Month${i === 1 ? '' : 's'}`,
    value: `${i}`,
  }));

export const EMPLOYED_STATUSES = [
  'FULL_TIME_PERMANENT',
  'PART_TIME_PERMANENT',
  'ARMED_SERVICES',
];

export const SELFEMPLOYED_STATUSES = ['SELF_EMPLOYED'];
export const UNEMPLOYED_STATUSES = [
  'RETIRED',
  'EDUCATION',
  'HOMEMAKER',
  'CARER',
  'BENEFITS',
  'UNEMPLOYED',
];

export const employmentStatus = {
  SELF_EMPLOYED: 'selfEmployed',
  EMPLOYED: 'employed',
  UNEMPLOYED: 'unemployed',
};

export const EMPLOYMENT_SECTORS = ['Private', 'Government', 'Military'].map(
  (item) => ({
    value: item.toUpperCase(),
    option: item,
  })
);

export const TEMPORARY_CONTRACT = 'TEMPORARY_CONTRACT';

const getEmploymentTypes = () =>
  [...EMPLOYED_STATUSES, ...SELFEMPLOYED_STATUSES, ...UNEMPLOYED_STATUSES]
    .map((type) => ({
      value: type,
      option: formatOption(type),
    }))
    .concat({
      // not default value for EMPLOYED type :/
      value: TEMPORARY_CONTRACT,
      option: 'Temporary / Contract',
    });

export const EMPLOYMENT_TYPES = getEmploymentTypes();

export const USER_ACTIVITIES = {
  CUSTOMER_CONFIGURED: 'CUSTOMER_CONFIGURED',
  FINANCE_APP_COMPLETE: 'FINANCE_APP_COMPLETE',
  CUSTOMER_SAVED: 'CUSTOMER_SAVED',
  CUSTOMER_RESERVATION: 'CUSTOMER_RESERVATION',
  CUSTOMER_HAS_QUESTION: 'CUSTOMER_HAS_QUESTION',
};

export const DEFAULT_DEPOSIT = '199.00';
