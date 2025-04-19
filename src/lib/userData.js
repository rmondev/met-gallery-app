import { getToken } from "./authenticate";

async function makeApiRequest(url, method, body = null) {

  console.log('JWT Token: ', getToken())
  const headers = {
    'content-type': 'application/json',
    'Authorization': `JWT ${getToken()}`
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(url, options);
  const text = await res.text(); // try parsing as text first
  console.log(`[${method}] ${url} → Status: ${res.status}, Raw Response:`, text);

  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.warn("Failed to parse JSON:", err);
    data = null;
  }

  if (res.status === 200) {
    return data;
  } else {
    throw new Error(`Request failed with status: ${res.status}, body: ${text}`);
  }
}


export async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_USER_API_URL}/favourites/${id}`;
  return makeApiRequest(url, 'PUT');
}

export async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_USER_API_URL}/favourites/${id}`;
  return makeApiRequest(url, 'DELETE');
}

export async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_USER_API_URL}/favourites`;
  return makeApiRequest(url, 'GET');
}

export async function addToHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_USER_API_URL}/history/${id}`;
  return makeApiRequest(url, 'PUT');
}

export async function removeFromHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_USER_API_URL}/history/${id}`;
  return makeApiRequest(url, 'DELETE');
}

export async function getHistory() {
  const url = `${process.env.NEXT_PUBLIC_USER_API_URL}/history`;
  return makeApiRequest(url, 'GET');
}
