import {
  isSafari,
  isAndroid,
  isIOS,
  isTablet,
  isMobile,
} from 'react-device-detect';

export const scrollTo = (checkMark) => {
  const $scrollTo = document.querySelector(checkMark);

  if (!$scrollTo) {
    return;
  }

  // TODO: It doesn't work on all browsers
  isAndroid
    ? $scrollTo.scrollIntoView()
    : $scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * This function helps us to scroll to the invalid element on our form. Looking for error class
 * */
export const scrollViewFunction = (usedInContainer) => {
  if (usedInContainer) {
    // condition to scroll to active form in container
    const scrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'start',
    };
    const titleHeight = 65;
    const headersArray = document.querySelectorAll('.finance-form-header');
    const unCollapsedHeaders = [];

    for (let i = 0; i < headersArray.length; i += 1) {
      if (!headersArray[i].classList.contains('collapsed')) {
        unCollapsedHeaders.push(headersArray[i]);
      }
    }

    setTimeout(() => {
      const element = unCollapsedHeaders[unCollapsedHeaders.length - 1];
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;

      if (element) {
        window.scrollTo({
          top: elementTop - titleHeight,
          behavior: 'smooth',
        });
      } else {
        document
          .getElementsByClassName('container-steps')[0]
          .scrollIntoView(scrollIntoViewOptions);
      }
    }, 3);
  } else {
    const scrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'center',
    };
    const errorClass = ' error-form-border'; // here should be an empty space at the beginning of class` name! Since this class concats automatically to existing string
    const errorArray = document.getElementsByClassName('error-form-border');

    if (errorArray.length) {
      setTimeout(() => {
        const element = document.getElementsByClassName(errorClass)[0];

        element.scrollIntoView(scrollIntoViewOptions);
      }, 3);
    }
  }
};

export const getGaClientId = () => {
  const trackers =
    typeof window.ga !== 'undefined' && window.ga.getAll
      ? window.ga.getAll()
      : [];
  const expTracker = trackers.find(
    (tracker) => tracker.get('trackingId') === 'UA-543129-1'
  );

  return expTracker && expTracker.get('clientId')
    ? expTracker.get('clientId')
    : null;
};

export const formatDataFromLoqate = ({
  City = '',
  District = '',
  PostalCode = '',
  Street = '',
  BuildingNumber = '',
  SubBuilding = '',
  BuildingName = '',
}) => {
  const town = City || '[no town entered from Loqate]';
  const street = Street || '[no street entered from Loqate]';
  const houseName = SubBuilding
    ? `${SubBuilding}, ${BuildingName}`
    : BuildingName;

  return {
    district: District,
    postCode: PostalCode,
    houseNumber: BuildingNumber,
    town,
    street,
    houseName,
  };
};

/**
 * Leave this function, since errors, regarding the following chars, could possible occur in Safari
 * The following charCodes mean: 101 = "e"; 43 = "+"; 69 = "E"
 * */
export const preventSymbols = (event) => {
  if (event.charCode === 101 || event.charCode === 43 || event.charCode === 69)
    event.preventDefault();
};

export const formatPreselectPhone = (value = '') => {
  if (isSafari && value.length >= 10 && value[0] !== '0') {
    return `0${value}`;
  }

  if (value.length > 10 && value[0] === '+') {
    return value.replace('+44', '0');
  }

  return value;
};

export function fillProgress(formsProgress = []) {
  const [max, current] = formsProgress.reduce(
    ([tempMax, passed], [more, next]) => [tempMax + more, passed + next],
    [0, 0]
  );

  let progress = Math.round((current * 100) / max);

  if (progress > 100) progress = 100;
  if (progress < 0) progress = 0;

  return progress;
}

export function getSumYearsByParam(arr = [], monthParam, yearParam) {
  let sumMonth = 0;

  arr.forEach((el) => {
    if (el[monthParam]) {
      sumMonth += +el[monthParam];
    }

    if (el[yearParam]) {
      sumMonth += +el[yearParam] * 12;
    }
  });

  return (sumMonth / 12).toFixed(2);
}

export function findMaxSteps(state) {
  return (
    Object.keys(state)
      .filter((key) => state[key] && state[key].step)
      .map((key) => state[key].step)
      .reduce((max, next) => {
        if (next > max) return next;

        return max;
      }, 0) + 1
  ); // since we have 0 as a step
}

export function getUserDeviceName() {
  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';

  return 'desktop';
}

export function getUserDevicePlatform() {
  if (isAndroid) return 'android';
  if (isIOS) return 'ios';

  return 'other';
}

export const cutUrlFromParams = (url) => {
  if (typeof url === 'string') {
    const startOfParams = url.indexOf('?');

    return startOfParams >= 0 ? url.substring(0, startOfParams) : url;
  }

  return '';
};

export function makeMinTwoDigits(value = '') {
  return value && parseInt(value, 10) > 0
    ? String(value).padStart(2, '0')
    : value;
}

// differences in year fields from month - last label of options needs a '+' sign
export function makeYearOptions(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((item, i, arr) => {
      const value = `${start + i}`;
      const extra = i === arr.length - 1 ? '+' : '';
      const option = `${value}${extra} Year(s)`;

      return {
        option,
        value,
      };
    });
}
