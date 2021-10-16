export const validateStructure = (
  testSubject: any,
  structure: any
): boolean => {
  if (Array.isArray(structure)) {
    if (Array.isArray(testSubject) && testSubject.length !== 0) {
      return testSubject.every(item => validateStructure(item, structure[0]));
    }
    return Array.isArray(testSubject);
  } else if (
    typeof testSubject === 'object' &&
    testSubject !== null &&
    testSubject !== undefined
  ) {
    return Object.keys(structure).every(
      key =>
        key in testSubject &&
        validateStructure(testSubject[key], structure[key])
    );
  }
  return typeof testSubject === typeof structure;
};
