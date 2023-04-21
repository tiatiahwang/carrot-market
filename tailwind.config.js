module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  // 클래스를 기준으로 다크모드 적용 (최상위 부모에 dark클래스 지정)
  darkMode: 'class',
  // @media(prefers-color-scheme)를 기준으로 다크모드 적용 (기본 값)
  // darkMode: 'media',
  plugins: [],
};
