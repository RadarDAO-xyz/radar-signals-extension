import { FC, ReactFragment, ReactPortal } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import channelData from "../../data/.test.channels.json";

// interface IRadarChannelItem {
//   name: string;
//   category: string;
//   id: string;
//   webhook: string; //URL;
// }

// interface IRadarChannels {
//   channels: IRadarChannelItem[];
// }
interface IFormValues {
  username: string;
  url: string;
  comment: string;
  radarChannel: string;
  date: string;
}

const { channels } = channelData;

export const Share: FC = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .required()
      .matches(
        /^.{3,32}#[0-9]{4}$/,
        "C'mon; that's not a Discord handle/username"
      )
      .required("Discord handle required"),
    url: Yup.string()
      .required("Add a URL"),
    radarChannel: Yup.string().required("Choose a channel"),
    // TODO - Enable the following if multiple options can be selected
    // channel: Yup.mixed().test("arraySize", "Select at least one channel", (value) => value.length > 0),
    comment: Yup.string()
      .min(2, "Too Short!")
      .max(255, "Too Long!")
      .required("Add a comment"),
    date: Yup.date().default(() => new Date()),
  });

  const initialValues: IFormValues = {
    username: "",
    url: "",
    radarChannel: "", // channels: [], // Question: can you post to multiple channels?
    comment: "",
    date: `${new Date()}`,
  };

  const onSubmitForm = (values: IFormValues) => {
    setTimeout(() => {
      const { username, url, radarChannel, comment, date } = values;
      console.log(
        JSON.stringify({ username, url, radarChannel, comment, date }, null, 2)
      );
      const selectedChannel:any = channels.find(
        (channel) => channel.id === radarChannel
      );
      alert(JSON.stringify(selectedChannel));
      sendFormDataHook({username: username, url: url, comment: comment, date: date, ...selectedChannel});
    }, 500);
  };

  const sendFormDataHook = (formData: { username: string; url: string; comment: string; date: string; name: string; category: string; id: string; webhook: string; }) => {

    const { username, url, comment, date, name, category, id, webhook } = formData

    function listener(this: any) {
      console.log("Web Hook Repsonse", this.responseText);
    }
    const xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener("load", listener);
    xhrRequest.open(
      "POST",
      webhook
    );
    xhrRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    xhrRequest.send(
      JSON.stringify({
        username: username, 
        avatar_url: "", 
        content: `URL: ${url}\n\nComment: ${comment}\n\nDate: ${date}`
      }));
  };

  const renderError = (
    message: boolean | ReactFragment | ReactPortal | null | undefined
  ) => <p className="help is-danger">{message}</p>;

  return (
    <StyledForm>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: IFormValues /*, { resetForm }*/) => {
          onSubmitForm(values);
          // resetForm()
        }}
      >
        <Form>
          <div className="field">
            <label className="label" htmlFor="username">
              Discord
            </label>
            <div className="control">
              <Field
                type="text"
                name="username"
                placeholder="e.g. LeslieOA#5130"
              />
              <ErrorMessage name="username" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="url">
              URL
            </label>
            <div className="control">
              <Field
                type="text"
                name="url"
                placeholder="e.g. https://hypercore-protocol.org/"
              />
              <ErrorMessage name="url" render={renderError} />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="radarChannel">
              Channel
            </label>
            <div className="control">
              <Field
                name="radarChannel"
                as="select"
                className="select is-fullwidth"
              >
                <option value={""} disabled>
                  Select a channel
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
              <ErrorMessage name="radarChannel" render={renderError} />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="comment">
              Comment
            </label>
            <div className="control">
              <Field
                component="textarea"
                name="comment"
                placeholder="e.g. This website is hosted on IPFS"
              />
              <ErrorMessage name="comment" render={renderError} />
            </div>
          </div>

          <div className="field button-container">
            <button type="submit">Share</button>
          </div>
        </Form>
      </Formik>
    </StyledForm>
  );
};

// TODO - Move to ./style as SC
const StyledForm = styled.div`

  padding: 15px;

  form {
    /* outline: 1px solid red; */
    width: 100%;
  }
  fieldset {
    /* outline: 1px solid green; */
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, [col-start] 1fr);
    grid-template-areas:
      "label"
      "input";
    gap: var(--m-base);
  }
  label {
    grid-area: "label";
  }
  input {
    grid-area: "input";
  }
`;
