import { useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import { useContext } from 'react';

function Home() {
  const { text } = useContext(LanguageContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{text.welcome}</h1>
      <p>{text.homeIntro}</p>
    </div>
  );
}

export default Home;
