// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  // Select all heart elements
  const hearts = document.querySelectorAll(".like-glyph");

  // Add event listeners to all hearts
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      // Check if the heart is empty or full
      const isFull = heart.innerText === FULL_HEART;

      if (!isFull) {
        // Empty heart: try to like
        mimicServerCall()
          .then(() => {
            heart.innerText = FULL_HEART; // Change heart to full
            heart.classList.add('activated-heart'); // Make heart red
          })
          .catch(error => {
            // Display error message
            const modal = document.getElementById("modal");
            const modalMessage = document.getElementById("modal-message");
            modalMessage.innerText = error;
            modal.classList.remove("hidden");

            // Hide the modal after 3 seconds
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      } else {
        // Full heart: unlike
        heart.innerText = EMPTY_HEART; // Change heart to empty
        heart.classList.remove('activated-heart'); // Remove red color
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

