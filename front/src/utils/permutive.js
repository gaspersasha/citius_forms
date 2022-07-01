export const sendPermutiveTag = (params, details, tagName) => {
  const tag = {
    product: {
      car: {},
    },
    finance: {},
  };

  if (params) {
    tag.product.car = {
      ...params,
      price: parseFloat(params.price),
    };
  }

  if (details) {
    tag.product.car = {
      ...tag.product.car,
      ...details,
      mileage: parseInt(details.mileage, 10),
    };

    tag.finance = {
      deposit: parseFloat(details.deposit),
      term: parseInt(details.defaultFinanceTerm_I, 10),
      monthlyRepayments: parseInt(details.defaultFinanceMonthlyPayment_d, 10),
      interest: parseFloat(details.interestRate_d),
    };
  }

  !Object.keys(tag.product.car).length && delete tag.product;

  if (tag.product) {
    Object.keys(tag.product.car).forEach((key) => {
      !tag.product.car[key] && delete tag.product.car[key];
    });
  }

  !Object.keys(tag.finance).length && delete tag.finance;

  if (tag.finance) {
    Object.keys(tag.finance).forEach((key) => {
      !tag.finance[key] && delete tag.finance[key];
    });
  }

  if (window.permutive && tagName && (tag.product || tag.finance)) {
    window.permutive.track(tagName, tag);
  }
};
