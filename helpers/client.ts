import { AuthTokenResponse } from "./types";

const decodeResponse = (jason: {body: string}) => {
    const { body } = jason;
   return JSON.parse(atob(body));
}

export const getToken = async (): Promise<AuthTokenResponse> => {
  const response = await fetch(`http://localhost:8080/v1/new`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${await response.json()}`);
  }
  return await response.json();
};

export const getEffectsList = async (): Promise<string[]> => {
  const auth_token = localStorage.getItem("auth_token");
  if (!auth_token) throw new Error("No auth token found");
  const response = await fetch(
    `http://localhost:8080/v1/${auth_token}/effects/effectsList`
  );
  if (!response.ok) {
    throw new Error(`${response.status} ${await response.json()}`);
  }
  return decodeResponse(await response.json());
};

export const putSelectEffect = async (effect: string) => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) throw new Error("No auth token found");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = `{"select" : "${effect}"}`;

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
    };

    const response = await fetch(`http://localhost:8080/v1/${authToken}/effects`, requestOptions);
    if(!response.ok) {
        throw new Error(`${response.status} ${await response.json()}`);
    }
}
