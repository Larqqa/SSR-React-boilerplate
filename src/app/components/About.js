import React from 'react';

const About = (props) => {
  return (
    <div>
      <p>About is here {props.route.data}</p>
    </div>
  );
}

export default About;