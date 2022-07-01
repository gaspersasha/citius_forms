import express from 'express'
const router = express.Router()

router.post('/v2/financeQuote.do', (req, res) => res.send({
  "PCP": {
      "capId": "87822",
      "financeType": "PCP",
      "numRegularPayments": 46,
      "paymentAmount": 290.32,
      "apr": 7.90,
      "finalPayment": 7527.46,
      "gfv": 0.00,
      "basicPrice": 19237.80,
      "rateOfInterest": 4.09,
      "flatRate": 0.00,
      "totalCashPrice": 19237.80,
      "firstPayment": 290.32,
      "documentationFee": 0.00,
      "purchaseFee": 0.00,
      "totalPayable": 23096.50,
      "totalCharges": 0.00,
      "commission": 0.00,
      "quoteReference": "https://services.codeweavers.net/forms/quote/4d441a8b-9ed0-488c-9b55-8415149fedf7",
      "totalDeposit": 1924.00,
      "mileagePA": 8000,
      "periodMonths": 48,
      "amountFinanced": 17313.80,
      "financeQuoteRequestDetails": 15,
      "financeKey": "ALPHERA_PCP"
  },
  "HP": {
      "capId": "87822",
      "financeType": "Hire Purchase",
      "numRegularPayments": 58,
      "paymentAmount": 348.01,
      "apr": 7.90,
      "finalPayment": 348.01,
      "gfv": 0.00,
      "basicPrice": 19237.80,
      "rateOfInterest": 4.12,
      "flatRate": 0.00,
      "totalCashPrice": 19237.80,
      "firstPayment": 348.01,
      "documentationFee": 0.00,
      "purchaseFee": 0.00,
      "totalPayable": 22804.60,
      "totalCharges": 0.00,
      "commission": 0.00,
      "quoteReference": "https://services.codeweavers.net/forms/quote/e93ba077-942a-4fc3-b7b7-696cdc722569",
      "totalDeposit": 1924.00,
      "mileagePA": 8000,
      "periodMonths": 60,
      "amountFinanced": 17313.80,
      "financeQuoteRequestDetails": 26,
      "financeKey": "ALPHERA_HP"
  }
}));


router.post('/updateFinanceTerms.json', (req, res) => res.send({ success: true }));

export default router;