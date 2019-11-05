document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3843 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchImage()
  listenForLikeButton()
  listenForCommentSubmit()
})

function findImageCard() {
  return document.getElementById('image_card')
}

function findImageURLTag() {
  return document.getElementById('image')
}

function findImageNameTag() {
  return document.getElementById('name')
}

function findImageLikesTag() {
  return document.getElementById('likes')
}

function findImageCommentsTag() {
  return document.getElementById('comments')
}

function findCommentsForm() {
  return document.querySelector('form')
}


function fetchImage() {
  fetch('https://randopic.herokuapp.com/images/3843')
    .then(resp => resp.json())
    .then(imageInfo => {
      findImageURLTag().src = imageInfo.url
      findImageNameTag().textContent = imageInfo.name
      findImageLikesTag().textContent = imageInfo.like_count
      findImageCommentsTag().innerHTML = imageInfo.comments.map (comment => {
        return renderImageComment(comment)
      }).join('');
  });
}

function renderImageComment(comment) {
  return `
    <li> ${comment.content} </li>
  `
}

function listenForLikeButton() {
  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', e => {
    increaseLikesOnDOM()
  })
  
}

function increaseLikesOnDOM() {
  const currentLikes = findImageLikesTag().textContent
  let likes = parseInt(currentLikes)
  const updatedLikes = findImageLikesTag().textContent = (likes += 1)
  updatedLikesInDatabase(updatedLikes)
}

function updatedLikesInDatabase(updatedLikes) {
  fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'image_id': 3843,
      'like_count': updatedLikes
    })
  })
}

function listenForCommentSubmit() {
  findCommentsForm().addEventListener('submit', e => {
    e.preventDefault()
    const commentContent = event.target.comment.value
    const commentsTag = findImageCommentsTag()
    const newCommentTag = document.createElement('li')
    newCommentTag.textContent = commentContent
    commentsTag.appendChild(newCommentTag)
    event.target.comment.value = ''
    updateCommentsInDatabase(commentContent)
  })
}


function updateCommentsInDatabase(updatedContent) {
  fetch('https://randopic.herokuapp.com/comments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'image_id': 3843,
      'content': updatedContent
    })
  })
}