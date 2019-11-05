document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3844 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch(imageURL)  // inital drawing of page
  .then(resp => resp.json())
  .then(json => {
    imgContainer = document.getElementById('image')
    imgContainer.src = json.url
    titleContainer = document.getElementById('name')
    titleContainer.innerText = json.name
    likesContainer = document.getElementById('likes')
    likesContainer.innerText = json.like_count
    commentContainer = document.getElementById('comments')
    json.comments.forEach(comment => { // begin writing all comments
      commentSpot = document.createElement('li')
      commentSpot.innerHTML = comment.content
      commentContainer.appendChild(commentSpot)
      // BEGIN EXTRA CREDIT!!!
      button = document.createElement('button')
      button.id = comment.id
      button.innerText = "Delete"
      commentSpot.appendChild(button)
      // EXTRA CREDIT LISTENER TO BE WRITTEN BELOW!!!  Is there enough time??
    }) //end of writing all comments
  }) // end of fetch - initial drawing
  
  // begin LIKE BUTTON listener
  likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', event => {
    likesContainer.innerText = (parseInt(likesContainer.innerText) + 1).toString();
    newLike = likesContainer.innerText
    fetch (likeURL, { 
      method: "POST",
      headers: {
        "Content-type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        'image_id': imageId
      })
    })  // end of POST arguments
    .then(resp => resp.json())
    .then(json => {})
  }) // end of LIKE BUTTON Listener

  // begin COMMENT SUBMIT listener
  document.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.value == "Submit") {
      newComment = document.createElement('li')
      newComment.innerHTML = event.target.parentElement.comment.value
      commentContainer.appendChild(newComment)
      fetch (commentsURL, {  
        method: "POST",
        headers: {
          "Content-type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          'image_id': imageId,
          'content': newComment.innerHTML.toString()
        })
      })  // end of POST arguments
      .then(resp => resp.json())
      .then(json => {})
    }
  }) // end of COMMENT SUBMIT listener

}) // end of DOMContentLoaded
