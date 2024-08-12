import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ToggleButton = ({ latestSort, onToggle }) => {
  return (
    <BtnWrapper>
      <CheckBox type="checkbox" id="toggleBtn" onChange={onToggle} checked={latestSort} />
      <ButtonLabel htmlFor="toggleBtn" latestSort={latestSort} />
    </BtnWrapper>
  );
};

ToggleButton.propTypes = {
  latestSort: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleButton;

const BtnWrapper = styled.div`
  display: flex;
  z-index: 0;
`;

const CheckBox = styled.input`
  display: none;
`;

const ButtonLabel = styled.label`
  z-index: 10;
  width: 12rem;
  height: 3rem;
  border-radius: 2em;
  background-color: #b0b0b0;

  ::before {
    display: flex;
    position: absolute;
    content: '가져가기';
    padding-left: 1em;
    justify-content: flex-start;
    align-items: center;
    width: 10rem;
    height: 3rem;
    color: #f0f0f0;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    transition: all 0.2s ease-in-out;
  }

  ::after {
    display: flex;
    position: relative;
    content: '배송받기';
    width: 6rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    left: 6rem;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    border-radius: 2rem;
    background: #ffffff;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
  }

  ${(props) =>
    props.latestSort &&
    `
    &::before {
      padding-right: 1rem;
      content: '배송받기';
      justify-content: flex-end;
    };
    &::after {
      content: '가져가기';
      width: 6rem;
      height: 3rem;
      left: 0rem;
    }
  `}
`;
