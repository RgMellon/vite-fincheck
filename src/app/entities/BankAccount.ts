export interface BankAccount {
  id: string;
  userId: string;
  name: string;
  initialBalance: string;
  type: "INVESTMENT" | "CHECKING" | "CASH";
  color: string;
  currentBalance: number;
}
