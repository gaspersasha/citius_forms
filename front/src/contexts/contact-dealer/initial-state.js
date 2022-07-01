export default {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
    unsubscribe: false,
  },
  vehicle: {
    productAdvertId: 0,
    year: '',
    make: '',
    range: '',
  },
  apiError: {
    status: false,
    message: '',
  },
  quote: {
    quoteId: 0,
    quoteItemId: 0,
    productAdvertId: 0,
  },
  isLoadingPost: false,
  isLoadingGet: false,
  posted: false,
};
