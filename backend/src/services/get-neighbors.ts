import { BASE_URL } from '../constants';

type NativeName = {
  [langCode: string]: {
    common: string;
    official: string;
  };
};
export type Neighbors = {
  common: string;
  official: string;
  nativeName: NativeName;
};

const extractNeighbors = (neighborsObj: NativeName[]) => {
  return neighborsObj.map((neighbor: NativeName) => neighbor.name.common);
};

export const getNeighbors = async (codes: string): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}alpha?codes=${codes}`);
  const data = await response.json();
  
  return extractNeighbors(data);
};
