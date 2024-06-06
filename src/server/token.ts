export const getToken = (): string => {
  const token = localStorage.getItem('six-cities-token');
  return token ?? '';
};

export const dropToken = (): void => {
  localStorage.removeItem('six-cities-token');
};

export const saveToken = (token: string): void => {
  localStorage.setItem('six-cities-token', token);
};
