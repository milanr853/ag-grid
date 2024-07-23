import { faker } from '@faker-js/faker';

export interface RowData {
  athlete: string;
  year: number;
  country: string;
  age: number;
  date: string;
  sport: string;
  total: number;
  gold: number;
  silver: number;
  bronze: number;
  group: string; // Optional: For grouping purposes
}

const generateGroup = () => {
  return faker.helpers.arrayElement([
    'North America',
    'Europe',
    'Asia',
    'South America',
    'Africa',
    'Australia'
  ]);
}

export const generateData = (count: number): RowData[] => {
  const data: RowData[] = [];
  for (let i = 0; i < count; i++) {
    // Generate random counts for gold, silver, and bronze medals
    const gold = faker.datatype.number({ min: 0, max: 5 });
    const silver = faker.datatype.number({ min: 0, max: 5 });
    const bronze = faker.datatype.number({ min: 0, max: 5 });

    data.push({
      athlete: faker.name.fullName(),
      year: faker.date.past(20, new Date()).getFullYear(),
      country: faker.address.country(),
      age: faker.datatype.number({ min: 18, max: 40 }),
      date: faker.date.past(20, new Date()).toISOString().split('T')[0],
      sport: faker.helpers.arrayElement([
        'Swimming',
        'Running',
        'Cycling',
        'Gymnastics',
        'Weightlifting',
        'Boxing',
        'Wrestling',
        'Basketball',
        'Football',
        'Tennis'
      ]),
      total: gold + silver + bronze, // Sum of medals
      gold: gold,
      silver: silver,
      bronze: bronze,
      group: generateGroup() // Optional: Add group field if needed
    });
  }
  return data;
};
