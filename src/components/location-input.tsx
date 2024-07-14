"use client";
import { forwardRef, useState, useMemo } from "react";
import { Input } from "./ui/input";
import cityList from "@/lib/city-list";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocation: (value: string) => void;
}

export default forwardRef<HTMLInputElement, Props>(function LocationInput(
  { onLocation, ...props },
  ref,
) {
  const [location, setLocation] = useState("");
  const [hasFocus, setHasFocus] = useState(false);

  const cities = useMemo(() => {
    if (!location.trim()) return [];

    const searchWords = location.split(" ");

    return cityList
      .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter(
        (city) =>
          city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
          searchWords.every((word) =>
            city.toLowerCase().includes(word.toLowerCase()),
          ),
      )
      .slice(0, 5);
  }, [location]);

  return (
    <div>
      <Input
        placeholder="Search for a city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        {...props}
        ref={ref}
      />
      {location.trim() && hasFocus && (
        <div className="flex flex-col z-20 items-start bg-secondary rounded-b-md mt-1 space-y-1">
          {!cities.length && <p>No Results Found</p>}
          {cities.map((city, index) => (
            <button
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                onLocation(city);
                setLocation("");
              }}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
