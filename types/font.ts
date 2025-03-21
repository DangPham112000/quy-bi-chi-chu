export interface FontType {
  label: string;
  value: string;
  paragraphGap: string;
}

export interface FontContextType {
  font: FontType;
  setFont: Function;
}
