import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTestFlag } from '~utils';
import { useGOContext, useVehicleContext } from '~contexts';
import s from './parts.module.sass';

function validate(curr, max) {
  if (!curr || curr < 1) return 1;
  if (curr > max) return max;

  return curr;
}

export default function Parts({ part = 1, step = 1 }) {
  const { vehicle } = useVehicleContext();
  // GO a/b start
  // Display <Part /> component only within GO test "Serf Service Journey"
  const { isGoRdy } = useGOContext();
  const [variant, setVariant] = useState('0');

  useEffect(() => {
    if (!isGoRdy) return;
    setVariant(getTestFlag('ssj'));
  }, [isGoRdy]);

  if (variant !== '1' && !vehicle.leadgen_B) return null;
  // GO a/b end

  const totalPartsCount = 3;
  const partSubtitles = [
    [
      'Personal details',
      'Address details',
      'Employment details',
      'Bank details',
    ],
    ['Part exchange', 'Part exchange', 'Part exchange', 'Finance term'],
    ['Submit  application'],
  ];

  const validPart = validate(part, totalPartsCount);
  const validStep = validate(step, partSubtitles[validPart - 1].length);

  return (
    <section className={s.container}>
      <b>
        Part {validPart} of {totalPartsCount}
      </b>
      &nbsp;
      {partSubtitles[validPart - 1][validStep - 1]}
    </section>
  );
}

Parts.propTypes = {
  part: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};
