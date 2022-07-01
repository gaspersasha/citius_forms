import express from "express"
const router = express.Router()

router.get("/start.jhtml", (req, res, next) => {
  const result = {
    addresses: null,
    applicationReference: null,
    bankDetails: null,
    clientId: "1574542788.1581425807",
    complete: false,
    completedAction: null,
    creditScore: null,
    deliveryMethodId: null,
    details: null,
    device: "desktop",
    employments: null,
    errors: null,
    financeProvider: null,
    financeQuoteId: null,
    form: "autoconvert",
    platform: "other",
    productAdvertId: null,
    productDefinitionId: null,
    proposalId: null,
    quoteId: 973291,
    quoteItemId: 1001981,
    readyForCreditSearch: false,
    referrer: "https://buyacar.test2.didev.co.uk/gofinance",
    refinancing: false,
    sendToLenderConsent: false,
    step: 1,
    success: false,
    termsAccepted: null,
    leadgen: true,
    unsubscribe: false,
    userId: 448749,
  }

  return res.send(result)
})

router.post("/send.jhtml", (req, res, next) => {
  // if (!req.query.productAdvertId) return next('Mandatory "productAdvertId" is missing from query string')
  const result = {
    addresses: null,
    applicationReference: null,
    bankDetails: null,
    clientId: "1574542788.1581425807",
    complete: false,
    completedAction: null,
    creditScore: null,
    deliveryMethodId: null,
    details: {
      day: "12",
      dependants: 0,
      drivingLicenceType: "FULL",
      emailAddress: "jkhghjhg@asdasd.com",
      firstName: "asd",
      lastName: "asd",
      maritalStatus: "SINGLE",
      middleName: "dsa",
      mobile: "",
      month: "12",
      telephoneNumber: "0123456789",
      title: "MR",
      validUKPassport: true,
      year: "1978",
    },
    device: "desktop",
    employments: null,
    errors: null,
    financeProvider: null,
    financeQuoteId: null,
    form: "autoconvert",
    platform: "other",
    productAdvertId: null,
    productDefinitionId: null,
    proposalId: null,
    quoteId: 973291,
    quoteItemId: 1001981,
    readyForCreditSearch: false,
    referrer: "https://buyacar.test2.didev.co.uk/gofinance",
    refinancing: false,
    sendToLenderConsent: false,
    step: 1,
    success: false,
    termsAccepted: null,
    unsubscribe: false,
    leadgen: true,
    userId: 448749,
  }

  return res.send(result)
})

router.post("/softCreditCheck.jhtml", (req, res) => {
  return res.send({
    addresses: [
      {
        county: null,
        district: null,
        houseName: "Affec TV Ltd",
        houseNumber: "33-34",
        postCode: "WC1E7DP",
        residenceMonths: null,
        residenceYears: null,
        residentialStatus: null,
        street: "Alfred Place",
        town: "London",
      },
    ],
    applicationReference: "e23169c7-57c2-4202-862a-24e4049ca76d",
    // "bankDetails": null,
    clientId: "479187040.1611245623",
    // "complete": false,
    // "completedAction": null,
    // "creditScore": null,
    creditSearch: {
      band: "B",
      message: "You have an good credit profile and are likely to be accepted",
      name: "Good",
      score: 420,
    },
    // "deliveryMethodId": null,
    details: {
      annualIncome: null,
      countryOfBirth: null,
      day: "22",
      dependants: null,
      drivingLicenceType: null,
      emailAddress: "AppKal571@actestting.co.uk",
      firstName: "App",
      lastName: "Kal",
      maritalStatus: null,
      middleName: "Lol",
      mobile: "0123456789",
      month: "01",
      telephoneNumber: "0123456789",
      title: "MR",
      validUKPassport: null,
      year: "1986",
    },
    device: "desktop",
    // "employments": null,
    // "errors": null,
    // "financeProvider": null,
    // "financeQuoteId": null,
    form: "soft-credit-check",
    platform: "next.js",
    productAdvertId: 3362295,
    // "productDefinitionId": null,
    // "proposalId": null,
    quoteId: 816442,
    quoteItemId: 891481,
    readyForCreditSearch: false,
    referrer:
      "https://buyacar.ci.didev.co.uk/seat/leon/leon-hatchback/2-0-tdi-150-fr-sport-ez-5dr-85105/deal-3362295",
    // "refinancing": false,
    // "sendToLenderConsent": false,
    softCreditCheck: true,
    // "step": null,
    // "success": false,
    // "termsAccepted": null,
    unsubscribe: false,
    userId: 608790,
  })
})

export default router
