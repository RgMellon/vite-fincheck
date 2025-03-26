export interface BankAccount {
  id: string;
  userId: string;
  name: string;
  initialBalance: string;
  type: "INVESTIMENT" | "CHECKING" | "CASH";
  color: string;
  currentBalance: number;
}
