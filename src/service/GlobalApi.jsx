const BASE_URL = 'https://serpapi.com/search.json?engine=google_maps&q=Coffee&ll=@40.7455096,-74.0083012,14z';

export const fetchUnsplashPhoto = async (placeName) => {
    const ACCESS_KEY = "o_Z0-qxqBqWs34lxbEksO7tWM0i0KyscNE-lN-iv1mc";
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${ACCESS_KEY}&per_page=1`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0) return null;
  
      return data.results[0].urls.regular;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

