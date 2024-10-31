async function fetchMovies() {
    try {
      const response = await fetch('http://localhost:3000/movieDetails');
      const data = await response.json();
      console.log(data)
      const movie = document.getElementById('data');
      movie.innerHTML = 'name = '+data.title+"\n rating = "+data.rating;
      
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  