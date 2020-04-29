import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((acumulator, item) => {
      if (item.type === 'income') {
        return (acumulator += Number(item.value));
      }

      return acumulator;
    }, 0);
    const sumOutcome = this.transactions.reduce((acumulator, item) => {
      if (item.type === 'outcome') {
        return (acumulator += Number(item.value));
      }
      return acumulator;
    }, 0);

    return {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };
  }

  public create(data: CreateTransaction): Transaction {
    const transaction = new Transaction(data);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
