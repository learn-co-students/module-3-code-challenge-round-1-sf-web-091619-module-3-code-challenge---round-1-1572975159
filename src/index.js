console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

let imageId = 3845 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


fetch(imageURL)
.then(res => res.json())
.then(image => renderImage(image))

function renderImage(image) {
  const imageCard = document.getElementById('image')
  imageCard.src = image.url

  const imageName = document.getElementById('name')
  imageName.textContent = image.name

  const imageLikes = document.getElementById('likes')
  imageLikes.textContent = image.like_count


  image.comments.map(comment => {
    renderComment(comment)
  })

  listenForLike(image)
  listenForComment(image)
}

function renderComment(comment) {
  const imageComments = document.getElementById('comments')
  imageComments.innerHTML += '<li>'+ comment.content + '</li>'

  const deleteButton = document.createElement('button')
  deleteButton.textContent = "Delete Comment"
  imageComments.appendChild(deleteButton)

}

function listenForLike(image) {
  const imageContentDiv = document.getElementById('image_content')

  imageContentDiv.addEventListener('click', e => {
    if (e.target.id === 'like_button') {

    const imageLikes = document.getElementById('likes')

    let like = event.target.previousElementSibling.innerText.split(': ')
    likeCount = parseInt(like[1])
    imageLikes.innerHTML = likeCount + 1
    // console.log(likeCount)
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
      // .then(res => res.json())
      // .then(console.log(res))
    } else if (e.target.textContent === "Delete Comment") {
      const commentContent = e.target.previousElementSibling
      const commentButton = e.target
      commentContent.remove()
      commentButton.remove()

      console.log(e.target.previousElementSibling)
      // need to add comment id to each comment
      // then find comment id and assign to constant

      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })

    }

  })
}

function listenForComment(image) {
  const imageContentDiv = document.getElementById('image_content')

  imageContentDiv.addEventListener('submit', e => {
    e.preventDefault()
    const userComment = e.target.comment.value
    const imageComments = e.target.nextElementSibling
    imageComments.innerHTML += renderComment(userComment)
    // problem here. cannot add object to list
    console.log(typeof imageComments)


    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: userComment
      })
    })
    // .then(res => res.json())
    // .then(image => renderComment(userComment))

    
  })
}