// /*
//  * accepts data with string type and returns boolean
//  * The following email validation requirements have been taken from
//  * https://help.salesforce.com/articleView?id=000321158&type=1&mode=1
//  */
// export const isValidEmail = email => {
//   if (!email || !email.length) return false;
//   if (email.indexOf('@') < 0) return false;

//   const [, domain] = email.split('@');

//   if (!domain || !domain.length) return false;

//   // manual validation for '..', cause it fails to work in Regexp in Safari and FF
//   if (domain.indexOf('..') > -1) {
//     return false;
//   }

//   // REGEXP TRANSCRIPTION
//   // LOCAL PART:
//   // ^(?!\.) => not start with dot
//   // [\w\/\-+.!#$%&'*=?^`{|}~]+ => group of chars from list, any amount

//   // DOMAIN PART:
//   // @([\w-][.]?)+ => group of chars with hyphen and  zero or one dot, any amount
//   // \.(?<!\.\.) => dot, but not two dots in a row
//   // [A-Za-z0-9]{2,20} => group of chars (min 2, max 20) for root domain

//   return /^(?!\.)[\w/\-+.!#$%&'*=?^`{|}~]+@([\w-][.]?)+\.[A-Za-z0-9]{2,20}$/.test(email);
// };

// export default function errorValidation(values) {
//   const errors = {};

//   // validate email
//   if (!isValidEmail(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   // validate password
//   if (!isValidEmail(values.password)) {
//     errors.password = 'Invalid password';
//   }

//   return errors;
// }

// /*
//  * Password validation for Profile form (Can be empty)
//  * Contain at least 8 characters
//  * contain at least 1 number
//  * contain at least 1 lowercase character (a-z)
//  * contain at least 1 uppercase character (A-Z)
//  * contains only 0-9a-zA-Z
//  */
// export const c = value => {
//   // if (typeof value === 'string') value = value.trim();
//   const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!@#%&*?£]).{8,}$/;

//   return regexp.test(value.trim());
// };
