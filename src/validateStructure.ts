export const validateStructure = (
  testSubject: any,
  structure: any
): boolean => {
  if (structure === null || testSubject === null) {
    return structure === null;
  }
  if (Array.isArray(structure) && Array.isArray(testSubject)) {
    if (testSubject.length !== 0) {
      return testSubject.every(item => validateStructure(item, structure[0]));
    }
    return true;
  } else if (typeof structure === 'object' && typeof testSubject === 'object') {
    return Object.keys(structure).every(
      key =>
        key in testSubject &&
        validateStructure(testSubject[key], structure[key])
    );
  }
  return typeof testSubject === typeof structure;
};
