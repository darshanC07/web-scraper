// Sample JSON response from the server for a specific movie
async function main() {
  const movies = ["socialNetwork","sitaRaman","lapataLadies","veerSavarkar","maharaja","article370","manjummelB"]
  let movieData = []
  for(let i = 0;i<movies.length;i++){
    const response = await fetch('http://localhost:3000/movieReviews/'+movies[i]);
    const Data = await response.json();
    movieData.push(Data)
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
  
        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content');
        reviewContent.textContent = movie.reviews[index];
        
        const showMore = document.createElement('span');
        showMore.classList.add('show-more');
        showMore.textContent = 'See More';
        
        showMore.addEventListener('click', () => {
          reviewContent.classList.toggle('expanded');
          showMore.textContent = reviewContent.classList.contains('expanded') ? 'See Less' : 'See More';
        });
  
        reviewSection.appendChild(reviewTitleElem);
        reviewSection.appendChild(reviewContent);
        reviewSection.appendChild(showMore);
        card.appendChild(reviewSection);
      });
  
      const seeAllButton = document.createElement('button');
      seeAllButton.textContent = 'See All Reviews';
      seeAllButton.addEventListener('click', () => {
        card.innerHTML = '';
        card.appendChild(title);
        
        movie.reviewTitle.forEach((reviewTitle, index) => {
          const reviewSection = document.createElement('div');
          reviewSection.classList.add('review-section');
          
          const reviewTitleElem = document.createElement('div');
          reviewTitleElem.classList.add('review-title');
          reviewTitleElem.textContent = reviewTitle;
          
          const reviewContent = document.createElement('div');
          reviewContent.classList.add('review-content', 'expanded');
          reviewContent.textContent = movie.reviews[index];
          
          reviewSection.appendChild(reviewTitleElem);
          reviewSection.appendChild(reviewContent);
          card.appendChild(reviewSection);
        });
  
        card.appendChild(seeAllButton);
      });
  
      card.appendChild(seeAllButton);
      container.appendChild(card);
    });
  }
  
  createMovieCards(movieData);
}
main();