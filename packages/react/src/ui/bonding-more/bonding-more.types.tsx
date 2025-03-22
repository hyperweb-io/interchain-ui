export interface BondingMoreProps {
  bondingName: string;
  available: number | string;
  onBond: (event?: any) => void;
  onChange: (value: number) => void;
  isLoading?: boolean;
  value: number;
}
