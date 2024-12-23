export const formatDateRange = (
    startTimestamp: number,
    endTimestamp: number
  ): string => {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);
  
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
  
    const startFormatted = startDate.toLocaleDateString("en-GB", options);
    const endFormatted = endDate.toLocaleDateString("en-GB", options);
  
    return `${startFormatted} - ${endFormatted}`;
  };