import React, { useState, useEffect } from 'react';
import { useGOContext } from '~contexts';
import { getTestFlag } from '~utils';

const GoUsageExample = () => {
  const { isGoRdy } = useGOContext();

  const [flag, setFlag] = useState('0');

  useEffect(() => {
    if (!isGoRdy) return;
    setFlag(getTestFlag('testFakeId'));
  }, [isGoRdy]);

  return (
    <>
      {flag === '0' && <div>Original</div>}
      {flag === '1' && <div>Variant 1</div>}
      {flag === '2' && <div>Variant 2</div>}
      {flag === '3' && <div>Variant 3</div>}
    </>
  );
};

export default GoUsageExample;
