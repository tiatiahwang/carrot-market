import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <form className='flex flex-col space-y-2  p-5 '>
      <input
        type='text'
        required
        placeholder='Username'
        className='peer rounded-md border border-gray-400 p-1'
      />
      <span className='hidden peer-invalid:block peer-invalid:text-red-500'>
        다시 입력해주세요
      </span>
      <span className='hidden peer-valid:block peer-valid:text-teal-500'>
        합격~!
      </span>
      <span className='hidden peer-hover:block peer-hover:text-amber-500'>
        하이루
      </span>
      <input type='submit' value='Login' className='bg-white' />
    </form>
  );
};

export default Home;
