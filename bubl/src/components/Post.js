import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
// actions
import {
  addComment,
  getBublPosts,
  removeComment,
  getUserInfo,
  deletePost,
  getPostsStart
} from "../actions";
// components
import UpdateForm from "./UpdateForm";
import MainError from "./MainError";
import BlockLoader from "./BlockLoader";
import BlockError from "./BlockError";

// set deleting and updating loading and error in the local state so that only the post that is being acted on displays the error or loader: otherwise every post in the list shows it
class Post extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        post_id: this.props.post.id,
        comment: ""
      },
      user: "",
      userId: "",
      showForm: false,
      postContent: "",
      deleting: false,
      error: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
    // set the postContent to the post content passed down in props
    this.setState({
      ...this.state,
      postContent: this.props.post.post_content
    });
    // get the user info if it doesn't exist in the store, if it does exist in the store just set it to component state
    if (!this.props.userInfo) {
      this.props.getUserInfo().then(() => {
        if (this._isMounted) {
          this.setState({
            user: this.props.userInfo.name,
            userId: this.props.userInfo.id
          });
        }
      });
    } else {
      if (this._isMounted) {
        this.setState({
          user: this.props.userInfo.name,
          userId: this.props.userInfo.id
        });
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  // handle comment form change
  handleChange = e => {
    e.preventDefault();
    if (this._isMounted) {
      this.setState({
        newComment: {
          ...this.state.newComment,
          [e.target.name]: e.target.value
        }
      });
    }
  };
  // handle add comment
  handleSubmit = e => {
    e.preventDefault();
    this.props
      .addComment(this.state.newComment)
      .then(() => {
        if (!this.props.error) {
          this.getData();
        }
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({
            newComment: {
              ...this.state.newComment,
              comment: ""
            }
          });
        }
      });
  };
  // handle remove comment
  removeComment = (e, id) => {
    e.preventDefault();
    this.props.removeComment(id).then(() => {
      if (!this.props.error) {
        this.getData();
      }
    });
  };
  // handle remove post
  deletePost = (e, id) => {
    e.preventDefault();
    this.setState({ deleting: true });
    this.props
      .deletePost(id)
      .then(() => {
        this.getData();
        if (this._isMounted) {
          this.setState({ error: this.props.deletePostError });
        }
      })
      .then(() => this.setState({ deleting: false }));
  };
  // this opens the update form
  handleClickUpdate = () => {
    if (this._isMounted) {
      this.setState({ showForm: !this.state.showForm });
    }
  };
  // this is for update form to call to update the post in this component
  updatePostContent = content => {
    if (this._isMounted) {
      this.setState({ ...this.state, postContent: content });
    }
  };
  // after adding or deleting a post or content we have to get the data again
  getData = () => {
    // if params.id is undefined get the user data, else get the bubl post data
    if (!this.props.match.params.id) {
      this.props.getPostsStart();
    } else {
      this.props.getBublPosts(this.props.post.bubbles[0].id);
    }
  };
  render() {
    const {
      post_content,
      updated_at,
      created_at,
      comments,
      name,
      user_id,
      id,
      bubbles
    } = this.props.post;
    // if there is an updated timestamp use that, otherwise use the created at timestamp
    const postTimestamp = updated_at
      ? moment(updated_at).fromNow()
      : moment(created_at).fromNow();
    if (this.props.error) {
      return <MainError text="Whoops, something went wrong" />;
    }
    // if updating, show the form
    if (this.state.showForm) {
      return (
        <UpdateForm
          showForm={this.handleClickUpdate}
          postContent={post_content}
          postId={id}
          bubbles={bubbles}
          updatePostContent={this.updatePostContent}
        />
      );
    }
    if (this.props.deletingPost && this.state.deleting) {
      return <BlockLoader />;
    }
    return (
      <div className="post">
        <p className="post-content">
          {/* post owner name: when post is created from postlist it comes with a name property, so use that. if post is created from the userposts it doesn't have a name property, so use the current user's name */}
          <span className="name">{name ? name : this.props.userInfo.name}</span>

          {/* post content */}
          {this.state.postContent}

          {/* moment library to create a 'how long ago' timestamp */}
          <span className="timestamp">{postTimestamp}</span>

          {/* if the post belongs to the logged in user, display the delete and update post buttons */}
          {(this.state.user === name || this.state.userId === user_id) && (
            <>
              <button
                className="delete-post"
                onClick={e => this.deletePost(e, id)}
              >
                <i className="fas fa-trash-alt" />
              </button>
              <button className="update-post" onClick={this.handleClickUpdate}>
                <i className="fas fa-edit" />
              </button>
            </>
          )}
        </p>
        {this.props.commentLoading ? (
          <BlockLoader />
        ) : (
          <>
            {/* if the comments exist, map over them */}
            {comments &&
              comments.map(comment => (
                <p className="comment" key={comment.id}>
                  {/* commenter name */}
                  <span className="comment-user">{comment.name} </span>

                  {/* comment content */}
                  {comment.comment}

                  {/* timestamp from moment */}
                  <span className="timestamp">
                    {moment(comment.created_at).fromNow()}
                  </span>

                  {/* if the comment belongs to the logged in user display the delete comment button */}
                  {this.state.user === comment.name && (
                    <button
                      className="delete-post"
                      onClick={e => this.removeComment(e, comment.id)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  )}
                </p>
              ))}
          </>
        )}
        {this.state.error && this.props.deletePostError && (
          <BlockError text="We're sorry, we couldn't delete that post" />
        )}
        {/* add a comment form */}
        <form className="add-comment" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="comment"
            value={this.state.newComment.comment}
            onChange={this.handleChange}
          />
          <button>Add Comment</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({
  userInfo,
  updatedPost,
  error,
  commentLoading,
  deletingPost,
  deletePostError
}) => ({
  userInfo,
  updatedPost,
  error,
  commentLoading,
  deletingPost,
  deletePostError
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      addComment,
      getBublPosts,
      removeComment,
      getUserInfo,
      deletePost,
      getPostsStart
    }
  )(Post)
);
