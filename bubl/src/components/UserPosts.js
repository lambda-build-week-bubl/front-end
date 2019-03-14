import React, { Component } from "react";
import { connect } from "react-redux";
// components
import Post from "./Post";
// actions
import { getPostsStart } from "../actions";

class UserPosts extends Component {
  componentDidMount() {
    this.props.getPostsStart();
  }
  render() {
    console.log(this.props);
    if (this.props.userPosts) {
      return (
        <section className="posts">
          {this.props.userPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </section>
      );
    }
    return <div />;
  }
}

const mapStateToProps = ({ userPosts }) => {
  return {
    userPosts
  };
};

export default connect(
  mapStateToProps,
  { getPostsStart }
)(UserPosts);
