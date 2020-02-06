import React from "react";
import styled from "styled-components";
import { PrimaryBlue, PrimaryOrange } from "../Components/Colors"

export const PrimaryButton = styled.button`
color: white;
background-color: ${PrimaryBlue};
height: 30px;
width: 160px;
font-weight: bold;
cursor: pointer;
border-radius: 6px;
font-size: 14px;
margin-top: 10px;
`;
export const AddToCartButton = styled.button`
color: white;
background-color: ${PrimaryOrange};
height: 25px;
width: 140px;
font-weight: bold;
cursor: pointer;
border-radius: 6px;
font-size: 14px;
margin-top: 10px;
`;

export const Row = styled.div`
display: flex;
flex-direction: row
`
export const Column = styled.div`
display: flex;
flex-direction: column
`
