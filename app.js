async function getMovie() {
  const container = document.getElementById('movies-container');
  let childCount = container.childElementCount //check if alr theres a movie review displayed
  if (childCount > 0) {
    container.removeChild(container.firstChild)
  }

  let loader = document.createElement("div")
  loader.classList.add('loader')
  container.appendChild(loader)

  let input = document.getElementById("movie-name")
  // console.log(input.value)
  let movie = input.value
  let movieNameArray = movie.split(" ")
  let movieName = movieNameArray[0].toLowerCase();
  for (let i = 1; i < movieNameArray.length; i++) {
    let nextWord = movieNameArray[i].charAt(0).toUpperCase() + movieNameArray[i].slice(1).toLowerCase()
    movieName = movieName + nextWord
  }
  console.log(movieName)

  const response = await fetch('https://web-scraper-flax.vercel.app/movieReviews/' + movieName);
  const data = await response.json();

  const card = document.createElement('div');
  card.classList.add('movie-card');

  const title = document.createElement('h2');
  title.classList.add('movie-title');
  title.textContent = data.title;
  card.appendChild(title);

  data.reviewTitle.slice(0, 4).forEach((reviewTitle, index) => {
    const reviewSection = document.createElement('div');
    reviewSection.classList.add('review-section');

    const reviewTitleElem = document.createElement('div');
    reviewTitleElem.classList.add('review-title');
    reviewTitleElem.textContent = reviewTitle;

    const reviewContent = document.createElement('p');
    reviewContent.classList.add('review-text', 'truncated');
    reviewContent.textContent = data.reviews[index];

    // Show More/Less Button
    const showMoreButton = document.createElement('button');
    showMoreButton.classList.add('show-more');
    showMoreButton.textContent = 'Show More';

    showMoreButton.addEventListener('click', () => {
      reviewContent.classList.toggle('expanded');
      showMoreButton.textContent = reviewContent.classList.contains('expanded') ? 'Show Less' : 'Show More';
    });

    reviewSection.appendChild(reviewTitleElem);
    reviewSection.appendChild(reviewContent);
    reviewSection.appendChild(showMoreButton);
    card.appendChild(reviewSection);
  });

  

  container.removeChild(loader)
  container.appendChild(card);


}


async function allMovies() {
  const container = document.getElementById('movies-container');
  let loader = document.createElement("div")
  loader.classList.add('loader')
  container.appendChild(loader)

  const movies = ["socialNetwork", "sitaRaman", "lapataLadies", "veerSavarkar", "maharaja", "article370", "manjummelB"];
  let movieData = [];

  for (let i = 0; i < movies.length; i++) {
    const response = await fetch('https://web-scraper-flax.vercel.app/movieReviews/' + movies[i]);
    const data = await response.json();
    movieData.push(data);
  }

  // Function to create and display a movie card
  function createMovieCards(data) {
    data.forEach((movie) => {
      const card = document.createElement('div');
      card.classList.add('movie-card');

      const title = document.createElement('h2');
      title.classList.add('movie-title');
      title.textContent = movie.title;
      card.appendChild(title);

      movie.reviewTitle.slice(0, 4).forEach((reviewTitle, index) => {
        const reviewSection = document.createElement('div');
        reviewSection.classList.add('review-section');

        const reviewTitleElem = document.createElement('div');
        reviewTitleElem.classList.add('review-title');
        reviewTitleElem.textContent = reviewTitle;

        const reviewContent = document.createElement('p');
        reviewContent.classList.add('review-text', 'truncated');
        reviewContent.textContent = movie.reviews[index];

        // Show More/Less Button
        const showMoreButton = document.createElement('button');
        showMoreButton.classList.add('show-more');
        showMoreButton.textContent = 'Show More';

        showMoreButton.addEventListener('click', () => {
          reviewContent.classList.toggle('expanded');
          showMoreButton.textContent = reviewContent.classList.contains('expanded') ? 'Show Less' : 'Show More';
        });

        reviewSection.appendChild(reviewTitleElem);
        reviewSection.appendChild(reviewContent);
        reviewSection.appendChild(showMoreButton);
        card.appendChild(reviewSection);
      });

      container.appendChild(card);
    });
  }

  createMovieCards(movieData);
  container.removeChild(loader)
}

