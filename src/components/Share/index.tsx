import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import styled from "styled-components";

interface Values {
  username: string;
  userComment: string;
  radarChannel: string;	
}

export const Share: FC = () => {
  return (
    <StyledForm>
      <Formik
        initialValues={{
          username: "",
          userComment: "",
          radarChannel: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <fieldset>
            <label htmlFor="username">Discord Username</label>
            <Field
              id="username"
              name="username"
              placeholder="e.g. LeslieOA#5130"
            />
          </fieldset>

          <fieldset>
						<label htmlFor="radarChannel">Channel</label>
            <Field id="radarChannel" name="radarChannel" as="select">
              <option selected disabled>Select</option>
              <option value="001">Channel 1</option>
              <option value="002">Channel 2</option>
              <option value="003">Channel 3</option>
            </Field>
          </fieldset>

          <fieldset>
            <label htmlFor="userComment">Comment</label>
            <Field
              as="textarea"
              id="userComment"
              name="userComment"
              placeholder=""
            />
          </fieldset>

          <button type="submit">Share</button>
        </Form>
      </Formik>
    </StyledForm>
  );
};


// TODO - Move to ./style as SC
const StyledForm = styled.div`
	form {
		outline: 1px solid red;
	}
	fieldset {
		outline: 1px solid green;
		display: grid;
		grid-template-areas:  "label"
													"input";
	}
	label {
		grid-area: "label";
	}
	input {
		grid-area: "input";
	}
`