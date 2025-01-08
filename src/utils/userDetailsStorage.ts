export interface UserDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  zipCode: string;
}

export const saveUserDetails = (details: UserDetails): void => {
  localStorage.setItem('userDetails', JSON.stringify(details));
};

export const getUserDetails = (): UserDetails | null => {
  const details = localStorage.getItem('userDetails');
  return details ? JSON.parse(details) : null;
};