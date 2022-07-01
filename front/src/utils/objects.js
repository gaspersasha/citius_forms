export const deepEqual = (obj1, obj2) => {
  if (typeof obj1 !== typeof obj2) return false;

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const p in obj1) {
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof obj1[p]) {
      case 'object':
        if (!deepEqual(obj1[p], obj2[p])) return false;
        break;
      case 'function':
        if (
          typeof obj2[p] === undefined ||
          obj1[p].toString() !== obj2[p].toString()
        )
          return false;
        break;
      default:
        if (obj1[p] !== obj2[p]) return false;
    }
  }

  return true;
};

export const isEmpty = (obj) => {
  if (!obj) return true;

  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/*
 * Helper for getting nested field in object.
 * Example of use:
 * const obj = {a:{b:{c:2}}};
 * getObjProperty = (obj, 'a.b.c') --> 2
 * */
export const getObjProperty = (obj, prop) =>
  prop
    .split('.')
    .reduce((m, i) => (m && typeof m === 'object' ? m[i] : null), obj);

const isObject = (item) =>
  item && typeof item === 'object' && !Array.isArray(item);

// removes validationType from state
export const mergeDeep = (target, ...sources) => {
  const source = sources.shift();
  const filtredState = target;

  for (const key in source) {
    if (isObject(source[key])) {
      filtredState[key] = { ...target[key] };
      mergeDeep(target[key], source[key]);
      delete filtredState[key].validationType;
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
};
