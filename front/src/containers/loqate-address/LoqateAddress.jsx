import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputText, CustomLink, Spinner } from '~components';
import { INPUT_STATUS } from '~constants';
import { endpointFetch } from '~utils';
import { Postcode } from '.';
import s from './styles/loqate-address.module.sass';

class LoqateAddress extends Component {
  static propTypes = {
    selectHandler: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    errorMessage: PropTypes.string,
    manualFields: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        required: PropTypes.bool,
        warning: PropTypes.string,
        id: PropTypes.string,
      })
    ).isRequired,
  };

  static defaultProps = {
    subTitle: '',
    errorMessage: '',
  };

  state = {
    isCheckingApi: false,
    isManual: false,
    isApiHaveError: false,
  };

  componentDidMount() {
    this.preCheckLoqateFindApi();
  }

  loqateHealthCheck =
    (type, fn = this.loqateApiError) =>
    (response) => {
      if (!response) {
        return fn();
      }

      if (!Object.prototype.hasOwnProperty.call(response, 'Items')) {
        return fn();
      }

      if (!response.Items.length) {
        return response;
      }

      const firstItem = response.Items[0];

      // Check Error item in response
      if (firstItem.Error && !firstItem.Cause && !firstItem.Resolution) {
        return fn();
      }

      // Check success response from Loqate API
      if (!firstItem.Error) {
        const invalidItem = response.Items.find(this.invalidResponse(type));

        if (invalidItem) {
          return fn();
        }
      }

      return response;
    };

  preCheckLoqateFindApi = () =>
    this.setState({ isCheckingApi: true }, () =>
      endpointFetch('loqateAPIFind', { query: 'Buy A Car' }, {}, false)
        .then(this.loqateHealthCheck('Find', this.switchAddressField))
        .then(this.turnOffLoader)
        .catch(console.warn)
    );

  turnOffLoader = () => this.setState({ isCheckingApi: false });

  switchAddressField = () =>
    this.setState(({ isManual }) => ({ isManual: !isManual }));

  formatAddress = (fields) =>
    fields.reduce(
      (prev, field) => ({ ...prev, [field.name]: field.value }),
      {}
    );

  getRequiredFields = () => {
    let postCode;
    let street;
    let town;

    this.props.manualFields.forEach((item) => {
      if (item.name === 'postCode') postCode = item;
      if (item.name === 'street') street = item;
      if (item.name === 'town') town = item;
    });

    return { postCode, street, town };
  };

  generateManualInputs = () =>
    this.props.manualFields.map(({ warning, ...props }) => (
      <div key={props.name} className="form-input">
        <InputText {...props} />
        {warning && props.status === INPUT_STATUS.INVALID && (
          <p data-id="manual-field-warn" className={s.warning}>
            {warning}
          </p>
        )}
      </div>
    ));

  loqateApiError = () => {
    this.setState({ isApiHaveError: true }, () => this.switchAddressField());

    return {};
  };

  invalidResponse = (type) => (item) => {
    const keys = Object.keys(item);

    switch (type) {
      case 'Retrieve':
        return (
          !keys.includes('Language') ||
          !keys.includes('City') ||
          !keys.includes('District') ||
          !keys.includes('PostalCode') ||
          !keys.includes('Street') ||
          !keys.includes('BuildingNumber') ||
          !keys.includes('SubBuilding') ||
          !keys.includes('BuildingName')
        );
      case 'Find':
      default:
        return (
          !item.Id ||
          !keys.includes('Type') ||
          !keys.includes('Text') ||
          !keys.includes('Description')
        );
    }
  };

  render() {
    const { formName, errorMessage } = this.props;
    const { isManual, isApiHaveError, isCheckingApi } = this.state;

    if (isCheckingApi) {
      return <Spinner />;
    }

    const selectedAddress = this.formatAddress(this.props.manualFields);
    const { postCode, street, town } = this.getRequiredFields();

    return (
      <>
        {isApiHaveError && (
          <div className="form_input_warning">
            Oops! Our address lookup is not responding. Please enter your
            address manually
          </div>
        )}

        {isManual ? (
          this.generateManualInputs()
        ) : (
          <div className="form-input">
            <Postcode
              formName={formName}
              subTitle={this.props.subTitle}
              styleType="loqate-address"
              errorMessage={errorMessage}
              selectHandler={this.props.selectHandler}
              statuses={{
                postCode: postCode.status,
                town: town.status,
                street: street.status,
              }}
              selectedAddress={selectedAddress}
              loqateHealthCheck={this.loqateHealthCheck}
            />
            {!postCode.value && (
              <div id={`${formName}ManuallyLink`} className={s.link}>
                <CustomLink
                  type="loqate-address-link__text"
                  onClick={this.switchAddressField}
                  data-id="enter-address-manually"
                >
                  Enter address manually
                </CustomLink>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default LoqateAddress;
