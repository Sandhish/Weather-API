const ForecastCard = ({ data }) => {
  return (
    <div className="forecast-card">
      <h3>{new Date(data.date).toLocaleDateString()}</h3>
      <p>Max Temp: {data.day.maxtemp_c}°C</p>
      <p>Min Temp: {data.day.mintemp_c}°C</p>
      <p>Condition: {data.day.condition.text}</p>
      <img src={data.day.condition.icon} alt={data.day.condition.text} />
    </div>
  );
};

export default ForecastCard;
