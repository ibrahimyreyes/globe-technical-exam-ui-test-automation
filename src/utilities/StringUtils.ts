export class StringUtils {
  /** ***********************DateFormat Utilities*****************************/
  async formatDateToFullMonth(dateString: string): Promise<string> {
    const monthMap: { [key: string]: string } = {
      Jan: 'January',
      Feb: 'February',
      Mar: 'March',
      Apr: 'April',
      May: 'May',
      Jun: 'June',
      Jul: 'July',
      Aug: 'August',
      Sep: 'September',
      Oct: 'October',
      Nov: 'November',
      Dec: 'December'
    };

    const parts = dateString.trim().split(' ');

    if (parts.length !== 3) {
      throw new Error(`Invalid date format. Expected "DD MMM YYYY", got "${dateString}"`);
    }

    const [day, shortMonth, year] = parts;
    const fullMonth = monthMap[shortMonth];

    if (!fullMonth) {
      throw new Error(`Invalid month abbreviation: ${shortMonth}`);
    }

    return `${day} ${fullMonth},${year}`;
  }
}
