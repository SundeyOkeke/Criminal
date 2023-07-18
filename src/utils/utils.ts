import * as bcrypt from 'bcrypt';
import { ValueTransformer } from 'typeorm';

// TODO[Security] Suggestion: choose more complex password hashing algorithm.
export class Hash {
  static make(plainText) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText, hash) {
    return bcrypt.compareSync(plainText, hash);
  }
}


export function convertDateFormat(dateString) {
    const dateParts = dateString.split("/");
    const [day, month, year] = dateParts;
  
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = date.toISOString();
  
    return formattedDate;
  }

