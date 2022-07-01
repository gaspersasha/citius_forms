import express from 'express'
const router = express.Router()

// reservation form
router.get('/start.jhtml', (req, res, next) => {
  if (!req.query.productAdvertId) return next('Mandatory "productAdvertId" is missing from query string')
  const result = {
    address: {
      county: "gha",
      district: "ukd",
      houseName: "kl",
      houseNumber: "45",
      postCode: "SE231AA",
      street: "34",
      town: "London",
    },
    clientId: null,
    customerQuestion: null,
    depositAmount: '199.00',
    details: {
      emailAddress: 'tes3t1213test@testddd1213test1213.com',
      // emailAddress: null,
      firstName: 'Bob',
      // firstName: null,
      lastName: 'Bruno',
      middleName: 'MidName',
      mobile: '09923423412',
      postcode: null,
      telephoneNumber: '01632960707',
      title: 'Mr',
    },
    // details: null,
    productAdvertId: req.query.productAdvertId,
    productDefinitionId: 2415055,
    quoteId: 574240,
    quoteItemId: '673215',
    step: null,
    financeApplied: true,
    paymentMethod: req.body.paymentMethod || null,
    // step: 3,
    stripePublishableKey: 'pk_live_Bw2WzVnmXx6qDFJhUP73gEI8',
    success: null,
    userId: 285410,
    vehicleDescription: null,
  }

  return res.send(result)
})

router.post('/send.jhtml', (req, res, next) => {
  // if (!req.query.productAdvertId) return next('Mandatory "productAdvertId" is missing from query string')
  const result = {
    address: {
      county: "gha",
      district: "ukd",
      houseName: "kl",
      houseNumber: "45",
      postCode: "W21JQ",
      street: "34",
      town: "London",
    },
    clientId: null,
    customerQuestion: null,
    depositAmount: '199.00',
    details: {
      emailAddress: 'yourmom@mailinator.com',
      // emailAddress: null,
      firstName: 'Ololo',
      // firstName: null,
      lastName: 'Derpington',
      middleName: 'Yas',
      mobile: '09923423412',
      postcode: null,
      telephoneNumber: '01632960707',
      title: 'MISS',
    },
    // details: null,
    financeApplied: req.body.financeApplied,
    paymentMethod: req.body.paymentMethod || null,
    productAdvertId: req.query.productAdvertId,
    productDefinitionId: 2415055,
    quoteId: req.query.quoteId || 574240,
    quoteItemId: req.query.quoteItemId || '673215',
    step: req.body.step,
    // step: 3,
    stripePublishableKey: 'pk_live_Bw2WzVnmXx6qDFJhUP73gEI8',
    success: null,
    userId: 308125,
    vehicleDescription: null,
  };

  return res.send(result)
});

router.get('/stripeSession.jhtml', (req, res) => {
  // ?quoteId=${quoteId}
  // if ()
  return res.send({ sessionId: '0123456789' });
});

export default router;
