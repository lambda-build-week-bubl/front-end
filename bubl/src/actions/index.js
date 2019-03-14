import axios from "axios";

// LOGIN
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
// SIGN UP
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
// GET SCHOOLS
export const GETSCHOOLS_START = "GETSCHOOLS_START";
export const GETSCHOOLS_SUCCESS = "GETSCHOOLS_SUCCESS";
export const GETSCHOOLS_FAILURE = "GETSCHOOLS_FAILURE";
// GET USER POSTS
export const GETPOSTS_START = "GETPOSTS_START";
export const GETPOSTS_SUCCESS = "GETPOSTS_SUCCESS";
export const GETPOSTS_FAILURE = "GETPOSTS_FAILURE";
// GET USER INFO
export const GETUSERINFO_START = "GETUSERINFO_START";
export const GETUSERINFO_SUCCESS = "GETUSERINFO_SUCCESS";
export const GETUSERINFO_FAILURE = "GETUSERINFO_FAILURE";
// GET BUBLS FOR SCHOOL
export const GETSCHOOLBUBLS_START = "GETSCHOOLBUBLS_START";
export const GETSCHOOLBUBLS_SUCCESS = "GETSCHOOLBUBLS_SUCCESS";
export const GETSCHOOLBUBLS_FAILURE = "GETSCHOOLBUBLS_FAILURE";
// GET POSTS FOR BUBL
export const GETBUBLPOSTS_START = "GETBUBLPOSTS_START";
export const GETBUBLPOSTS_SUCCESS = "GETBUBLPOSTS_SUCCESS";
export const GETBUBLPOSTS_FAILURE = "GETBUBLPOSTS_FAILURE";
// JOIN BUBL
export const JOINBUBL_START = "JOINBUBL_START";
export const JOINBUBL_SUCCESS = "JOINBUBL_SUCCESS";
export const JOINBUBL_FAILURE = "JOINBUBL_FAILURE";
// LEAVE BUBL
export const LEAVEBUBL_START = "LEAVEBUBL_START";
export const LEAVEBUBL_SUCCESS = "LEAVEBUBL_SUCCESS";
export const LEAVEBUBL_FAILURE = "LEAVEBUBL_FAILURE";
// GET ALL POSTS FOR SCHOOL
export const GETSCHOOLPOSTS_START = "GETSCHOOLPOSTS_START";
export const GETSCHOOLPOSTS_SUCCESS = "GETSCHOOLPOSTS_SUCCESS";
export const GETSCHOOLPOSTS_FAILURE = "GETSCHOOLPOSTS_FAILURE";
// ADD POST
export const ADD_POST_START = "ADD_POST_START";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
// ADD COMMENT
export const ADD_COMMENT_START = "ADD_COMMENT_START";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
// REMOVE COMMENT
export const REMOVE_COMMENT_START = "REMOVE_COMMENT_START";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";
// REMOVE POST
export const REMOVE_POST_START = "REMOVE_POST_START";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
// UPDATE POST
export const UPDATE_POST_START = "UPDATE_POST_START";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";
// CLEAR UPDATED POST
export const CLEAR_UPDATED_POST = "CLEAR_UPDATED_POST";
// CLEAR ERROR
export const CLEAR_ERROR = "CLEAR_ERROR";
// LOG OUT
export const LOG_OUT = "LOG_OUT";

// LOGIN
export const loginStart = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://build-week-bubl.herokuapp.com/auth/login", creds)
    .then(res => {
      localStorage.setItem("userToken", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err =>
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message })
    );
};

// GET SCHOOLS
export const getSchoolsStart = info => dispatch => {
  dispatch({ type: GETSCHOOLS_START });
  return axios
    .get("https://build-week-bubl.herokuapp.com/api/schools", info)
    .then(res => dispatch({ type: GETSCHOOLS_SUCCESS, payload: res.data }))
    .catch(err => {
      console.error(err);
      dispatch({ type: GETSCHOOLS_FAILURE });
    });
};

// SIGN UP
export const signUpStart = info => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axios
    .post("https://build-week-bubl.herokuapp.com/auth/register", info)
    .then(res => dispatch({ type: SIGNUP_SUCCESS }))
    .catch(err => {
      console.log(err.response);
      dispatch({ type: SIGNUP_FAILURE, payload: err.response.data.message });
    });
};

// GET USER POSTS
export const getPostsStart = () => dispatch => {
  dispatch({ type: GETPOSTS_START });
  axios
    .get("https://build-week-bubl.herokuapp.com/api/posts", {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETPOSTS_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({ type: GETPOSTS_FAILURE, payload: err.response.data.message })
    );
};
// GET USER INFO
export const getUserInfo = () => dispatch => {
  dispatch({ type: GETUSERINFO_START });
  return axios
    .get("https://build-week-bubl.herokuapp.com/api/users/me", {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETUSERINFO_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GETUSERINFO_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const getBublPosts = id => dispatch => {
  dispatch({ type: GETBUBLPOSTS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/posts/filter/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: GETBUBLPOSTS_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GETBUBLPOSTS_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const getSchoolBubls = () => dispatch => {
  dispatch({ type: GETSCHOOLBUBLS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/bubbles`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: GETSCHOOLBUBLS_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GETSCHOOLBUBLS_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const joinBubl = id => dispatch => {
  dispatch({ type: JOINBUBL_START });
  return axios
    .post(
      `https://build-week-bubl.herokuapp.com/api/bubbles/join/${id}`,
      null,
      {
        headers: {
          Authorization: localStorage.getItem("userToken")
        }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({ type: JOINBUBL_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: JOINBUBL_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const leaveBubl = id => dispatch => {
  dispatch({ type: LEAVEBUBL_START });
  return axios
    .delete(
      `https://build-week-bubl.herokuapp.com/api/bubbles/leave/${id}`,

      {
        headers: {
          Authorization: localStorage.getItem("userToken")
        }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({ type: LEAVEBUBL_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: LEAVEBUBL_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const getSchoolPosts = () => dispatch => {
  dispatch({ type: GETSCHOOLPOSTS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/posts/school`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: GETSCHOOLPOSTS_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GETSCHOOLPOSTS_FAILURE,
        payload: err.response.data.message
      })
    );
};

export const addPost = newPost => dispatch => {
  dispatch({ type: ADD_POST_START });
  return axios
    .post(`https://build-week-bubl.herokuapp.com/api/posts`, newPost, {
      headers: { Authorization: localStorage.getItem("userToken") }
    })
    .then(res => {
      dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_POST_FAILURE, payload: err.response.data.message });
    });
};
export const addComment = newComment => dispatch => {
  dispatch({ type: ADD_COMMENT_START });
  return axios
    .post(`https://build-week-bubl.herokuapp.com/api/comments`, newComment, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload: err.response.data.message
      })
    );
};

export const removeComment = id => dispatch => {
  dispatch({ type: REMOVE_COMMENT_START });
  return axios
    .delete(`https://build-week-bubl.herokuapp.com/api/comments/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({ type: REMOVE_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: REMOVE_COMMENT_FAILURE,
        payload: err.response.data.message
      });
    });
};
export const removePost = id => dispatch => {
  dispatch({ type: REMOVE_POST_START });
  return axios
    .delete(`https://build-week-bubl.herokuapp.com/api/posts/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: REMOVE_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: REMOVE_POST_FAILURE,
        payload: err.response.data.message
      });
    });
};
export const updatePost = (id, newInfo) => dispatch => {
  dispatch({ type: UPDATE_POST_START });
  return axios
    .put(`https://build-week-bubl.herokuapp.com/api/posts/${id}`, newInfo, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: err.response.data.message
      });
    });
};
export const clearUpdatedPost = () => dispatch => {
  dispatch({ type: CLEAR_UPDATED_POST });
};
export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};
export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT });
  return localStorage.clear();
};
