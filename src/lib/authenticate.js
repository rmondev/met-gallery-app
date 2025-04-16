import { jwtDecode } from 'jwt-decode';

export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password, password2: password2}),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(data.message);
    }
}

export async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
}

function setToken(token) {
  localStorage.setItem('access_token', token);
  window.dispatchEvent(new Event('token-change')); // 👈 triggers reactivity in MainNav
}



export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (err) {
    return null;
  }
}


export function removeToken() {
    localStorage.removeItem('access_token');
}


// export function readToken() {
//   try {
//     const token = getToken();
//     console.log("Inside readToken()")
//     console.log("Jwt token: ", jwtDecode(token))
//     return token ? jwtDecode(token) : null;

    
//   } catch (err) {
//     // Error is triggered here
//     console.log("Error Territory: ", err)
//     return null;
//   }
// }

export function readToken() {
  try {
    const token = getToken();

    if (!token || typeof token !== 'string') {
      return null;
    }

    return jwtDecode(token);
  } catch (err) {
    console.log("JWT Token Decode Error", err);
    return null;
  }
}


export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}

