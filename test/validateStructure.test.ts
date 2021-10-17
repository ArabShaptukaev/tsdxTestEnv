import { validateStructure } from '../src/validateStructure';
import clonedeep from 'lodash.clonedeep';

describe('validateStructure function', () => {
  const testSubject = {
    subject: 'Welcome Subject',
    mailPayload: {
      customerLabel: 'customerLabel123',
      contractLabel: 'contractLabel123',
      contractName: 'contractName123',
    },
    pdfPayload: {
      arrayOfStrings: ['one', 'two', 'three'],
      date: new Date('2021-03-08'),
      contractLabel: 'contractLabel123',
      customerLabel: 'customerLabel123',
      salutation: 'Hallo Herr Musterman',
      firstName: 'Name',
      lastName: 'LastName',
      contractAddress: {
        streetName: 'ARandomStreet',
        streetNumber: '3',
        zipCode: '12345',
        city: 'Random City',
      },
      meterNumber: '123345789',
      company: {
        name: 'Company Name',
        address: {
          streetName: 'Street',
          streetNumber: 'StreetNumber',
          zipCode: '123456',
          city: 'City',
        },
      },
      charts: [
        {
          title: 'Consumption',
          datasets: [
            {
              color: 'green',
              label: 'Local Consumption',
              data: [
                {
                  date: new Date('2020-01-01'),
                  value: 3,
                },
                {
                  date: new Date('2020-01-02'),
                  value: 33,
                },
              ],
            },
          ],
        },
      ],
    },
  };
  const structure = {
    subject: 'Welcome Subject',
    mailPayload: {
      customerLabel: 'customerLabel123',
      contractLabel: 'contractLabel123',
      contractName: 'contractName123',
    },
    pdfPayload: {
      arrayOfStrings: ['one'],
      date: new Date('2021-03-08'),
      contractLabel: 'contractLabel123',
      customerLabel: 'customerLabel123',
      salutation: 'Hallo Herr Musterman',
      firstName: 'FirstName',
      lastName: 'LastName',
      contractAddress: {
        streetName: 'AStreet',
        streetNumber: '3',
        zipCode: '12355',
        city: 'ACity',
      },
      meterNumber: 'm348808',
      company: {
        name: 'Company Name',
        address: {
          streetName: 'Street',
          streetNumber: 'StreetNumber',
          zipCode: '123456',
          city: 'City',
        },
      },
      charts: [
        {
          title: 'Consumption',
          datasets: [
            {
              color: 'green',
              label: 'Local Consumption',
              data: [
                {
                  date: new Date('2020-01-01'),
                  value: 3,
                },
              ],
            },
          ],
        },
      ],
    },
  };
  it('works with two objects', () => {
    expect(validateStructure(testSubject, structure)).toBeTruthy();
  });
  it('validation succeeds when testSubject has an empty array', () => {
    const newTestSubject = {
      ...testSubject,
      pdfPayload: { ...testSubject.pdfPayload, charts: [] },
    };
    expect(validateStructure(newTestSubject, structure)).toBeTruthy();
  });
  it('validation succeeds when subject has null in an array', () => {
    const newTestSubject = (clonedeep(
      testSubject
    ).pdfPayload.charts[0] = null as any);
    const newSubject = (clonedeep(
      structure
    ).pdfPayload.charts[0] = null as any);
    expect(validateStructure(newTestSubject, newSubject)).toBeTruthy();
  });
  it('validation fails when testSubject does not have the expected key', () => {
    const newTestSubject = { ...testSubject, pdfPayload: {} };
    expect(validateStructure(newTestSubject, structure)).toBeFalsy();
  });
  it('validation fails when structure has null and testSubject does not', () => {
    const newStructure = { ...structure, pdfPayload: null };
    expect(validateStructure(testSubject, newStructure)).toBeFalsy();
  });
  it('validation fails when testSubject has an array element with the wrong structure', () => {
    const newTestSubject = {
      ...testSubject,
      pdfPayload: { ...testSubject.pdfPayload, charts: [{ name: '' }] },
    };
    expect(validateStructure(newTestSubject, structure)).toBeFalsy();
  });
  it('validation fails when testSubject has an array element with the wrong type', () => {
    const newTestSubject = (clonedeep(
      testSubject
    ).pdfPayload.charts[0].title = 123 as any);
    expect(validateStructure(newTestSubject, structure)).toBeFalsy();
  });
});
