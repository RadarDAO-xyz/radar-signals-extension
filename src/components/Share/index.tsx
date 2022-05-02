import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import styled from "styled-components";

import channelData from "../../data/.test.channels.json";
import * as Yup from "yup";

interface IShareFormValues {
  username: string;
  userComment: string;
  radarChannel: string;
}
interface IRadarChannels {
  channels: IRadarChannelItem[];
}
interface IRadarChannelItem {
  name: string;
  category: string;
  id: string;
  webhook: URL;
}

interface IFormValues {
	username: string;
	userComment: string;
	radarChannel: string;
}

const { channels } = channelData;



const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "too short")
    .max(8, "too long")
    .required("needed")
});

/**
 * Yup.object().shape({
 *   username: Yup.string().required().matches(/^.{3,32}#[0-9]{4}$/, "Discord handle required")
 * })}
 */


export const Share: FC = () => {
  return (
    <StyledForm>
      <Formik
        initialValues={{
          username: "",
          userComment: "",
          radarChannel: "DEFAULT",
        }}
				// validate={(values) => {
				// 	const { username, userComment, radarChannel } = values
				// 	const errors:Partial<IFormValues> = { }

				// 	// if (username.match(/^.{3,32}#[0-9]{4}$/)) console.log("Valid Discord")
				// 	if (!username.length) errors.username = "What's your Discord handle?"

				// 	return errors
					
				// }}
				validationSchema={validationSchema}
        onSubmit={(
          values: IShareFormValues,
          { setSubmitting }: FormikHelpers<IShareFormValues>
        ) => {
          setTimeout(() => {
            const { username, userComment, radarChannel } = values;
            alert(
              JSON.stringify({ username, userComment, radarChannel }, null, 2)
            );
            setSubmitting(false);
            const selectedChannel = channels.find(
              (channel) => channel.id === radarChannel
            );
            alert(JSON.stringify(selectedChannel));
            // http()
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
              <option value={`DEFAULT`} disabled>
                Select
              </option>
              {channels.map((channel) => {
                const { name, id } = channel;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
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
    /* outline: 1px solid red; */
  }
  fieldset {
    /* outline: 1px solid green; */
    display: grid;
    grid-template-areas:
      "label"
      "input";
  }
  label {
    grid-area: "label";
  }
  input {
    grid-area: "input";
  }
`;
