
import axios from 'axios';

export const USER_PROFILE_UPDATE = 'profile_update';

export function profileUpdate(values, callback) {
  console.log('inside  user profile update action creator');
  console.info('profile_update_values', values);
  // const payload_response_data;
  const request = axios.post('http://localhost:3001/update', values, { withCredentials: true });

  return (dispatch) => {
    request.then(
      ({ data }) => {
        console.log('Inside the profile update dispatcher function');
        console.log(data);
        callback(data);
        if (data.success) {
          dispatch({
            type: USER_PROFILE_UPDATE,
            payload: data,
          });
        }
      },
    );
  };
}

export function uploadFile(payload, callback) {
  console.log('Inside the upload functionality');
  const request = fetch('http://localhost:3001/files/upload', {
    method: 'POST',
    body: payload,
    credentials: 'include',
    headers: {
      Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    },
  });
  return (dispatch) => {
    request.then((res) => {
      console.info('response', res);
      res.json().then((data) => {
        console.log(data.filename);
        if (data.filename !== undefined) {
          callback(data.filename);
        } else {
          callback(false);
        }
      });
    }).catch((error) => {
      console.log('There is an error during Uploading of File');
      return error;
    });
    /*
                return {
                    type: CREATE_USER,
                    payload: request
                }; */
  };
}
