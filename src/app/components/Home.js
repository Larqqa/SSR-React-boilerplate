import React, {useState} from 'react';

const Home = (props) => {
  const [click, setClick] = useState(0);

  const handleClick = () => {
    setClick(click + 1)
  }

  return (
    <h1>
      Hello im in home
      clicks{click}
      <button onClick={handleClick}>click</button>
    </h1>
  );
}

export default Home;