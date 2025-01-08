export interface Personalization {
  itemId: number;
  text: string;
}

export const savePersonalization = (itemId: number, text: string): void => {
  const personalizations = getPersonalizations();
  personalizations[itemId] = text;
  localStorage.setItem('personalizations', JSON.stringify(personalizations));
};

export const getPersonalizations = (): Record<number, string> => {
  const items = localStorage.getItem('personalizations');
  return items ? JSON.parse(items) : {};
};

export const removePersonalization = (itemId: number): void => {
  const personalizations = getPersonalizations();
  delete personalizations[itemId];
  localStorage.setItem('personalizations', JSON.stringify(personalizations));
};