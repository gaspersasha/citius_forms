export const orders = {
  myAccounts: [
    {
      accountName: 'MR Ajith Nair',
      invoices: [
        {
          documentId: '1',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
        {
          documentId: '2',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
      ],
      deposits: [
        {
          documentId: '3',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
        {
          documentId: '4',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
      ],
      otherPayments: [
        {
          documentId: '5',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
        {
          documentId: '6',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
      ],
      accountBalance: {
        type: 'DEBIT',
        amount: 1889,
      },
      vehicleOrders: [
        {
          documentId: '7',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
          vehicle: {
            vehicleId: 2898918,
            name: 'Vauxhall MOKKA 1',
            regPlate: 'DL67VFD',
            regYear: 2018,
            mileage: 34000,
            fuelType: 'Petrol',
            transmission: 'Manual',
            vehicleType: 'car',
            // eslint-disable-next-line max-len
            imageUrl:
              'https://www.racecar.com/racecarwebsite/Images/News/91908/a1.jpg?width=1200&height=800&mode=crop',
            reservationDate: 'Wed Jul 29 12:43:42 BST 2020',
            reservationAmount: 199,
          },
        },
        {
          documentId: '8',
          accountId: '42114',
          status: 'Sent to recipient - finance incomplete',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
          vehicle: {
            vehicleId: 2898918,
            name: 'Vauxhall MOKKA 2',
            regPlate: 'DL67VFD',
            regYear: 2018,
            mileage: 34000,
            fuelType: 'Petrol',
            transmission: 'Manual',
            vehicleType: 'car',
            // eslint-disable-next-line max-len
            imageUrl:
              'https://di-uploads-pod15.dealerinspire.com/capecoralchryslerdodgejeepram/uploads/2019/03/2019-dodge-challenger-srt-hellcat-redeye.jpg',
            reservationDate: 'Wed Jul 29 12:43:42 BST 2020',
            reservationAmount: 199,
          },
        },
      ],
      pendingTransactions: [
        {
          documentId: '9',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
        {
          documentId: '10',
          accountId: '42114',
          status: 'Sent to recipient',
          amount: 199,
          type: 'DEBIT',
          created: '22/05/1988',
        },
      ],
    },
  ],
};

export const details = {
  title: 'MR',
  firstName: 'first',
  lastName: 'last',
  middleName: 'mid',
  email: 'email@test.test',
  phone: '02057685678',
  alternativePhone: '02057685678',
  houseName: 'housename',
  houseNumber: '100',
  street: 'street',
  district: 'district',
  town: 'town',
  county: 'county',
  postcode: 'E11 1JD',
  company: 'company',
  maritalStatus: 'SINGLE',
  drivingLicenceType: 'FULL',
  validUKPassport: false,
  dependants: '1',
  dateOfBirth: '11/11/2000',
  subscribed: false,
};

export const contactDealer = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  postcode: '',
  message: '',
  unsubscribe: false,
};

export const contactDealerVehicle = {
  productAdvertId: 0,
  year: '',
  make: '',
  range: '',
};

/**
 * Product information
 * /adverts/<productAdvertID>.json
 */
export const productInformation = {
  active_B: true,
  CAPID: 66214,
  defaultFinanceMonthlyPayment_d: 99.8,
  dateEffectiveTo_D: null,
  imageUrls_S: [
    '/sites/buyacar/themes/buyacar/images/default_car.jpg',
    '/sites/buyacar/themes/buyacar/images/default_car.jpg',
    '/sites/buyacar/themes/buyacar/images/default_car.jpg',
    '/sites/buyacar/themes/buyacar/images/default_car.jpg',
    '/sites/buyacar/themes/buyacar/images/default_car.jpg',
  ],
  van_B: false,
  productHomeId: 90270,
  stereoConstant_S: 'very good',
  carpetsConstant_S: 'very good',
  ratingScore: 90,
  strapLine: null,
  price: 5995,
  dateEffectiveFrom_D: '2018-02-05 03:32:00',
  monthOfRegistration_I: 3,
  model: 'corsa hatchback special eds',
  exteriorColour: 'Green',
  mileage: 9192,
  prodHomeUrl_S:
    '/vauxhall_corsa_hatchback_special_eds/car_1_2_sting_3dr_90270.jhtml',
  defaultFinanceDeposit_d: 618,
  roofConstant_S: 'very good',
  companyName_S: 'Grantham',
  defaultFinanceOptionalFinalPayment_d: 2324,
  monthOfRegistration_S: 'MARCH',
  frontLightsConstant_S: 'very good',
  seatsConstant_S: 'very good',
  rearBumperConstant_S: 'very good',
  bodyStyle: 'hatchback',
  frontBumperConstant_S: 'very good',
  interestRate_d: 4,
  capImage_B: false,
  driveTrain_S: 'front wheel drive',
  defaultFinanceType_S: 'PCP',
  saving: 0,
  defaultFinanceTerm_I: 48,
  vehicleFullName_S:
    'Test car with very long name because cars have long names',
  deposit_d: 199,
  defaultFinanceAmount_d: 5555.8,
  CTrim_Code: 25577,
  defaultFinanceTotalAmount_d: 7732.4,
  rangeCategory_I: 856,
  doorMirrorsConstant_S: 'very good',
  tailgateBootlidConstant_S: 'very good',
  CRan_Code: 208,
  makeCategoryUrl_S: '/category_256.jhtml',
  siteComment_S: null,
  showNetPrice_B: false,
  defaultFinanceId_I: 5744313,
  range: 'corsa',
  derivative: '1.2 sting 3dr',
  feedSupplierName_S: 'Stoneacre',
  prodAdvertUrl_S:
    '/vauxhall_corsa_hatchback_special_eds/deal_1_2_sting_3dr_1556200.jhtml',
  interior: null,
  cashPrice_d: 6295,
  lastModified_D: 1521613733,
  vehicleDetailsDisplay_S: 'Used Car',
  ratingScoreAlternative_I: null,
  warrantyExpireDate_D: '2018-07-30 00:00:00',
  advertFinanceTypes_S: ['hire purchase', 'pcp'],
  prodAdvertId: 1556200,
  CMan_Code: 10968,
  gearbox: 'manual',
  make: 'vauxhall',
  financeDepositContribution_d: 300,
  CTrim_Name: 'Sting',
  rangeCategoryUrl_S: '/category_856.jhtml',
  windscreenConstant_S: 'very good',
  genericColour_S: 'Green',
  plusCommercialVAT_B: false,
  bonnetFrontConstant_S: 'very good',
  approvedUsed_B: false,
  fuelType: 'petrol',
  ageYears: 3,
  registrationDate_S: '2015-07-31',
  exDemo_B: false,
  numberOfSearches_I: 37,
  carDateOfReg: '2015(15)',
  rearLightsConstant_S: 'very good',
  CMod_Code: 70728,
  optionsDescription_S:
    'Multi-Function Display Panel Showing Time&#44; Date and Audio Information,Anti-lock Braking System (ABS) with Emergency Brake Assist (EBA),Heated Rear Window,Digital Clock with Automatic RDS Time Adjustment,Electrically Adjustable Door Mirrors,Immobiliser,6 Speakers,Height-Adjustable Front and Outer Rear Seat Head Restraints,Drivers Dual-Stage Airbag,ISOFIX Child Seat Restraint System for Outer Rear Seats Incorporating Top Tether,Electrically Operated Front Windows with Safety Autoreverse and One-Touch Facility,Upholstery Cloth - Spot Shimmer Black Cloth Seat Trim,Front Seatbelt Pretensioner System with Drivers and Front Passengers Seatbelt Force Limiters,Front Passengers Dual-Stage Airbag with Deactivation Switch for Front Passengers Airbag,Exterior Temperature Gauge,Steering Column Adjustable for Reach and Rake,Drink Holder in Centre Console,LED Daytime Running Lights,Tyre Pressure Monitoring System,Drivers Seat Height Adjuster,Bluetooth Connectivity,Steering Column Mounted Audio Controls,Piano Black Facia,Dipping Rear-View Mirror,Centre Rear Seat Belt,Hill Start Assist,Third Brake Light,Tinted Glass,Electronic Brakeforce Distribution (EBD) with Cornering Brake Control (CBC),Cruise Control,Power - Assisted Steering,Leather-Covered Steering Wheel,Front Seat Side-Impact Airbags and Full-Size Curtain Airbags,Traction Control,Twin Sunvisors&#44; Front Passengers with Vanity Mirror and Sliding Cover,Heated Windscreen,16in Alloy Wheels White,Electronic Stability Programme (ESP-plus),CD/MP3 CD Player with AM/FM Stereo Radio with 36 Station Presets&#44; RDS with Traffic Programme"\n. Reference number : BAC1556200',
  lowestFinancePrice_D: 99.8,
  makeCategory_I: 256,
  listPrice: 9465,
  defaultFinanceApr_d: 9.9,
  isNew_B: false,
};

/**
 * /myaccount/confirmation.json
 */
export const confirmation = {
  financeApplication: {
    dateOfLastFinanceApplication: 'Wed Jun 13 10:56:54 BST 2018',
  },
  reservationInformation: {
    paymentReferenceNumber: 'ch_1CPsTPFavS6s0pX987tUIL4S',
    depositPaid: 199,
    dateOfPayment: 'Wed Jun 13 10:56:54 BST 2018',
  },
  lastAction: 'financeApplication',
};

/**
 * /myaccount/confirmation/<productAdvertID>.json
 */
export const confirmationProductInformation = {
  ...confirmation,
  productInformation: {
    ...productInformation,
  },
};

/**
 * GET /myaccount/mycars.json
 */
export const myCars = (count = 7) => {
  const savedVehicles = [];

  // eslint-disable-next-line
  for (let i = 1; i < count + 1; i++) {
    // using i divisions to return different
    // results for each item, e.g. `i % 2` returns true for even items
    savedVehicles.push({
      productAdvertId: 166666 + i,
      productDefinitionId: 10000 + i,
      vehicleFullName_S: 'RENAULT ZOE 0.0 DYNAMIQUE NAV 5d hatchback',
      make: 'Mitsubishi',
      model: 'Outlander',
      derivative: '1.2 Pop 3dr',
      vehicleType: 'CAR',
      mileageInMiles: '2300',
      modelYear: 2016,
      imageUrls_S: '/images/default_car.jpg',
      cashPrice: 7699,
      similarCarsUrl: '/fiat/500/500-hatchback/1-2-pop-3dr-71784',
      financePrice: 7399.0,
      financeDepositContribution: 300,
      exchangeStatus: false,
      quotePrice: 7937.8,
      depositAmount: 199,
      confirmationStatus: false,
      depositPaid: false,
      sold: i % 3 === 0,
      reserved: i % 4 === 0,
      dealerFormFilled: false,
      leadgen : false,
      prodAdvertUrl_S: '/deal-3241202',
      vehicleQuotes: [
        {
          quoteId: 974707,
          quoteItemId: 1002792,
          createdDate: 'Mon Nov 09 00:00:00 GMT 2020',
          status: 'CUSTOMER_SAVED',
        },
        {
          quoteId: 974706,
          quoteItemId: 1002791,
          createdDate: 'Mon Nov 09 00:00:00 GMT 2020',
          status: 'CUSTOMER_RESERVATION',
        },
        {
          quoteId: 974674,
          quoteItemId: 1002773,
          createdDate: 'Mon Nov 09 00:00:00 GMT 2020',
          status: 'CUSTOMER_HAS_QUESTION',
        },
      ],
      userActivity: {
        FINANCE_APP_COMPLETE: 'Wed Oct 21 00:00:00 BST 2020',
        CUSTOMER_SAVED: 'Wed Oct 21 00:00:00 BST 2020',
        CUSTOMER_RESERVATION: 'Wed Oct 21 00:00:00 BST 2020',
        // eslint-disable-next-line max-len
        // CUSTOMER_CONFIGURED: 'Wed Oct 21 00:00:00 BST 2020' - also possible variant, but not in combination with others
        // CUSTOMER_HAS_QUESTION: 'Wed Oct 21 00:00:00 BST 2020' - also possible variant
      },
      financeQuote: {
        financeQuoteId: 9648602,
        priceMonthly: 144,
        priceTotal: 7637,
        financeType: 'PCP',
      },
      deliveryMethod: {
        deliveryMethodId: 18,
        description: 'Driven delivery within England and Wales',
        deliveryCost: 238.8,
      },
    });
  }

  return {
    savedVehicles,
    allVehicles: false,
  };
};

/**
 * GET /mypartex/tradeInQuotes.json
 */
export const myPartex = {
  submittedPartExVehicles: [
    {
      quoteId: 991608,
      quoteItemId: 1012905,
      productDefinitionId: 3639170,
      tcbgDetailsInGarage: {
        tcbgDetailsId: '60860',
        make: 'PEUGEOT',
        model: '208 ACTIVE',
        colour: 'BLACK',
        engine: 'Petrol',
        transmission: '5 Speed Manual Petrol',
        year: '2017',
        registration: 'YC17WEF',
        mileage: '8088',
        valuation: '6180',
        counterOffer: null,
        acceptanceStatus: false,
      },
      feedbackMessages: null,
    },
    {
      quoteId: 971862,
      quoteItemId: 1001177,
      productDefinitionId: 3637246,
      tcbgDetailsInGarage: {
        tcbgDetailsId: '59349',
        make: 'VOLKSWAGEN',
        model: 'T-ROC R-LINE TDI',
        colour: 'GREY',
        engine: 'Diesel',
        transmission: '6 Speed Manual Diesel',
        year: '2018',
        registration: 'LO68GBU',
        mileage: '33000',
        valuation: '15634',
        counterOffer: null,
        acceptanceStatus: false,
      },
      feedbackMessages: null,
    },
    {
      quoteId: 971861,
      quoteItemId: 1001176,
      productDefinitionId: 3637245,
      tcbgDetailsInGarage: {
        tcbgDetailsId: '59348',
        make: 'VOLKSWAGEN',
        model: 'T-ROC R-LINE TDI',
        colour: 'GREY',
        engine: 'Diesel',
        transmission: '6 Speed Manual Diesel',
        year: '2018',
        registration: 'LO68GBU',
        mileage: '33000',
        valuation: '15634',
        counterOffer: null,
        acceptanceStatus: false,
      },
      feedbackMessages: null,
    },
    {
      quoteId: 971860,
      quoteItemId: 1001175,
      productDefinitionId: 3637244,
      tcbgDetailsInGarage: {
        tcbgDetailsId: '59347',
        make: 'PEUGEOT',
        model: '208 ACTIVE',
        colour: 'BLACK',
        engine: 'Petrol',
        transmission: '5 Speed Manual Petrol',
        year: '2017',
        registration: 'YC17WEF',
        mileage: '27026',
        valuation: '5746',
        counterOffer: null,
        acceptanceStatus: false,
      },
      feedbackMessages: null,
    },
    {
      quoteId: 971859,
      quoteItemId: 1001174,
      productDefinitionId: 3637243,
      tcbgDetailsInGarage: {
        tcbgDetailsId: '59346',
        make: 'PEUGEOT',
        model: '208 ACTIVE',
        colour: 'BLACK',
        engine: 'Petrol',
        transmission: '5 Speed Manual Petrol',
        year: '2017',
        registration: 'YC17WEF',
        mileage: '4695',
        valuation: '6948',
        counterOffer: null,
        acceptanceStatus: false,
      },
      feedbackMessages: null,
    },
    {
      quoteId: 971820,
      quoteItemId: 1001150,
      productDefinitionId: 3637236,
      tcbgDetailsInGarage: {
        tcbgDetailsId: '59342',
        make: 'PEUGEOT',
        model: '208 ACTIVE',
        colour: 'BLACK',
        engine: 'Petrol',
        transmission: '5 Speed Manual Petrol',
        year: '2017',
        registration: 'YC17WEF',
        mileage: '27026',
        valuation: '5746',
        counterOffer: null,
        acceptanceStatus: false,
      },
      feedbackMessages: null,
    },
  ],
};
