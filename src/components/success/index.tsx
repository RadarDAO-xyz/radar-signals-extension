import { FC, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";

interface PropTypes {
  jumpStage: (_stageName: string) => void;
}

export const SuccessPage = ({ jumpStage }: PropTypes) => {
  return (
    <Wrapper>
      <div className="box box-success">
        <p className="success-head">SIGNAL SHARED SUCCESSFULLY</p>
        <p className="success-message">
          Thank you for powering the future of futures 💜🔮
        </p>
      </div>
      <div>
        <button type="button" className="button btn-select">
          Continue in Discord →
        </button>
      </div>

      <button
        className="button btn-send btn-send-another"
        type="button"
        onClick={() => {
          jumpStage("compose");
        }}
      >
        SEND ANOTHER
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
