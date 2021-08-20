import styled from "styled-components";

export const Form = styled.form`
    width: 100%;
    display: flex;
    max-width: 450px;
    min-width: 150px;
    flex-direction: column;
    align-items: center;
    h3 {
    color: #666666;
    margin-bottom: 2rem;
    }
    button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
        &:hover {
            transform: translateY(-3px);
        }
    }
`;

export const LogoWrapper = styled.div`
    img {
    height: 6rem;
    }
    h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 22px;
    padding-top: 50px;
    }
    h4 {
        color: #FA8072;
        font-size: 15px;
        text-align: center;

    }
    span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
    }
`;

export const Container = styled.div`
    min-width: 400px;
    backdrop-filter: blur(35px);
    background-color: rgba(255, 255, 255, 0.8);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2rem;
    @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
    }
    h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
        span {
            color: #ff8d8d;
            cursor: pointer;
        }
    }
        `;
export const InputContainer = styled.div`
    justify-content: center;
    align-items: center;
    width:350px; 
    max-width:350px; 
    display: inline-block;
`;

export const StyledInput = styled.input`
    width: 75%;
    max-width: 350px;
    min-width: 150px;
    height: 40px;
    border: none;
    margin: 0.5rem 0;
    margin-left: 30px;

    background-color: #f5f5f5;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;
    &:hover {
        transform: translateY(-3px);
    }
`;
export const Errors = styled.p`
    padding: 0 1rem;
    text-align: center;
    font-size: 12px;
    color: red;
    font-weight: 300;
`;


export const MainContainer = styled.div`
    background: #daeee5;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
`;