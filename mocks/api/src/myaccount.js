import express from "express";
const router = express.Router();

import { confirmation, productInformation } from "./const";

router.get("/confirmation/:id", (req, res) => {
  const result = {
    ...confirmation,
    productInformation,
  };

  return res.send(result);
});

router.get("/confirmation.json", (req, res) => {
  const result = {
    ...confirmation,
  };
  return res.send(result);
});

router.get("/mycars.json", (req, res) => {
  const savedVehicles = [];
  const limit = 7;

  for (var i = 1; i < limit + 1; i++) {
    // using i divisions to return different results for each item, e.g. `i % 2` returns true for even items
    savedVehicles.push({
      productAdvertId: 166666 + Math.random(),
      productDefinitionId: 10000 + i,
      vehicleFullName_S:
        "RENAULT ZOE 0.0 DYNAMIQUE NAV 5d 92 BHP FULL ELECTRIC ZERO EMI  hatchback",
      make: "Mitsubishi",
      model: "Outlander",
      derivative: "1.2 Pop 3dr",
      vehicleType: "CAR",
      mileageInMiles: "2300",
      modelYear: 2016,
      imageUrls_S: "/images/default_car.jpg",
      cashPrice: 7699,
      similarCarsUrl: "/fiat/500/500-hatchback/1-2-pop-3dr-71784",
      financePrice: 7399.0,
      financeDepositContribution: 300,
      exchangeStatus: false,
      quotePrice: 7937.8,
      depositAmount: 199,
      confirmationStatus: false,
      depositPaid: false,
      sold: i % 3 === 0,
      reserved: i % 4 === 0,
      prodAdvertUrl_S: "/deal-3241202",
      vehicleQuotes: [
        {
          quoteId: 974707,
          quoteItemId: 1002792,
          createdDate: "Mon Nov 09 00:00:00 GMT 2020",
          status: "CUSTOMER_SAVED",
        },
        {
          quoteId: 974706,
          quoteItemId: 1002791,
          createdDate: "Mon Nov 09 00:00:00 GMT 2020",
          status: "CUSTOMER_RESERVATION",
        },
        {
          quoteId: 974674,
          quoteItemId: 1002773,
          createdDate: "Mon Nov 09 00:00:00 GMT 2020",
          status: "CUSTOMER_HAS_QUESTION",
        },
      ],
      userActivity: {
        FINANCE_APP_COMPLETE: "Wed Oct 21 00:00:00 BST 2020",
        CUSTOMER_SAVED: "Wed Oct 21 00:00:00 BST 2020",
        CUSTOMER_RESERVATION: "Wed Oct 21 00:00:00 BST 2020",
        // 'CUSTOMER_CONFIGURED': "Wed Oct 21 00:00:00 BST 2020" // - also possible variant, but not in combination with others
        // 'CUSTOMER_HAS_QUESTION': "Wed Oct 21 00:00:00 BST 2020" // - also possible variant
      },
      financeQuote: {
        priceMonthly: 144,
        priceTotal: 7637,
        financeQuoteId: 9648602,
        financeType: "PCP",
      },
      deliveryMethod: {
        deliveryMethodId: 18,
        description: "Driven delivery within England and Wales",
        deliveryCost: 238.8,
      },
    });
  }

  return res.send({
    savedVehicles,
    allVehicles: false,
  });
});

router.get("/quoteDetails/:productAdvertId.json", (req, res) =>
  res.send({
    quoteDetails: {
      step: "order",
      subStep: "secure-vehicle",
      vehicle: {
        advertId: 3332415,
        make: "hyundai",
        model: "IONIQ",
        range: "ioniq",
        trimName: "Premium SE",
        bodyStyle: "hatchback",
        fuelType: "petrol/electric hybrid",
        mileage: 100,
        registrationDate: "2017-09-01",
        year: 2017,
        vehicleFullName: "HYUNDAI IONIQ PREMIUM SE 5 door hatchback",
        cashPrice: 24999,
        financePrice: 24699,
        financeDepositContribution: 300,
        van: false,
        showNetPrice: false,
        firstImageUrl: "/images/default_car.jpg",
        similarCarsUrl:
          "/volkswagen_tiguan_diesel_estate/car_2_0_tdi_150_4motion_match_5dr_dsg_196646.jhtml",
        advertUrl: "/deal-1569916",
        options:
          "Leather Upholstery, Anti Lock Brakes, Driver Airbag, Electronic Stability Programme (ESP), Air Conditioning, Climate Control, Keyless Central Locking, Alloy Wheels, Power Assisted Steering (PAS), Front & Rear Electric Windows, Adaptive Cruise Control, Bluetooth Preparation (Phone), Electric Seat Adjustment, Heated Front Seats, Heated Rear Seats, Front Parking Sensor, Rain Sensitive Wipers, Front Fog Lights, Auto On Headlights, USB and AUX, Lumbar Support, Rear View Auto Dimming Mirror, Split Rear Seats, Leather Steering Wheel, 12v Socket, Cupholders, Solid Paint, Front Armrest, Reference number : BAC1569916, Engine size : 1.6, Four wheel drive : false.",
      },
      customerFinanceTerms: {
        lender: "ALPHERA",
        financeType: "PCP",
        financeQuoteId: 3735215,
        annualMileage: 8000,
        contractLength: 48,
        depositAmount: 1002,
        finalPayment: 3373.93,
        apr: 8.9,
        rateOfInterest: 4.61,
        totalPayable: 12187.8,
        amountFinanced: 9016.8,
        monthlyPayment: 166.21,
        basicPrice: 10018.8,
      },
      lenderFinanceTerms: {
        lender: "ALPHERA",
        financeType: "PCP",
        annualMileage: 10000,
        contractLength: 48,
        depositAmount: 1000,
        finalPayment: 1234,
        apr: 9.9,
        rateOfInterest: 4.61,
        totalPayable: 12187.8,
        amountFinanced: 9016.8,
        monthlyPayment: 167.88,
        basicPrice: 10018.8,
      },
      quote: {
        quoteId: 987367,
        quoteItemId: 1010427,
        productDefinitionId: 3595188,
        quotePrice: 25237.8,
        depositAmount: 199,
        sold: false,
        createdDate: "Tue Apr 13 00:00:00 BST 2021",
        status: "Reservation",
        paymentMethod: "cash",
      },
      partex: [
        {
          manufacturer: "BMW",
          model: "640I M SPORT AUTO",
          body: "Coupe",
          colour: "GREY",
          engineSize: "2979",
          fuel: "Petrol",
          transmission: "6 Speed Auto Petrol",
          year: 2015,
          registration: "WR65XOD",
          mileage: 36000,
          valuation: 15807,
          createdDate: "Tue Apr 13 02:03:04 BST 2021",
          customerStatus: "Customer accepted offer",
          buyacarStatus: "Urgent",
          tcbgStatus: "Collection Agreed",
          addedToQuote: true,
        },
        {
          manufacturer: "RENAULT",
          model: "CLIO DYNAMIQUE NAV TCE",
          body: "Hatchback",
          colour: "RED",
          engineSize: "898",
          fuel: "Petrol",
          transmission: "5 Speed Manual Petrol",
          year: 2018,
          registration: "LV67XOR",
          mileage: 23000,
          valuation: 6090,
          createdDate: "Tue Apr 13 10:20:30 BST 2021",
          customerStatus: "Customer accepted offer",
          buyacarStatus: "Urgent",
          tcbgStatus: "Collection Agreed",
          addedToQuote: false,
        },
      ],
      financeApplication: {
        financeApplied: true,
        financeAppliedDate: "Tue Apr 13 13:33:50 BST 2021",
        status: "in progress",
        lender: "Alphera",
        approved: false,
        sccCompleted: true,
      },
      softCreditSearch: {
        band: "B",
        message:
          "You have an good credit profile and are likely to be accepted",
        name: "Good",
        score: 420,
      },
      reservation: {
        paymentReferenceNumber: "ch_1IflQzFavS6s0pX9q292m4lZ",
        depositPaid: 199,
        dateOfPayment: "Tue Apr 13 13:33:50 BST 2021",
      },
      order: {
        orderId: 123456,
        accountId: 424424,
        status: "Sent to recipient",
        buyingStatus: "check availability",
        signed: false,
        signedDate: null,
      },
      verification: {
        status: "sent to customer",
        completed: false,
        completedDate: null,
      },
      delivery: {
        deliveryMethodId: 18,
        description: "Driven delivery within England and Wales",
        deliveryCost: 238.8,
        status: "delivery booked",
        bookedDate: "Tue Sep 16 13:33:50 BST 2021",
        actualDate: null,
      },
    },
  })
);

router.post("/contactdealer/:productAdvertId.json", (req, res) =>
  res.send({
    status: "SUCCESS",
    message: "Contact Dealer form data passed successfully",
    quoteId: 816801,
    quoteItemId: 880801,
    productAdvertId: 3018183,
  })
);

export default router;
