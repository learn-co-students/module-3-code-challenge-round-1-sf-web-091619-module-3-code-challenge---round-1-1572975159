document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3848 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // fetching image and image data
  fetch(imageURL)
    .then(response => response.json())
    .then(imageJson => {
      console.log(imageJson)
      const imageName = document.getElementById('name')
      imageName.textContent = imageJson.name
    
      const imageURL = document.getElementById('image')
      imageURL.innerHTML = `<img src="${imageJson.url}" id="image" data-id=""/>`
    
      const imageLikes = document.getElementById('likes')
      imageLikes.textContent = imageJson.like_count

      const imageComments = document.getElementById('comments')
      imageComments.textContent = imageJson.comments
      imageComments.m

      })


  
  const addLikes = document.getElementById('like-button')
  //changing DOM for like feature 
  addLikes.addEventListener('click', function(event) {
    if(event.target.textContent === "Like") {
        const likes = imageLikes.textContent
        const newLikes = likes + 1
        const updatedLikes = newLikes 
    }

    //persisting like to DB
    fetch(imageURL, {
          method: "POST",
          headers: {
           "Content-type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(
            "": `${updatedLikes}`
          )
        })
  })
  

  // //changing DOM for comment feature
  // const commentForm = document.getElementById('comment_form')
  // commentForm.addEventListener('submit', function(event) {
  //     event.preventDefault

  //     const commentInput = event.target.comment.value

}) 




//fetching image and image data

