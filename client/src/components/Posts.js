import React, { useState, useEffect, useRef } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TextField, Button, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { SignalCellularNullOutlined } from '@material-ui/icons';
import { AiOutlineComment } from 'react-icons/ai';
import './Posts.css';
import { color } from '@material-ui/system';
import { blue, red } from '@material-ui/core/colors';
const Posts = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));
  const classes = useStyles();
  const formRef = useRef();
  const initialState = {
    postName: '',
    postText: '',
  };
  const [createPost, setCreatePost] = useState(false);
  //  const [toggleComments, setToggleComments] = useState(false);
  //  const toggleCommentsFunc = () => {
  //   setToggleComments(!toggleComments);
  //  };
  const toggleCreatePost = () => {
    setCreatePost(!createPost);
  };
  const [values, setValues] = useState(initialState);
  const [newComments, setNewComments] = useState({ 1: '', 2: '' });
  //  const [colors, setColors] = useState({
  //   likeColor: '',
  //   dislikeColor: '',
  //   commentsColor: 'green',
  //  });
  //   const [newComments, setNewComments] = useState([
  //     { id: 1, text: "123" },
  //     { id: 2, text: "456" },
  //   ]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      postName: 'Greeting for newcomers!',
      postText: 'Hereby I want to warmely greet our newcomers to this website',
      countLikes: 10,
      countDislikes: 3,
      comments: [
        {
          id: 1,
          text: 'Hereby I want to warmely greet our newcomers to this website',
        },
        {
          id: 2,
          text: 'Hereby I want to warmely greet our newcomers to this website',
        },
      ],
      showComments: false,
      colors: {
        likeColor: '',
        dislikeColor: '',
        commentsColor: 'green',
      },
    },
    {
      id: 2,
      postName: 'Greeting for newcomers!',
      postText: 'Hereby I want to warmely greet our newcomers to this website',
      countLikes: 13,
      countDislikes: 5,
      comments: [
        {
          id: 1,
          text: 'Hereby I want to warmely greet our newcomers to this website',
        },
        {
          id: 2,
          text: 'Hereby I want to warmely greet our newcomers to this website',
        },
      ],
      showComments: false,
      colors: {
        likeColor: '',
        dislikeColor: '',
        commentsColor: 'green',
      },
    },
  ]);
  const handleClick = e => {
    const newId = Math.floor(Math.random() * 10000);
    setPosts([
      ...posts,
      {
        id: newId,
        postName: values.postName,
        postText: values.postText,
        countLikes: 0,
        countDislikes: 0,
        comments: [],
        showComments: false,
        colors: {
          likeColor: '',
          dislikeColor: '',
          commentsColor: 'green',
        },
      },
    ]);
    setNewComments({ ...newComments, [newId]: '' });
    setValues(initialState);
  };

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeComments = (e, id) => {
    setNewComments({ ...newComments, [id]: e.target.value });
    // setNewComments(
    //   newComments.map((el) =>
    //     el.id === id ? { ...el, text: e.target.value } : el
    //   )
    // );
  };

  return (
    <div className="postsContainer">
      <Button
        id="createPostButton"
        variant="contained"
        color="primary"
        onClick={toggleCreatePost}
      >
        Create Post
      </Button>
      {createPost ? (
        <form ref={formRef}>
          <TextField
            id="outlined-basic"
            label="Post Name"
            variant="outlined"
            name="postName"
            onChange={handleChange}
            value={values.postName}
          ></TextField>
          <TextField
            id="outlined-basic1"
            name="postText"
            label="Post Text"
            variant="outlined"
            multiline
            onChange={handleChange}
            value={values.postText}
          ></TextField>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Post
          </Button>
        </form>
      ) : null}

      {/* <input
    accept='image/*'
    className={classes.input}
    id='icon-button-file'
    type='file'
   />
   <label htmlFor='icon-button-file'>
    <IconButton color='primary' aria-label='upload picture' component='span'>
     <PhotoCamera />
    </IconButton>
   </label> */}
      {posts.map((element, index) =>
        element.postName ? (
          <div key={index} className="allPosts">
            <h1>{element.postName}</h1>
            <legend>{element.postText}</legend>

            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() => {
                element.colors.likeColor !== 'blue'
                  ? setPosts([
                      ...posts,
                      ((element.countLikes = element.countLikes + 1),
                      (element.colors.likeColor = 'blue')),
                    ])
                  : setPosts([
                      ...posts,
                      ((element.countLikes = element.countLikes - 1),
                      (element.colors.likeColor = '')),
                    ]);
              }}
            >
              <AiFillLike color={element.colors.likeColor}></AiFillLike>
              <p>
                {element.countLikes > -1
                  ? element.countLikes
                  : (element.countLikes = 0)}
              </p>
            </IconButton>

            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() => {
                element.colors.dislikeColor !== 'red'
                  ? setPosts([
                      ...posts,
                      ((element.countDislikes = element.countDislikes + 1),
                      (element.colors.dislikeColor = 'red')),
                    ])
                  : setPosts([
                      ...posts,
                      ((element.countDislikes = element.countDislikes - 1),
                      (element.colors.dislikeColor = '')),
                    ]);
              }}
            >
              <AiFillDislike
                color={element.colors.dislikeColor}
              ></AiFillDislike>
              <p>
                {element.countDislikes > -1
                  ? element.countDislikes
                  : (element.countDislikes = 0)}
              </p>
            </IconButton>

            <div>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => {
                  setPosts([
                    ...posts,
                    (element.showComments = !element.showComments),
                  ]);
                }}
              >
                <AiOutlineComment
                  color={element.colors.commentsColor}
                ></AiOutlineComment>
                <p>{element.comments.length}</p>
              </IconButton>

              {element.showComments ? (
                <div>
                  {element.comments.map(comment => (
                    <p key={comment.id}>{comment.text}</p>
                  ))}
                  <TextField
                    name="comments"
                    onChange={e => handleChangeComments(e, element.id)}
                    value={newComments[element.id]}
                    // value={
                    //   newComments.find((comm) => comm.id === element.id).text
                    // }
                  ></TextField>

                  <Button
                    onClick={() => {
                      setPosts(
                        posts.map(item =>
                          item.id === element.id && newComments[element.id]
                            ? {
                                ...item,
                                comments: [
                                  ...item.comments,
                                  {
                                    id: element.id,
                                    text: newComments[element.id],
                                  },
                                ],
                              }
                            : item,
                        ),
                      );
                      setNewComments({ ...newComments, [element.id]: '' });
                      console.log(newComments);
                    }}
                  >
                    Add Comment
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default Posts;
