export const formatDateOfBirth = (date_birth: { year: number, month: number, day: number }) => {
    const year = date_birth?.year;
    const month = date_birth?.month < 10 ? `0${date_birth?.month}` : date_birth?.month;
    const day = date_birth?.day < 10 ? `0${date_birth?.day}` : date_birth?.day;
    return `${year}-${month}-${day}`;
  };