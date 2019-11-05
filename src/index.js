(function () {

  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3851
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageObject;
  const likes = document.getElementById('likes');
  const addButton = document.createElement('button')

  getImage();
  listenForLikes();
  listenForComments();

  function getImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => {
      imageObject = image;
      const imgTag = document.getElementById('image');
      imgTag.src = image.url;
      const nameTag = document.getElementById('name');
      nameTag.textContent = image.name;
      likes.textContent = image.like_count;
      image.comments.forEach(comment => renderComment(comment))
    })
  }

  function renderComment(comment) {
    const newLi = document.createElement('li')
    newLi.textContent = comment.content
    // addButton.textContent = "Delete"
    // newLi.appendChild(addButton)
    commentsContainer().appendChild(newLi)
  }

  function commentsContainer() {
    return document.getElementById('comments')
  }

  function listenForLikes() {
    const likeButton = document.getElementById('like_button')
    likeButton.addEventListener('click', function(event) {
    imageObject.likes += 1
    likes.textContent = parseInt(likes.textContent) + 1
      fetch(likeURL, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        image_id: imageId,
        likes: 1
      })
    })
    .then(resp => resp.json())
    })
  }

  function listenForComments() {
    const commentForm = document.getElementById('comment_form')
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      addNewComment(event);
    })
  }

  function addNewComment(event) {
    const newLi = document.createElement('li')
    const userInput = event.target.querySelector('input').value
    newLi.textContent = userInput
    commentsContainer().appendChild(newLi)

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        image_id: imageId,
        content: userInput
      })
    }).then(resp => resp.json())
  }

  // function listenForDelete() {}


})();