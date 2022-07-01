import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { InputText, Button } from '~components';
import { INPUT_STATUS } from '~constants';
import { endpointFetch, regexpPostCode } from '~utils';
import s from './styles/postcode.module.sass';

export function normalizeAddress(value) {
  const isNumeric = (number) => number.match(/^\d*$/);
  const [add0, add1, add2, add3, district, town, county] = value;
  let houseName = '';
  let houseNumber = '';
  let street = '';

  if (add3) {
    street = add3;
    houseName = [add0, add1, add2].join(', ');
  } else if (add2) {
    street = add2;
    houseName = [add0, add1].join(', ');
  } else if (add1) {
    street = add1;
    houseName = add0;
  } else if (add0) {
    // if only one postcode item, is it street or houseName.
    // We chose by houseNumber being present
    if (isNumeric(add0.charAt(0))) {
      street = add0;
    } else {
      houseName = add0;
    }
  }

  const index = street.indexOf(' ');
  const tempHouseNumber = street.substring(0, index).trim();
  const tempStreet = street.substring(index).trim();

  if (isNumeric(tempHouseNumber.charAt(0))) {
    street = tempStreet;
    houseNumber = tempHouseNumber;
  }

  return {
    houseName,
    houseNumber,
    district,
    town,
    street,
    county,
  };
}

const InputPostcode = ({
  status,
  name,
  required,
  value,
  onChange,
  className,
  ...rest
}) => {
  const [addresses, setAddresses] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const handleAddressClick = (address) => {
    onChange({
      target: {
        name,
        value: normalizeAddress(address),
      },
    });

    setAddresses([]);
  };

  const handleChange = (e) => {
    setIsValid(true);
    setAddresses([]);
    onChange(e);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const trimmedValue = e.target.value.trim();

    if (trimmedValue === '') {
      setIsValid(true);
    } else {
      setIsValid(regexpPostCode.test(trimmedValue));
    }
  };

  const findAddress = (e) => {
    e.preventDefault();

    if (regexpPostCode.test(value)) {
      setIsValid(true);

      endpointFetch('findUKAddressByPostcode', { postcode: value }, {}, false)
        .then((elem) => {
          setAddresses(
            elem.Addresses.map((string) => string.split(',')).map((v) =>
              v.map((str) => str.trim())
            )
          );
        })
        .catch((error) => console.warn(error)); // bad
    } else {
      setIsValid(false);
    }
  };

  const renderDropdown = addresses.map((addr, i) => (
    // eslint-disable-next-line
    <li key={`${i + addr[0]}`} onClick={() => handleAddressClick(addr)}>
      {addr.filter((str) => !!str && str !== ' ').join(', ')}
    </li>
  ));

  return (
    <div className={s.postcode}>
      <InputText
        status={!isValid ? INPUT_STATUS.INVALID : status}
        label="Postcode"
        required={required || false}
        name={name}
        placeholder="Enter Postcode"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        customClasses={s.noMargin}
        className={cn(s.input, className)}
        {...rest}
      >
        <Button
          disabled={!value}
          className={s.btn}
          onClick={findAddress}
          styleType="secondary"
        >
          Find Address
        </Button>
      </InputText>
      {!!addresses.length && (
        <ul data-id="postcode-addresses" className={s.list}>
          {renderDropdown}
        </ul>
      )}
      {!isValid && (
        <p className="error-msg" data-id="with-error">
          *Please type correct UK postal code
        </p>
      )}
    </div>
  );
};

InputPostcode.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  status: PropTypes.string,
  value: PropTypes.any,
  required: PropTypes.bool,
  name: PropTypes.string,
};

InputPostcode.defaultProps = {
  className: '',
  status: '',
  value: '',
  required: false,
  name: 'InputPostcode',
};

export default InputPostcode;
