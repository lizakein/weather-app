import axios from "axios";
import type { City } from "../types/city";

const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function fetchCities(query: string): Promise<City[]> {
  try {
    const { data } = await axios.get(GEO_API_URL, {
      params: {
        name: query,
        count: 5,
        language: "en",
        format: "json",
      },
    });

    return data.results || [];
  } catch (err) {
    console.error("Geocoding error: ", err);
    throw err;
  }
}