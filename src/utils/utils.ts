export function convertDateFormat(dateString) {
    const dateParts = dateString.split("/");
    const [day, month, year] = dateParts;
  
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = date.toISOString();
  
    return formattedDate;
  }