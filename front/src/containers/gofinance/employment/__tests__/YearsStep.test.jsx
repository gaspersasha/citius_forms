import React from 'react';
import { INPUT_STATUS } from '~constants';
import YearsStep from '../YearsStep';

describe('<YearsStep />', () => {
  const props = {
    onYearsChange: jest.fn(),
    onMonthsChange: jest.fn(),
    years: {
      value: '1',
      status: INPUT_STATUS.VALID,
    },
    months: {
      value: '1',
      status: INPUT_STATUS.VALID,
      isActive: true,
    },
    employmentType: {
      value: 'FULL_TIME_PERMANENT',
    },
    employmentStatus: 'employed',
  };

  const wrapper = mount(<YearsStep {...props} />);

  it('renders without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correct "employed" sub title ', () => {
    const subTitle = 'span[className="label-sub-title"]';

    expect(wrapper.find(subTitle).at(1).text()).toBe(
      'Please select the amount of months you have spent at this job?'
    );
  });

  it('renders correct "unemployed" sub title ', () => {
    wrapper.setProps({
      employmentType: {
        value: 'HOMEMAKER',
      },
      employmentStatus: 'unemployed',
    });
    const subTitle = 'span[className="label-sub-title"]';

    expect(wrapper.find(subTitle).at(1).text()).toBe(
      'Please provide how many months you have spent as homemaker?'
    );
  });
});
