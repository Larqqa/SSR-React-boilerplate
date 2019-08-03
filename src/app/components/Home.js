import React, {useState} from 'react';
import getService from '../services/get';

const Home = () => {
  const [click, setClick] = useState(0);

  const handleClick = () => {
    setClick(click + 1);
  };

  const handleGet = async () => {
    const data = await getService.getAll();
    console.log(data);
  };

  return (
    <div>
      <h1>Hello im home</h1>
      <p>clicks on this shizz: {click}</p>
      <button onClick={handleClick}>click</button>
      <button onClick={handleGet}>get</button>
    </div>
  );
};

export default Home;