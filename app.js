async function main() {
  const movies = ["socialNetwork","sitaRaman","lapataLadies","veerSavarkar","maharaja","article370","manjummelB"];
  let movieData = [];
  
  for (let i = 0; i < movies.length; i++) {
    const response = await fetch('http://localhost:3000/movieReviews/' + movies[i]);
    const data = await response.json();
    movieData.push(data);
  }

  // Function to create and display a movie card
  function createMovieCards(data) {
    const container = document.getElementById('movies-container');
    
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
          showMoreButton.textContent = reviewContent.classList.contains('expanded') ? 'Show More' : 'Show Less';
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
}

main();
