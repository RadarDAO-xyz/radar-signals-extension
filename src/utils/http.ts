export const http = (
  method: string,
  url: URL,
  header: string,
  data: any
) => {
  function listener(this: any) {
    console.log("Web Hook Repsonse", this.responseText);
  }

  const xhrRequest = new XMLHttpRequest();
  xhrRequest.addEventListener("load", listener);
  xhrRequest.open(method, url);
  xhrRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhrRequest.send(JSON.stringify(data));
};
