(function(){
  let imageId = 3846
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imgContainer = document.querySelector('img')
  const imgTitle = document.querySelector('h4')
  const likes = document.querySelector('#likes')
  const comments = document.querySelector('#comments')
  const likeButton = document.querySelector('button')
  const commentForm = document.querySelector('#comment_form')
  
  getImage()
  listenClick()
  listenSubmit()
  listenDelete()

  function getImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(data => {
      renderPage(data)
    })
  }

  function renderPage(data) {
    imgContainer.src = data.url
    imgContainer.dataset.id = imageId
    imgTitle.textContent = data.name
    likes.textContent = data.like_count
    comments.innerHTML = data.comments.map(comment => {
      return renderComment(comment)
    }).join('')
  }

  function renderComment(comment) {
    return `<li id="${comment.id}">${comment.content}  <button data-id="${comment.id}">Delete</button></li>`
  }
  
  function listenClick() {
    likeButton.addEventListener('click', function(event) {
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId
        })
      })
      .then(res => res.json())
      .then(data => {
        likes.textContent = parseInt(likes.textContent) + 1
      })
    })
  }

  function listenSubmit() {
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault()
      const userComment = event.target.comment.value
      fetch (commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: userComment
        })
      })
      .then(res => res.json())
      .then(data => {
        comments.innerHTML += `<li id="${data.id}">${userComment}  <button data-id="${data.id}">Delete</button></li>`
      })
      event.target.comment.value = ""
    })
  }

  function listenDelete() {
    comments.addEventListener('click', function(event) {
      if (event.target.tagName === "BUTTON") {
        const commentId = event.target.dataset.id
        fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
          method: 'DELETE'
        })
        .then(res => {
          event.target.parentElement.remove()
        })
      }
    })
  }

  

})();

