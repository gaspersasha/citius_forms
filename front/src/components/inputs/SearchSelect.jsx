import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Label } from '~components';
import { INPUT_STATUS } from '~constants';
import s from './styles/searchselect.module.sass';

class SearchSelect extends React.Component {
  static propTypes = {
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    subTitle: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    placeholder: PropTypes.string,
    value: PropTypes.any,
    status: PropTypes.string,
    name: PropTypes.string,
    customClasses: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
  };

  static defaultProps = {
    required: false,
    autoFocus: false,
    id: '',
    label: '',
    subTitle: '',
    value: '',
    status: '',
    placeholder: '',
    name: '',
    customClasses: '',
    options: [],
  };

  state = {
    showDropDown: false,
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    const {
      id,
      autoFocus,
      label,
      value,
      status,
      required,
      customClasses,
      name,
      placeholder,
      options,
      subTitle,
      onChange,
    } = this.props;

    const inputClasses = cn(customClasses, {
      'success-form-border': status === INPUT_STATUS.VALID,
      'error-form-border':
        status === INPUT_STATUS.INVALID || status === INPUT_STATUS.MISSMATCH,
    });

    const listItems = options.reduce((acc, item) => {
      if (
        item.toUpperCase().indexOf(value.toUpperCase()) !== -1 &&
        item !== value
      ) {
        acc.push(item);
      }

      return acc;
    }, []);

    const DropdownList = () =>
      listItems.map((item) => (
        <li
          key={item}
          value={item}
          onClick={() => onChange({ target: { value: item } })}
        >
          <p>{item}</p>
        </li>
      ));

    const handleInputChange = (event) => {
      onChange(event);
      this.setState({ showDropDown: true });
    };

    return (
      <div ref={this.inputRef} className={s.wrapper}>
        <Label
          name={name}
          required={required}
          status={status}
          title={label}
          withSub={!!subTitle}
        >
          {subTitle && <div className="sub-title">{subTitle}</div>}
          {status === INPUT_STATUS.INVALID && (
            <div className="label-sub-title">
              *Please select item from dropdown
            </div>
          )}
          <input
            id={id}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            onFocus={() => this.setState({ showDropDown: true })}
            onBlur={() =>
              setTimeout(() => this.setState({ showDropDown: false }), 500)
            }
            type="text"
            className={inputClasses}
            value={value}
            name={name}
            onChange={handleInputChange}
            placeholder={placeholder || 'Start typing...'}
          />
        </Label>
        {!!listItems.length &&
          !!this.inputRef.current &&
          this.state.showDropDown && (
            <ul className={s.list}>
              <DropdownList />
            </ul>
          )}
      </div>
    );
  }
}

export default SearchSelect;
