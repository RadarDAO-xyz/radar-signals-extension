import { FC, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";
import sendAnother from "../../assets/images/Send_button.png";

interface PropTypes {
  jumpStage: (_stageName: string) => void;
  setsignalComment: (value: string) => void;
  setselectedChannel: (value: string | null) => void;
}

export const SuccessPage = ({ jumpStage, setsignalComment, setselectedChannel }: PropTypes) => {
  return (
    <Wrapper>
      <div className="box box-success">
        <p className="success-head">SIGNAL SHARED SUCCESSFULLY</p>
        <p className="success-message">
          Thank you for powering the future of futures 💜🔮
        </p>
      </div>
      <div>
        <button 
          type="button" 
          className="button btn-select"
          onClick={()=> {
            window.open('https://discord.com/invite/xYCq3VGjhM', '_blank');
          }}
        >
          Continue in Discord →
        </button>
      </div>

      <button
        className="button btn-send btn-send-another"
        type="button"
        onClick={() => {
          setsignalComment("")
          jumpStage("compose");
          setselectedChannel(null)
        }}
      >
        SEND ANOTHER
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .button {
    font-family: 'PostGrotesk';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin-top:18px;
    width: 269px;
    height: 100px;
    background: #fff;
    padding: 22px 0;
    background: #FFFFFF;
    border: 0.965581px solid #000000;
    cursor: pointer;
    width: 80%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    height: 68px;
    width: 269px;
    &:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }

  .btn-send {
    background: #000;
    color: #fff;
    margin-top: 18px;
    font-family: "MicrogrammaExtdD"!important;
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
  }

  .btn-send-another:hover {
    background: url(${sendAnother});
    border: 0.903246px solid #000000;
  }

  .button:disabled{
    background: #7C7A7A;
    cursor : not-allowed;
    border:none;
  }

  .box {
    background: #fff;
    padding: 7.15px;
    border: 0.903246px solid #000000;
    width: 269px;
    height: 100px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
    margin: 18px 5px 0px 5px;
    display: "flex";
    flex-direction: "column";
  }
  .box-success{
    height: 184.63px!important;
  }
  .success-head {
    font-family:  "MicrogrammaExtdD"!important;
    font-style: normal;
    font-weight: 700;
    font-size: 20.7864px;
    line-height: 27px;
    text-align: center;
    color: #000000;
  }

  .success-message {
    font-family: 'WonderType';
    font-style: normal;
    font-weight: 400;
    font-size: 15.2841px;
    line-height: 135.5%;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
  }

`;
