import React, { Component } from 'react';
import '../css/CommentInput.css';

const moment = require('moment');

const ComponentInputClass = class ComponentInput extends Component {
  static defaultProps = {
    username: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: '',
    };
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  handleUsernameBlur = (event) => {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value);
    }
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      // 用moment替换Date
      // const key = Date.parse(new Date()) / 1000;
      const key = moment().format('x');
      this.props.onSubmit({ username, content, key });
    }
    this.setState({
      content: '',
    });
    this.textarea.focus();
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名:</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameBlur}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容:</span>
          <div className="comment-field-input">
            <textarea
              ref={(textarea) => { this.textarea = textarea; return this.textarea; }}
              value={this.state.content}
              onChange={this.handleContentChange}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    );
  }
};

export default ComponentInputClass;
