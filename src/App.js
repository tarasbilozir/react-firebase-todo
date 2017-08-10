import React from 'react';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      leftImageSrc: '',
      rightImageSrc: '',
      left: 0,
      right: 0,
      todos: {}
    };

    this.addComment = this.addComment.bind(this);
    this.addRatingForLeft = this.addRatingForLeft.bind(this);
    this.addRatingForRight = this.addRatingForRight.bind(this);
  }
  componentDidMount() {
    const dbTodosRef = firebase.database().ref().child('comments');
    const dbLeftRef = firebase.database().ref().child('left');
    const dbRightRef = firebase.database().ref().child('right');

    dbTodosRef.on('value', (snapshot) => {
      this.setState({ todos: snapshot.val() });
    });

    dbLeftRef.on('value', (snapshot) => {
      this.setState({ left: snapshot.val() });
    });

    dbRightRef.on('value', (snapshot) => {
      this.setState({ right: snapshot.val() });
    });
  }
  addComment() {
    const dbTodosRef = firebase.database().ref().child('comments');


    dbTodosRef.push(this.todoInput.value, (err) => {
      if (!err) {
        this.todoInput.value = '';
      }
    });
  }
  addRatingForLeft() {
    firebase.database().ref().update({ left: this.state.left + 1 });
  }
  addRatingForRight() {
    firebase.database().ref().update({ right: this.state.right + 1 });
  }
  removeVotes() {
    firebase.database().ref().update({ left: 0, right: 0 });
  }
  uploadFile(leftOrRight, event) {
    const f = event.target.files[0];
    const fr = new FileReader();

    fr.onload = (event2) => {
      this.setState({ [`${leftOrRight}ImageSrc`]: event2.target.result });
    };

    fr.readAsDataURL(f);
  }
  render() {
    const { left, right, leftImageSrc, rightImageSrc } = this.state;
    const leftImagePercent = left + right !== 0 ? ((left / (left + right)) * 100).toFixed(0) : 50;
    const rightImagePercent = left + right !== 0 ? ((right / (left + right)) * 100).toFixed(0) : 50;

    return (
      <div>
        <img src={leftImageSrc} onClick={this.addRatingForLeft} style={{ left: 0 }} />
        <img src={rightImageSrc} onClick={this.addRatingForRight} style={{ right: 0 }} />
        {/* eslint-disable */}
        {!leftImageSrc ?
        <div style={{ left: 0 }}>
          <img onClick={() => { this.fileInputLeft.click(); }} src="https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-3-128.png"/>
          <input ref={(node) => { this.fileInputLeft = node; }} style={{ display: 'none' }} type="file" onChange={this.uploadFile.bind(this, 'left')} />
        </div>
        : null}
        {!rightImageSrc ?
        <div style={{ right: 0 }}>
          <img onClick={() => { this.fileInputRight.click(); }} src="https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Add-3-128.png"/>
          <input ref={(node) => { this.fileInputRight = node; }} style={{ display: 'none' }} type="file" onChange={this.uploadFile.bind(this, 'right')} />
        </div>
        : null}
        {/* eslint-enable */}
        <br />
        {leftImageSrc && rightImageSrc ? `Left image: ${leftImagePercent}%` : null}<br />
        {rightImageSrc && leftImageSrc ? `Right image: ${rightImagePercent}%` : null}<br />
        {rightImageSrc && leftImageSrc ? <button onClick={this.removeVotes}>Remove votes</button> : null}
        <h3><b>Comments:</b></h3>
        <input type="text" ref={(todoInput) => { this.todoInput = todoInput; }} /><button onClick={this.addComment}>Send</button>
        {Object.keys(this.state.todos).reverse().map(todo => <div key={todo}>{this.state.todos[todo]}</div>)}
      </div>
    );
  }
}
