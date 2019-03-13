import React from "react";
import { connect } from "react-redux";
import { getBublPosts } from "../actions";
import { addPost, getUserInfo, getSchoolBubls, joinBubl } from "../actions";
import Post from "./Post";

class PostList extends React.Component {
  state = {
    postData: {
      user_id: "",
      post_content: "",
      bubbles: ""
    }
  };

  componentDidMount() {
    // if the posts don't exist on the store, get them
    if (!this.props.bublPosts && !this.props.error) {
      this.props.getBublPosts(this.props.match.params.id);
    }
    // if the user info doesn't exist on the store, get it, set the userid on component state. If user info does exist, just set the user id on component state
    if (!this.props.userInfo) {
      this.props.getUserInfo().then(() =>
        this.setState({
          postData: {
            ...this.state.postData,
            user_id: this.props.userInfo.id
          }
        })
      );
    } else {
      this.setState({
        postData: {
          ...this.state.postData,
          user_id: this.props.userInfo.id
        }
      });
    }
    // if all the bubls don't exist on the store, get them
    if (!this.props.allSchoolBubls) {
      this.props.getSchoolBubls();
    }
    this.setState({
      postData: {
        ...this.state.postData,
        bubbles: [Number(this.props.match.params.id)]
      }
    });
  }
  // handle form change
  handleChange = e => {
    this.setState({
      postData: {
        ...this.state.postData,
        [e.target.name]: e.target.value
      }
    });
  };
  // add post on submit
  addPost = e => {
    e.preventDefault();
    console.log(this.state.postData);
    this.props.addPost(this.state.postData);
    this.setState({ newPost: "" });
  };
  // handle clicking join
  handleJoin = (e, id) => {
    e.preventDefault();
    this.props.joinBubl(id);
  };

  render() {
    // wait to render until all the needed data exists in the store
    if (
      this.props.bublPosts &&
      this.props.allSchoolBubls &&
      this.props.userInfo
    ) {
      // get the bubble name, call it bubble
      const bubble = this.props.allSchoolBubls.filter(
        bubl => bubl.id === Number(this.props.match.params.id)
      )[0].bubble;
      return (
        <div className="post-list">
          {/* Look through the userinfo bubbles array: if it contains a bubble that matches this bubble, don't show the join button */}
          {this.props.userInfo.bubbles.filter(
            bubl => bubl.id === Number(this.props.match.params.id)
          ).length === 0 && (
            <button
              onClick={e =>
                this.handleJoin(e, Number(this.props.match.params.id))
              }
            >
              Join
            </button>
          )}
          <h2>{bubble}</h2>
          {this.props.bublPosts.map(post => (
            <Post post={post} key={post.id} />
          ))}
          <textarea
            className="post-input"
            type="text"
            name="post_content"
            value={this.state.post_content}
            onChange={this.handleChange}
            maxLength="256"
          />
          <button onClick={this.addPost}>add post</button>
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = ({ bublPosts, error, userInfo, allSchoolBubls }) => ({
  bublPosts,
  error,
  userInfo,
  allSchoolBubls
});

export default connect(
  mapStateToProps,
  { getBublPosts, addPost, getUserInfo, getSchoolBubls, joinBubl }
)(PostList);
