export const DATE_FORMAT = 'yyyy-MM-DD'

export interface Filter {
  text: string;
  numberMin: number;
  numberMax: number;
  boolean: string;
  enums: boolean[];
  dateFrom: string;
  dateTo: string;
}

export enum Type {
  A = 'A',
  B = 'B',
  C = 'C',
}

export const TYPES: string[] = Object.values(Type);

export interface Datum {
  id: number;
  name: string;
  fullName: string;
  number: number;
  boolean: boolean;
  enum: string;
  date: string;
}

export const DATA: Datum[] = [
  {
    id: 1,
    name: 'H',
    fullName: 'Hydrogen',
    number: 1.0079,
    boolean: true,
    enum: 'A',
    date: '2022-06-15'
  },
  {
    id: 2,
    name: 'He',
    fullName: 'Helium',
    number: 4.0026,
    boolean: true,
    enum: 'B',
    date: '2022-06-16'
  },
  {
    id: 3,
    name: 'Li',
    fullName: 'Lithium',
    number: 6.941,
    boolean: false,
    enum: 'C',
    date: '2022-06-17'
  },
  {
    id: 4,
    name: 'Be',
    fullName: 'Beryllium',
    number: 9.0122,
    boolean: true,
    enum: 'A',
    date: '2022-06-18'
  },
  {
    id: 5,
    name: 'B',
    fullName: 'Boron',
    number: 10.811,
    boolean: true,
    enum: 'B',
    date: '2022-06-19'
  },
  {
    id: 6,
    name: 'C',
    fullName: 'Carbon',
    number: 12.0107,
    boolean: false,
    enum: 'C',
    date: '2022-06-20'
  },
  {
    id: 7,
    name: 'N',
    fullName: 'Nitrogen',
    number: 14.0067,
    boolean: true,
    enum: 'A',
    date: '2022-06-21'
  },
  {
    id: 8,
    name: 'O',
    fullName: 'Oxygen',
    number: 15.9994,
    boolean: true,
    enum: 'B',
    date: '2022-06-22'
  },
  {
    id: 9,
    name: 'F',
    fullName: 'Fluorine',
    number: 18.9984,
    boolean: false,
    enum: 'C',
    date: '2022-06-23'
  },
  {
    id: 10,
    name: 'Ne',
    fullName: 'Neon',
    number: 20.1797,
    boolean: true,
    enum: 'A',
    date: '2022-06-24'
  },
];
