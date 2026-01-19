import { faker } from '@faker-js/faker';

export class RandomDataGenerator {
  // Return 10 digit phone number with pattern ###-###-####
  generateHumanPhoneNumber = async () => {
    const phoneNo = faker.phone.number({ style: 'national' });
    const digits = phoneNo.replace(/\D/g, '');
    const formattedPhoneNumber = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return formattedPhoneNumber;
  };

  // Function to generate a random first name
  generateRandomFirstName = async () => {
    return faker.person.firstName();
  };

  // Function to generate a random last name with a unique identifier
  generateRandomLastNameWithUUID = async () => {
    // Remove any special characters from the last name
    const lastName = faker.person.lastName().replace(/[^a-zA-Z0-9\s]/g, '');
    const uuid = faker.string.uuid().slice(0, 7);
    return `${lastName}-${uuid}`;
  };

  // Function to generate timestamp in format yymmddhhmmss
  generateTimestamp = async () => {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');
    const hh = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const ss = now.getSeconds().toString().padStart(2, '0');
    return `${yy}${mm}${dd}${hh}${min}${ss}`;
  };
}
