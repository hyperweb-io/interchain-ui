export interface BondingListItemProps {
  title: string;
  superfluidApr: string;
  amount: number | string;
  totalApr: string;
  onUnbond: (event?: any) => void;
  isLoading?: boolean;
}
