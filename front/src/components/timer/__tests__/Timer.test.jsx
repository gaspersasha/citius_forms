import React from 'react';
import { Timer } from '~components';
import { getRemainingTime } from '../Timer';

describe('<Timer />', () => {
  let wrapper;
  const props = {
    date: '05/20/2021',
  };

  const getWrapper = (propsArg) => mount(<Timer {...propsArg} />);

  it("shoudn't render without date", () => {
    wrapper = getWrapper(null);
    const timer = wrapper.find('[data-id="timer"]');

    expect(timer.exists()).toBe(false);
  });

  it('shoud render 0:00:00:00 (zero date) if passed date already expired', () => {
    wrapper = getWrapper({ date: '05/05/2005' });

    const days = wrapper.find('[data-id="days"]').text();
    const hours = wrapper.find('[data-id="hours"]').text();
    const minutes = wrapper.find('[data-id="minutes"]').text();
    const seconds = wrapper.find('[data-id="seconds"]').text();

    expect(days).toBe('0');
    expect(hours).toBe('0');
    expect(minutes).toBe('0');
    expect(seconds).toBe('0');
  });

  it('renders time cells', () => {
    wrapper = getWrapper(props);

    const days = wrapper.find('[data-id="days"]');
    const hours = wrapper.find('[data-id="hours"]');
    const minutes = wrapper.find('[data-id="minutes"]');
    const seconds = wrapper.find('[data-id="seconds"]');

    expect(days.exists()).toBe(true);
    expect(hours.exists()).toBe(true);
    expect(minutes.exists()).toBe(true);
    expect(seconds.exists()).toBe(true);
  });

  it('getRemainingTime function should return correct time object', () => {
    const { days, hours, minutes, seconds } = getRemainingTime(
      new Date('0:52:50 01/01/5020'),
      new Date('0:00:00 01/01/5021')
    );

    expect(days).toBe('365');
    expect(hours).toBe('23');
    expect(minutes).toBe('07');
    expect(seconds).toBe('10');
  });
});
