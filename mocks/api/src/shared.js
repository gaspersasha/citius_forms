import express from 'express'
const router = express.Router()

// login
// toggle these lines if you need to test login/sign-up modals
// router.post('/login.do', (req, res) => res.send('userDetails({"user": {"email":"tes3t1213test@testddd1213test1213.com","postcode":"SE231AA","title":"MR","firstName":"Bob","lastName":"Bruno","middleName":"MidName","id":285410,"houseName":null,"houseNumber":null,"street":null,"district":null,"town":null,"county":null,"fax":null,"mobile":null,"company":null,"dob":null,"maritalStatus":"common law","drivingLicenceType":null,"validUKPassport":false,"dependants":null,"clientId":"aff206be-878c-4e6d-a01f-405157069bd4","phone":null,"day":null,"month":null,"year":null, "dateOfBirth": "14/12/1985", "sccCompleted": true, "currentIncome": "123212"}});'))
router.post('/login.do', (req, res) => res.send('userDetails({"error": "Invalid login"});'));

// registration
router.post('/registerNewUser.do', (req, res) => res.send({ status: 'success' }));

router.get('/captcha/siteKey.do', (req, res) => res.send({ siteKey: "6LfHzPYUAAAAANTcsAxTQrmNH7DJLosXH4Q2DU0q" }));

router.get('/paypal/paypalClientId.json', (req, res) => {
  return res.send({ clientId: "AV2b_oShAaev8MMiG7QYopt9Qt_XZUa5jgUTFiHzuENYzw_cH-pQJ_KFXrKfqKQFJHOF3dOhSbjmfFzk", });
});

// post code
router.get('/getaddress', (req, res) => {
  const result = {
    "Latitude": 51.272991,
    "Longitude": 0.531832,
    "Addresses": [
      "25-27 Southwick Street, , , , , London, ",
      "29-31 Southwick Street, , , , , London, ",
      "30 Southwick Street, , , , , London, ",
      "31a Southwick Street, , , , , London, ",
      "33 Southwick Street, , , , , London, ",
      "33a Southwick Street, , , , , London, ",
      "35 Southwick Street, , , , , London, ",
      "35a Southwick Street, , , , , London, ",
      "37a Southwick Street, , , , , London, ",
      "38 Southwick Street, , , , , London, ",
      "38a Southwick Street, , , , , London, ",
      "40 Southwick Street, , , , , London, ",
      "40a Southwick Street, , , , , London, ",
      "42 Southwick Street, , , , , London, ",
      "Basement 37b, Southwick Street, , , , London, ",
      "Delidrow Estate Agent, 37 Southwick Street, , , , London, ",
      "Flat, 37 Southwick Street, , , , London, ",
      "Flat 1-4, 36 Southwick Street, , , , London, ",
      "Pak Awie, 36 Southwick Street, , , , London, ",
      "The Monkey Puzzle, 30 Southwick Street, , , , London, Greater London"
    ]
  }
  return res.send(result)
});


router.get('/user.json', (req, res) => res.send({
  title: "MR",
  firstName: "Ajith",
  lastName: "Nair",
  middleName: "K N",
  email: "Ajith_Nair@dennis.co.uk",
  phone: "0123456789",
  alternativePhone: "0123456789",
  houseName: "Flat 405 Roehampton house",
  houseNumber: "39",
  street: "Academy way",
  district: "",
  town: "",
  county: "Essex",
  postcode: "RM82FJ",
  company: "Autovia",
  maritalStatus: "COMMON_LAW",
  drivingLicenceType: "FULL",
  validUKPassport: false,
  ukResident: true,
  dependants: '3',
  residentialStatus: "HOME OWNER",
  clientId: null,
  currentIncome: 12345,
  creditScore: null,
  dateOfBirth: "13/11/1994",
  unsubscribeToken: "7b9b774a-57c3-11e8-bfc0-02da326b6ac2",
  subscribed: false,
}));

// car info
router.get(`/cardetails/:productAdvertId+.do`, (req, res) => {
  return res.send({
    id: "bac-2191298",
    name: "Audi TT Coupe",
    category: "Coupe",
    brand: "Audi",
    price: 20295,
    firstImageUrl: "/img/med/volkswagen_tiguan_2_0_tdi_150_4motion_match_5dr_dsg_estate_41458227.jpg",
    variant: "Audi TT 1.8 T FSI Sport (180 PS) Coupe"
  })
});

export default router;
