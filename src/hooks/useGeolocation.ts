import { useEffect, useState } from "react";
import type { HomeCity } from "../types/homeCity";


interface GeolocationOptions {
  defaultCoords: HomeCity;
}

export function useGeolocation({ defaultCoords }: GeolocationOptions) {
  const [ coords, setCoords ] = useState<HomeCity | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoords(defaultCoords);
      setIsLoading(false);
      return;
    } 

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => { 
        setCoords({
          lat: latitude,
          lon: longitude,
          city: "Your location",
          country: ""
        });
        setIsLoading(false);
      },
      (err) => { 
        console.warn("Geolocation disabled", err);
        setCoords(defaultCoords);
        setIsLoading(false);
      }
    );
  }, [defaultCoords]);

  return { coords, setCoords, isLoading };
}