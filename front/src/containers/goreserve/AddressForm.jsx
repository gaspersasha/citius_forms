import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoqateAddress } from '~containers';
import { Button } from '~components';
import { INPUT_STATUS, VALIDATION_TYPES } from '~constants';
import { validate, prepare, simplify, isValid } from '~utils';
import s from './styles/details.module.sass';

class AddressForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    postCode: PropTypes.string,
    houseName: PropTypes.string,
    houseNumber: PropTypes.string,
    street: PropTypes.string,
    town: PropTypes.string,
    county: PropTypes.string,
  };

  static defaultProps = {
    postCode: '',
    houseName: '',
    houseNumber: '',
    street: '',
    town: '',
    county: '',
  };

  state = {
    postCode: {
      value: this.props.postCode || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.POSTCODE,
      step: 0,
    },
    houseName: {
      value: this.props.houseName || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 0,
    },
    houseNumber: {
      value: this.props.houseNumber || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 0,
    },
    street: {
      value: this.props.street || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 0,
    },
    town: {
      value: this.props.town || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NOT_EMPTY,
      step: 0,
    },
    county: {
      value: this.props.county || '',
      status: INPUT_STATUS.DEFAULT,
      validationType: VALIDATION_TYPES.NONE,
      step: 0,
    },
  };

  changeAddressField = ({ target: { name, value } }) =>
    this.setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        status: INPUT_STATUS.DEFAULT,
        value,
      },
    }));

  changePostcodeField = (e) => {
    const custom = {
      ...e,
      target: {
        name: e.target.name,
        value: e.target.value.toUpperCase(),
      },
    };

    return this.changeAddressField(custom);
  };

  selectAddressHandler = (items) =>
    Object.keys(items).map((name) =>
      this.changeAddressField({ target: { name, value: items[name] } })
    );

  handleSubmit = (e) => {
    e.preventDefault();

    const updated = validate(prepare(this.state, this.props.step));
    const tryAgain = !isValid(updated);

    this.setState({ ...updated }, () => {
      if (tryAgain) return;

      const {
        props: { onSubmit },
        state,
      } = this;

      onSubmit(simplify(state));
    });
  };

  render() {
    const { postCode, houseName, houseNumber, street, district, town, county } =
      this.state;
    const currentStep = this.props.step;

    return (
      <div className="form-address form-section-wrapper">
        <div className="form-address-wrapper">
          <div className="autoconvert-input-group">
            {currentStep === postCode.step && (
              <LoqateAddress
                selectHandler={this.selectAddressHandler}
                formName="address"
                // eslint-disable-next-line max-len
                subTitle="Start typing your address and select the relevant option when it appears in the list below. If it is not found then click on the 'Enter address manually' link"
                manualFields={[
                  {
                    label: 'Postcode',
                    name: 'postCode',
                    required: true,
                    onChange: this.changePostcodeField,
                    warning: '* Please type correct UK postal code',
                    ...postCode,
                  },
                  {
                    label: 'House name',
                    name: 'houseName',
                    onChange: this.changeAddressField,
                    ...houseName,
                  },
                  {
                    label: 'House number',
                    name: 'houseNumber',
                    onChange: this.changeAddressField,
                    ...houseNumber,
                  },
                  {
                    label: 'Street',
                    name: 'street',
                    onChange: this.changeAddressField,
                    required: true,
                    ...street,
                  },
                  {
                    label: 'District',
                    name: 'district',
                    onChange: this.changeAddressField,
                    ...district,
                  },
                  {
                    label: 'Town',
                    name: 'town',
                    onChange: this.changeAddressField,
                    required: true,
                    ...town,
                  },
                  {
                    label: 'County',
                    name: 'county',
                    onChange: this.changeAddressField,
                    ...county,
                  },
                ]}
              />
            )}
          </div>
          <div className="form-submit align-center">
            <Button
              type="submit"
              className={s.submitBtn}
              onClick={this.handleSubmit}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressForm;
