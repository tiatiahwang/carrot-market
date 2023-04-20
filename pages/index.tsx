import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col space-y-2  p-5 '>
      <details className='select-none open:bg-indigo-100 open:text-white'>
        <summary className='cursor-pointer'>food</summary>
        <span className='selection:bg-pink-100 selection:text-white'>beef</span>
      </details>
      <ul className='list-decimal marker:text-teal-500'>
        <li>연습</li>
        <li>tailwindCSS</li>
        <li>HOT</li>
      </ul>
      <input
        type='file'
        className='file:cursor-pointer file:rounded-md file:border-0 file:bg-purple-300 file:px-5 file:text-white file:transition-colors file:hover:border file:hover:bg-white file:hover:text-purple-300'
      />
      <p className='first-letter:text-7xl first-letter:hover:text-purple-400'>
        Hello everyone!
      </p>
    </div>
  );
};

export default Home;
