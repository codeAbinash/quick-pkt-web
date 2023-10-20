import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import icons from '../../assets/icons/icons';
import TapMotion from '../../components/TapMotion';
import { getTransactionsHistory } from '../../lib/api';
import { UserProfile } from '../Profile/utils';

export default function Wallet() {
  const profile: UserProfile = useSelector((state: any) => state.profile);
  return (
    <div className='mx-auto flex min-h-[80dvh] max-w-xl flex-col justify-between px-5 pb-32'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2 rounded-3xl bg-accent p-5 pt-4 text-white'>
          <div className='flex items-center justify-between'>
            <p className='font-medium'>Wallet Balance</p>
            <img src={icons.wallet} className='w-9 rounded-xl bg-black/20 p-2 invert' />
          </div>
          <p className='text-4xl font-semibold'>₹ {profile?.data?.available_balance || 'xx.xx'}</p>
          <div className='mt-2 grid grid-cols-2 gap-4 text-xs'>
            <TapMotion size='lg' className='rounded-btn bg-white/20 p-3.5 text-center font-normMid text-white'>
              Add Money
            </TapMotion>
            <TapMotion
              size='lg'
              className='rounded-btn bg-white/20 p-3.5 text-center font-normMid text-white opacity-50 '
            >
              Withdraw Money
            </TapMotion>
          </div>
        </div>
        <Transactions />
      </div>
    </div>
  );
}

type TransactionType = {
  id: number;
  user_id: string;
  amount: string;
  reference: string;
  closing_balance: string;
  opening_balance: string;
  description: string;
  status: 'success' | 'pending' | 'failed' | 'refund';
  type: string;
  created_at: string;
  updated_at: string;
};

function Transactions() {
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState<TransactionType[] | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMorePageAvailable, setIsMorePageAvailable] = useState(true);

  async function loadTransactions(page: number) {
    setIsLoading(true);
    console.log('Loading Page ', page);
    const transactionStatus = await getTransactionsHistory(page);
    if (!transactionStatus.status) return;

    console.log(transactionStatus.data.data);
    if (transactionStatus.data.data.next_page_url === null) {
      setIsMorePageAvailable(false);
    }

    // Set Transactions
    const newTransactions = transactionStatus.data.data.data;
    const allTransactions = transactions ? [...transactions, ...newTransactions] : newTransactions;
    setTransactions(allTransactions);
    setIsLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load More Data
          if (isLoading) return;
          setIsLoading(true);
          loadTransactions(page + 1);
          setPage(page + 1);
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, isLoading]);

  useEffect(() => {
    loadTransactions(page);
  }, []);

  return (
    <div>
      <p className='mt-2 pl-2 font-normMid'>Transactions</p>
      <div>
        <AllTransactions transactions={transactions} />
        <div className='mt-3 flex w-full items-center justify-center'>
          {isMorePageAvailable ? (
            isLoading ? (
              <div className='tap95 highlight-none mt-5 animate-pulse rounded-full px-7 text-xs font-normMid'>
                <img src={icons.linear_loading_dots} className='h-10 opacity-50 dark:invert' />
              </div>
            ) : null
          ) : transactions?.length ? (
            <span className='mt-5 text-xs font-normMid opacity-50'>No More Transactions</span>
          ) : null}
        </div>
        {isMorePageAvailable && <div ref={observerTarget}></div>}
      </div>
    </div>
  );
}
//   <button
//     className='tap95 highlight-none my-0.5 mt-5 rounded-full bg-inputBg p-2.5 px-7 text-xs font-normMid dark:bg-white/10'
//     onClick={() => {
//       setPage(page + 1);
//       loadTransactions(page + 1);
//     }}
//   >
//     Show More
//   </button>

function NoTransactions() {
  return (
    <div className='w-full'>
      <img src={icons.no_data} className='w-full dark:grayscale dark:invert' />
      <p className='text-center text-xs font-normMid opacity-50'>No Transactions</p>
    </div>
  );
}

function AllTransactions({ transactions }: { transactions: TransactionType[] | null }) {
  if (transactions === null) {
    return <TransactionsShimmer />;
  }

  if (transactions.length === 0) {
    return <NoTransactions />;
  }

  return (
    <div className='mt-3 flex min-h-[40dvh] flex-col gap-3'>
      {transactions?.map((transaction, index) => (
        <TapMotion
          size='lg'
          className='flex items-center justify-center gap-3 rounded-3xl bg-inputBg p-4 dark:bg-white/10'
          key={index}
        >
          <img src={transaction.type === 'credit' ? icons.transition.receive : icons.transition.send} className='w-8' />
          <div className='flex flex-grow flex-col gap-0.5'>
            <p className='text-sm font-420'>{transaction.description}</p>
            <p className='text-xs opacity-70'>{niceDate(transaction.created_at)}</p>
          </div>
          <div className='text-right'>
            <p className={'text-sm font-normMid'}>
              {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount}
            </p>
            <p className='text-[0.7rem] font-normMid'>
              {transaction.status === 'pending' ? (
                <span className='text-yellow-500'>Pending</span>
              ) : transaction.status === 'failed' ? (
                <span className='text-red-500'>Failed</span>
              ) : transaction.status === 'success' ? (
                <span className='text-green-500'>Success</span>
              ) : transaction.status === 'refund' ? (
                <span className='text-red-500'>Refund</span>
              ) : (
                <span className='text-red-500'>Unknown</span>
              )}
            </p>
          </div>
        </TapMotion>
      ))}
    </div>
  );
}

function niceDate(date: string) {
  const d = new Date(date);
  // Like 07 Oct 2021, 10:30 AM
  return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}, ${d.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  )}`;
}

function TransactionsShimmer() {
  return (
    <div className='flex min-h-[20dvh] items-end justify-center'>
      <p className='text-xs opacity-70'>Loading Transactions</p>
    </div>
  );
  // return (
  //   <div className='mt-3 flex flex-col gap-3'>
  //     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
  //       <div
  //         className='shimmer flex animate-pulse items-center justify-center gap-3 rounded-3xl p-4 py-9 opacity-70'
  //         key={index}
  //       ></div>
  //     ))}
  //   </div>
  // );
}

// type OptionsType = {
//   name: string;
//   icon: string;
//   onclick?: () => void;
// };

// const options = [
//   {
//     name: 'Send',
//     icon: icons.walletOptions.send,
//     link: '/offers',
//   },
//   {
//     name: 'Request',
//     icon: icons.walletOptions.request,
//     link: '/wallet',
//   },
//   {
//     name: 'Scan',
//     icon: icons.walletOptions.scan,
//     link: '/refer',
//   },
//   {
//     name: 'History',
//     icon: icons.walletOptions.history,
//     link: '/history',
//   },
// ];
// function Options() {
//   return (
//     <div className='mx-auto mt-1 grid w-full max-w-4xl grid-cols-4 gap-5 py-3 pb-1 pt-0'>
//       {options.map((option, index) => (
//         <div className='tap95 flex flex-col items-center justify-center gap-1' key={index}>
//           <div className='rounded-[1.25rem] bg-accent/[0.15] p-4.5 dark:bg-accent/20'>
//             <img src={option.icon} className='aspect-square w-6' />
//           </div>
//           <span className='text-[0.7rem] font-normMid opacity-80'>{option.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// }
