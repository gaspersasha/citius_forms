export const MILAGE_OPTIONS = [
  { value: 6000, option: '6,000 miles' },
  { value: 7000, option: '7,000 miles' },
  { value: 8000, option: '8,000 miles' },
  { value: 9000, option: '9,000 miles' },
  { value: 10000, option: '10,000 miles' },
  { value: 11000, option: '11,000 miles' },
  { value: 12000, option: '12,000 miles' },
  { value: 13000, option: '13,000 miles' },
  { value: 14000, option: '14,000 miles' },
  { value: 15000, option: '15,000 miles' },
  { value: 16000, option: '16,000 miles' },
  { value: 17000, option: '17,000 miles' },
  { value: 18000, option: '18,000 miles' },
  { value: 19000, option: '19,000 miles' },
  { value: 20000, option: '20,000 miles' },
  { value: 21000, option: '21,000 miles' },
  { value: 22000, option: '22,000 miles' },
  { value: 23000, option: '23,000 miles' },
  { value: 24000, option: '24,000 miles' },
  { value: 25000, option: '25,000 miles' },
  { value: 26000, option: '26,000 miles' },
  { value: 27000, option: '27,000 miles' },
  { value: 28000, option: '28,000 miles' },
  { value: 29000, option: '29,000 miles' },
  { value: 30000, option: '30,000 miles' },
];

export const MONTHS_OPTIONS = [
  { value: 24, option: '24 months' },
  { value: 36, option: '36 months' },
  { value: 48, option: '48 months' },
  { value: 60, option: '60 months' },
];

export const FINANCE_OPTIONS = [
  { value: 'PCP', option: 'PCP' },
  { value: 'HP', option: 'HP' },
];

export const DELIVERY_INFO = [
  {
    value: 18,
    option: 'Driven delivery within England and Wales 239.0',
  },
  {
    value: 19,
    option: 'Driven/Ferry delivery to Belfast 599.0',
  },
  {
    value: 20,
    option: 'Driven delivery to Scotland 355.0',
  },
  {
    value: 21,
    option: 'Transporter delivery within England and Wales 479.0',
  },
  {
    value: 22,
    option: 'Transporter delivery to Scotland 599.0 ',
  },
];

export const FINANCE_CREDIT_RATING_OPTIONS = [
  { value: 'excellent', option: 'Excellent' },
  { value: 'good', option: 'Good' },
  { value: 'average', option: 'Average' },
  { value: 'poor', option: 'Poor' },
];

export const FINANCE_TYPE_CONTENT = {
  PCP: {
    title: '(PCP) Personal Contract Purchase',
    subtitle:
      'You make low monthly payments. At the end you either return the cars or buy it for an additional fee, often known as a baloon payment.',
    description:
      ' Personal Contract Purchase is a finance plan that allows you to defer part of the cost of the vehicle until the end of the agreement, reducing the regular monthly payments. The deferred element known as the guaranteed future value or optional final payment is based upon the likely value of the vehicle at the end of the agreement and is set by the finance company based upon the annual mileage selected. At the end of the term, you have the option to hand the vehicle back, part-exchange it or pay to final payment to take ownership of the vehicle. If you choose to hand the vehicle back excess mileage and damage charges may apply.',
    max: 40,
  },
  HP: {
    title: '(HP) Hire Purchase',
    subtitle:
      'You pay for the car in a series of installments. At the end of the agreed repayment period, it is yours.',
    description:
      'Hire Purchase is a finance plan that allows you to pay for the vehicle by fixed monthly payments over the term of the agreement. Hire purchase is a secured loan so the finance company has the vehicle as security for the loan until all payments and fees are made, at the end of the term of the agreement after all payments and option to purchase fee are made you take full ownership of the vehicle.',
    max: 80,
  },
};

export const NEW_FINANCE_QUOTE = {
  PCP: {
    capId: '49573',
    financeType: 'PCP',
    numRegularPayments: 46,
    paymentAmount: 152.16,
    apr: 8.9,
    finalPayment: 3173.34,
    gfv: 0,
    basicPrice: 9238.8,
    rateOfInterest: 4.61,
    flatRate: 0,
    totalCashPrice: 9238.8,
    firstPayment: 152.16,
    documentationFee: 0,
    purchaseFee: 0,
    totalPayable: 11248.86,
    totalCharges: 0,
    commission: 0,
    quoteReference:
      'https://services.codeweavers.net/forms/quote/5ba82157-a463-4754-b560-7385b88dd237',
    totalDeposit: 924,
    mileagePA: 8000,
    periodMonths: 36,
    amountFinanced: 8314.8,
    financeQuoteRequestDetails: 15,
    financeKey: 'ALPHERA_PCP',
  },
  HP: {
    capId: '49573',
    financeType: 'Hire Purchase',
    numRegularPayments: 58,
    paymentAmount: 170.8,
    apr: 8.9,
    finalPayment: 170.8,
    gfv: 0,
    basicPrice: 9238.8,
    rateOfInterest: 4.65,
    flatRate: 0,
    totalCashPrice: 9238.8,
    firstPayment: 170.8,
    documentationFee: 0,
    purchaseFee: 0,
    totalPayable: 11172,
    totalCharges: 0,
    commission: 0,
    quoteReference:
      'https://services.codeweavers.net/forms/quote/a7ccf346-ef3c-471f-b718-4a9c40606a99',
    totalDeposit: 924,
    mileagePA: 8000,
    periodMonths: 36,
    amountFinanced: 8314.8,
    financeQuoteRequestDetails: 26,
    financeKey: 'ALPHERA_HP',
  },
};
