import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='grid gap-10 bg-slate-400 px-20 py-10'>
      <div className='rounded-xl bg-white p-6 shadow-xl'>
        <span className='text-3xl font-semibold'>Selected Item</span>
        <div className='my-2 flex justify-between'>
          <span className='text-gray-500'>Mac mini</span>
          <span className='font-semibold'>$600</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-500'>4k montor</span>
          <span className='font-semibold'>$350</span>
        </div>
        <div className='mt-2 flex justify-between border-t-2 border-dashed pt-2'>
          <span>Total</span>
          <span className='font-semibold'>$950</span>
        </div>
        <div className='mx-auto mt-5 w-2/4 rounded-xl bg-blue-500 p-3 text-center text-white'>
          Checkout
        </div>
      </div>
      <div className='overflow-hidden rounded-xl bg-white'>
        <div className='flex justify-between bg-blue-500 p-6 pb-14'>
          <span className='text-2xl text-white'>Profile</span>
        </div>
        <div className='relative -top-5 rounded-3xl bg-white p-6'>
          <div className='relative -top-16 flex items-end justify-between'>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-500'>Orders</span>
              <span className='font-medium'>430</span>
            </div>
            <div className='h-24 w-24 rounded-full bg-pink-100' />
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-500'>Spent</span>
              <span className='font-medium'>$2500</span>
            </div>
          </div>
          <div className='relative -mb-5 -mt-10 flex flex-col items-center'>
            <span className='text-lg font-medium'>Tia Hwang</span>
            <span className='text-sm text-gray-500'>California, USA</span>
          </div>
        </div>
      </div>
      <div className='rounded bg-white p-10'></div>
      <div className='rounded bg-white p-10'></div>
    </div>
  );
};

export default Home;
