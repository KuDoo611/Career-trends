export const getForecastData = async () => {
  const res = await fetch("/forecast_result.json"); 
  return await res.json();
};
