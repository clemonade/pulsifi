export enum Type {
  A = 'A',
  B = 'B',
  C = 'C',
}

export interface Datum {
  id: number;
  name: string;
  fullName: string;
  numValue: number;
  boolValue: boolean;
  enumValue: string;
  dateFrom: string;
  dateTo: string;
}

export const DATA: Datum[] = [
  // {
  //   id: 1,
  //   name: 'H',
  //   fullName: 'Hydrogen',
  //   numValue: 1.0079,
  //   boolValue: true,
  //   enumValue: 'A',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 2,
  //   name: 'He',
  //   fullName: 'Helium',
  //   numValue: 4.0026,
  //   boolValue: true,
  //   enumValue: 'B',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 3,
  //   name: 'Li',
  //   fullName: 'Lithium',
  //   numValue: 6.941,
  //   boolValue: false,
  //   enumValue: 'C',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 4,
  //   name: 'Be',
  //   fullName: 'Beryllium',
  //   numValue: 9.0122,
  //   boolValue: true,
  //   enumValue: 'A',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 5,
  //   name: 'B',
  //   fullName: 'Boron',
  //   numValue: 10.811,
  //   boolValue: true,
  //   enumValue: 'B',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 6,
  //   name: 'C',
  //   fullName: 'Carbon',
  //   numValue: 12.0107,
  //   boolValue: false,
  //   enumValue: 'C',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 7,
  //   name: 'N',
  //   fullName: 'Nitrogen',
  //   numValue: 14.0067,
  //   boolValue: true,
  //   enumValue: 'A',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 8,
  //   name: 'O',
  //   fullName: 'Oxygen',
  //   numValue: 15.9994,
  //   boolValue: true,
  //   enumValue: 'B',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 9,
  //   name: 'F',
  //   fullName: 'Fluorine',
  //   numValue: 18.9984,
  //   boolValue: false,
  //   enumValue: 'C',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
  // {
  //   id: 10,
  //   name: 'Ne',
  //   fullName: 'Neon',
  //   numValue: 20.1797,
  //   boolValue: true,
  //   enumValue: 'A',
  //   dateFrom: '2022-06-15',
  //   dateTo: '2022-06-17'
  // },
];
