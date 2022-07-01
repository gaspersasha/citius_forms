import React from 'react';
import Seo from '../Seo';

describe('<Seo />', () => {
  it('render with no props passed', () => {
    const meta = {
      canonical: 'https://www.test.buyacar.co.uk',
    };
    const wrapper = shallow(<Seo meta={meta} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render with props', () => {
    const meta = {
      canonical: 'https://www.test.buyacar.co.uk',
      page_title: 'BAC UNIT TEST',
      description: 'Buyacar online with test',
      rights: 'Autovia Group Limited, licensed by Test',
      twitter: {
        title: 'BAC UNIT TEST',
        card: 'photo_test',
        site: '@buy_a_car_test',
        url: 'https://www.test.buyacar.co.uk',
      },
    };
    const wrapper = shallow(<Seo meta={meta} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render partly passed props', () => {
    const cms = {
      meta: {
        canonical: 'https://www.test.buyacar.co.uk',
        description: 'Buyacar online with test',
        rights: 'Autovia Group Limited, licensed by Test',
      },
    };
    const wrapper = shallow(<Seo {...cms} />);

    expect(wrapper).toMatchSnapshot();
  });
});
