document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getMyPicture()
  likeFeature()

  let imageId = 3847

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})


function getMyPicture() {
  fetch('https://randopic.herokuapp.com/images/3847')
  .then(resp => resp.json())
  .then(img => {
    const titleTag = document.getElementById('name')
    titleTag.textContent = img.name

    const likeTag = document.getElementById('likes')
    likeTag.textContent = img.like_count

    const imageTag = document.getElementById('image')
    imageTag.src = img.url
    imageTag.dataset.id = img.id
    
    
    const comments = document.getElementById('comments')
    const liTag = document.createElement("li")
    comments.appendChild(liTag) 

    liTag.dataset.id = img.comments[0].id
    liTag.dataset.imageId = img.comments[0].image_id
    liTag.textContent = img.comments[0].content
  })
}

function likeFeature() {
  const likeTag = document.getElementById('likes')
  const like = parseInt(likeTag.textContent) + 1

  const cardDiv = document.getElementById('image_card')
  cardDiv.addEventListener('click', e => {
    const imgTag = e.target.parentElement.querySelector('img')
    const imgId = imgTag.dataset.id

    fetch(likeURL, {
            method: 'POST',
            headers:
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: image_id
            })
          })
          .then(resp => resp.json())
          .then(data => {
                
           })
  })
}