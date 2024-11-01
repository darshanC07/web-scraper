async function fetchMovies() {
  try {
    const response = await fetch('http://localhost:3000/movieDetails');
    const data = await response.json();
    console.log(data)
    document.getElementById("title").innerText = data.title;
    document.getElementById("releaseYear").innerText = `Released: ${data.releaseYear}`;
    document.getElementById("director").innerText = data.director;
    document.getElementById("desc").innerText = data.desc;

    const castListElement = document.getElementById("castList");
    data.casts.forEach(cast => {
      const li = document.createElement("li");
      li.innerText = cast;
      castListElement.appendChild(li);
    });

  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}
fetchMovies()