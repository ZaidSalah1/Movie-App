export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  let endpoint = "";

  if (query) {
    // البحث ما بيدعم sort_by كويس، فرجع النتائج وخلي الفرز محلي إذا حبيت
    endpoint = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=false`;
  } else {
    // أحدث + أفضل تقييم
    endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=vote_average.desc&primary_release_date.gte=2024-01-01&primary_release_date.lte=2025-12-31&vote_count.gte=200&include_adult=false`;
  }

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}`;

  const response = await fetch(endpoint, {
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTY4Njg3ZDczMjk3OTlkMTkyNWVkYmQ3OGQ2MGZkOSIsIm5iZiI6MTc1NTk4MDA3MS4wODUsInN1YiI6IjY4YWEyMTI3NzY4YzMwOGQ4NjFlNDk3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oWQyge7z4ySMkm38HD-mfJJi9xQe8FnylkVll_RDIGk'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
