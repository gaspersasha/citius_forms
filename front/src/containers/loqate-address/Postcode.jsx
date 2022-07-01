import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  endpointFetch,
  debounce,
  deepEqual,
  formatDataFromLoqate,
  isMinAddress,
} from '~utils';
import { InputText, CustomLink, Spinner } from '~components';
import { INPUT_STATUS } from '~constants';
import { LoqateResults } from '.';
import s from './styles/postcode.module.sass';

export const defaultSelectedAddress = {
  postCode: '',
  town: '',
  district: '',
  street: '',
  houseNumber: '',
  houseName: '',
  county: '',
};

class Postcode extends Component {
  static propTypes = {
    selectHandler: PropTypes.func.isRequired,
    loqateHealthCheck: PropTypes.func.isRequired,
    subTitle: PropTypes.string,
    errorMessage: PropTypes.string,
    formName: PropTypes.string.isRequired,
    statuses: PropTypes.shape({
      postCode: PropTypes.oneOf([
        INPUT_STATUS.DEFAULT,
        INPUT_STATUS.VALID,
        INPUT_STATUS.INVALID,
      ]).isRequired,
      town: PropTypes.oneOf([
        INPUT_STATUS.DEFAULT,
        INPUT_STATUS.VALID,
        INPUT_STATUS.INVALID,
      ]).isRequired,
    }).isRequired,
    selectedAddress: PropTypes.shape({
      postCode: PropTypes.string.isRequired,
      town: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      district: PropTypes.string,
      houseNumber: PropTypes.string,
      houseName: PropTypes.string,
      county: PropTypes.string,
    }),
  };

  static defaultProps = {
    selectedAddress: defaultSelectedAddress,
    subTitle: '',
    errorMessage: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      listItems: [],
      isLoading: false,
      selectedAddress: props.selectedAddress, // TODO: React anti pattern
    };
    this.inputRef = React.createRef();
    this.getListOfAddresses = debounce(this.getListOfAddresses, 500);
  }

  static getDerivedStateFromProps(props, state) {
    // too heavy operation on each update
    return deepEqual(state.selectedAddress, props.selectedAddress)
      ? null
      : { selectedAddress: props.selectedAddress };
  }

  getListOfAddresses = ({ query, container }) =>
    this.setState({ isLoading: true }, () =>
      endpointFetch('loqateAPIFind', { query, container }, {}, false)
        .then(this.props.loqateHealthCheck('Find'))
        .then(this.setListOfAddresses)
        .catch(this.requestFailure)
    );

  getAddressDetails = ({ id }) =>
    this.setState({ isLoading: true }, () =>
      endpointFetch('loqateAPISelect', { id }, {}, false)
        .then(this.props.loqateHealthCheck('Retrieve'))
        .then(this.selectAddressSuccess)
        .catch(this.requestFailure)
    );

  setListOfAddresses = (resp) => {
    if (!resp || !Object.keys(resp).length) {
      return this.setState({ listItems: [] });
    }

    return this.setState({
      listItems: resp.Items,
      isLoading: false,
    });
  };

  selectAddressSuccess = (resp) => {
    if (!resp || !Object.keys(resp).length) return;

    const data = resp.Items.find((item) => item.Language === 'ENG');
    const selectedAddress = data
      ? formatDataFromLoqate(data)
      : defaultSelectedAddress;

    this.setState(
      {
        listItems: [],
        query: '',
        isLoading: false,
        selectedAddress,
      },
      () => this.props.selectHandler(selectedAddress)
    );
  };

  requestFailure = () =>
    this.setState({ isLoading: false }, () => this.props.loqateHealthCheck());

  changeHandler = ({ target: { value } }) =>
    this.setState({ query: value }, () => {
      const { query } = this.state;

      if (!query.length) {
        return this.setState({ listItems: [] });
      }

      if (query.length % 2 === 0 || query.length > 2) {
        return this.getListOfAddresses({ query });
      }

      return null;
    });

  blurHandler = (e) =>
    e.relatedTarget !== this.inputRef.current &&
    this.setState({ listItems: [] });

  generateList = () => {
    const { listItems } = this.state;

    return listItems.map(({ Text, Description, Id, Type, ...rest }, i) => {
      if (rest.Error) {
        return (
          <li
            key={rest.Error}
            className={`${s.listItem} ${s.listItemError}`}
            data-id={`loqate-result-${i}`}
          >
            <p className={s.listItemText}>
              {rest.Cause} {rest.Resolution}
            </p>
          </li>
        );
      }

      if (Type === 'Address') {
        return (
          <li
            key={Id}
            className={s.listItem}
            onClick={() => this.getAddressDetails({ id: Id })}
            data-id={`loqate-result-${i}`}
          >
            <p className={s.listItemText}>
              {Text} {Description}
            </p>
          </li>
        );
      }

      return (
        <li
          key={Id}
          className={`${s.listItem} ${s.listItemCode}`}
          onClick={() => this.getListOfAddresses({ container: Id })}
          data-id={`loqate-result-${i}`}
        >
          <p className={`${s.listItemText} ${s.listItemArrow}`}>
            {Text} {Description}
          </p>
        </li>
      );
    });
  };

  clickHandler = () => {
    const { query } = this.state;

    return query.length && this.getListOfAddresses({ query });
  };

  clearAddress = () =>
    this.setState({ selectedAddress: defaultSelectedAddress }, () => {
      this.props.selectHandler(defaultSelectedAddress);
    });

  formatStatuses = (items) => {
    const validationStatuses = Object.values(items);

    if (validationStatuses.includes(INPUT_STATUS.INVALID))
      return INPUT_STATUS.INVALID;
    if (validationStatuses.includes(INPUT_STATUS.VALID))
      return INPUT_STATUS.VALID;

    return INPUT_STATUS.DEFAULT;
  };

  getSelectedHouseNumber = () => {
    const {
      selectedAddress: { houseNumber, buildingNumber },
    } = this.state;

    return houseNumber || buildingNumber || '';
  };

  getSelectedStreet = () => {
    const {
      selectedAddress: { street },
    } = this.state;

    return street === '[no street entered from Loqate]' ? '' : street;
  };

  getSelectedTown = () => {
    const {
      selectedAddress: { town },
    } = this.state;

    return town === '[no town entered from Loqate]' ? '' : town;
  };

  render() {
    const { statuses, formName, errorMessage } = this.props;
    const { query, listItems, selectedAddress, isLoading } = this.state;
    const isAddressSelected = Boolean(
      Object.values(selectedAddress).find(
        (value) => value && value.length !== 0
      )
    );

    return (
      <div
        ref={this.inputRef}
        onBlur={this.blurHandler}
        tabIndex={0}
        role="button"
        className={s.wrapper}
      >
        {isAddressSelected && 'Your address'}
        {!isAddressSelected && (
          <InputText
            label="Address"
            name="loqateAddress"
            subTitle={this.props.subTitle}
            errorMessage={errorMessage}
            status={this.formatStatuses(statuses)}
            placeholder="Start typing your address to search"
            onChange={this.changeHandler}
            onClick={this.clickHandler}
            value={query}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
        )}
        {Boolean(listItems.length) && !isLoading && (
          <div data-id="loqate-results" className={s.listWrapper}>
            <ul className={s.list}>{this.generateList()}</ul>
          </div>
        )}
        {isLoading && (
          <div data-id="loader" className={s.listWrapper}>
            <Spinner />
          </div>
        )}

        {isAddressSelected && isMinAddress(selectedAddress) && (
          <div
            className={cn(
              { 'warning-label-subtitle': INPUT_STATUS.INVALID },
              'label-sub-title'
            )}
          >
            {errorMessage}
          </div>
        )}
        {isAddressSelected && (
          <div className={s.result}>
            <LoqateResults
              lines={[
                selectedAddress.houseName || selectedAddress.buildingName,
                `${this.getSelectedHouseNumber()} ${this.getSelectedStreet()}`,
                this.getSelectedTown(),
                selectedAddress.district,
                selectedAddress.postCode,
              ]}
            />
            <div id={`${formName}NotRightLink`} className={s.link}>
              <CustomLink
                onClick={this.clearAddress}
                data-id="clear-addres-link"
              >
                Not right? Change address
              </CustomLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Postcode;
