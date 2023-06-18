// import React from 'react'
// import styled from 'styled-components'
// import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
// const Stars = ({ stars, reviews }) => {
//   const tempStars = Array.from({ length: 5 }, (_, index) => {
//     const number = index + 0.5
//     return (
//       <span key={index}>
//         {stars > number ? (
//           <BsStarFill />
//         ) : stars > index ? (
//           <BsStarHalf />
//         ) : (
//           <BsStar />
//         )}
//       </span>
//     )
//   })
//   return (
//     <Wrapper>
//       <div className='stars'>{tempStars}</div>
//       <p className='reviews'>({reviews} customer reviews)</p>
//     </Wrapper>
//   )
// }

// const Wrapper = styled.div`
//   display: flex;
//   align-items: center;
//   span {
//     color: #ffb900;
//     font-size: 1rem;
//     margin-right: 0.25rem;
//   }
//   p {
//     margin-left: 0.5rem;
//     margin-bottom: 0;
//   }
//   margin-bottom: 0.5rem;
// `
// export default Stars

import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styled from "styled-components";

const Stars = ({ stars, reviews }) => {
  const renderStarRating = (stars) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;

    // Array to hold the star icons
    const starIcons = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<BsStarFill key={i} />);
    }

    // Add half star if applicable
    if (hasHalfStar) {
      starIcons.push(<BsStarHalf key={fullStars} />);
    }

    // Add empty stars to fill up to 5 stars
    const remainingStars = 5 - Math.ceil(stars);
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(<BsStar key={fullStars + i + 1} />);
    }
    return starIcons;
  };

  const starRating = renderStarRating(stars);
  return (
    <Wrapper>
      <div className="stars">{starRating}</div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;

export default Stars;
