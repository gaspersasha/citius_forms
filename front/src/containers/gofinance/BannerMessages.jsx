import React from 'react';
import PropTypes from 'prop-types';
import s from './styles/finance.module.sass';

export default class BannerMessages extends React.Component {
  interval = null;

  // transforming childrens to solid array, cause single child gets in trouble without it
  elements = React.Children.toArray(this.props.children);

  static propTypes = {
    interval: PropTypes.number,
    children: PropTypes.array,
  };

  static defaultProps = {
    interval: 4, // in seconds
    children: [],
  };

  state = {
    index: 0,
  };

  componentDidMount() {
    // no rotation if there aren't much elements
    if (this.elements.length < 2) return;

    this.interval = setInterval(
      () =>
        this.setState((prev) => ({
          index: (prev.index + 1) % this.elements.length,
        })),
      this.props.interval * 1000
    );
  }

  componentWillUnmount() {
    this.inverval && clearInterval(this.inverval);
  }

  render() {
    return this.elements.length ? (
      <div className={s.promoBanner}>{this.elements[this.state.index]}</div>
    ) : null;
  }
}
