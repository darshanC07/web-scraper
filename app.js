// Sample JSON response from the server for a specific movie
async function main(){
const response =  await fetch('http://localhost:3000/movieReviews/veerSavarkar');
const movieData = await response.json();

// Function to create and display a movie card
function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  // Title
  const movieTitle = document.createElement("h2");
  movieTitle.classList.add("movie-title");
  movieTitle.textContent = movie.title;
  movieCard.appendChild(movieTitle);

  // Reviews
  const reviewsContainer = document.createElement("div");
  reviewsContainer.classList.add("reviews-container");

  // Show first 4 reviews initially
  const initialReviewsToShow = 4;
  movie.reviewTitle.slice(0, initialReviewsToShow).forEach((reviewTitle, index) => {
    reviewsContainer.appendChild(createReview(reviewTitle, movie.reviews[index]));
  });

  movieCard.appendChild(reviewsContainer);

  // "See More" button
  if (movie.reviewTitle.length > initialReviewsToShow) {
    const seeMoreBtn = document.createElement("button");
    seeMoreBtn.classList.add("see-more-btn");
    seeMoreBtn.textContent = "See More";
    movieCard.appendChild(seeMoreBtn);

    // Expand to show all reviews on click
    seeMoreBtn.addEventListener("click", () => {
      reviewsContainer.innerHTML = "";
      movie.reviewTitle.forEach((reviewTitle, index) => {
        reviewsContainer.appendChild(createReview(reviewTitle, movie.reviews[index]));
      });
      seeMoreBtn.style.display = "none"; // Hide button after expanding
    });
  }

  document.getElementById("movies-container").appendChild(movieCard);
}

// Helper function to create individual review elements
function createReview(reviewTitle, reviewText) {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review");

  const titleElement = document.createElement("p");
  titleElement.classList.add("review-title");
  titleElement.textContent = reviewTitle;

  const textElement = document.createElement("p");
  textElement.classList.add("review-text");
  textElement.textContent = reviewText;

  reviewDiv.appendChild(titleElement);
  reviewDiv.appendChild(textElement);

  return reviewDiv;
}

// Initialize movie cards (for this example, we only have one movie)
createMovieCard(movieData);
}
main();