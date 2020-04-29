import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    const transaction = this.transactionsRepository.create(data);
    const balance = this.transactionsRepository.getBalance();
    if (balance.outcome > balance.income) {
      throw Error("You don't have enough balance");
    }
    return transaction;
  }
}

export default CreateTransactionService;
