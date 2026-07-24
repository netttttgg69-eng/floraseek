export function summarizeHistoricalClimate(daily) {
  const dates = daily?.time || [];
  const temperatures = daily?.temperature_2m_mean || [];
  const precipitation = daily?.precipitation_sum || [];
  const monthBuckets = Array.from({ length: 12 }, () => ({
    precipitationTotal: 0,
    temperatureCount: 0,
    temperatureTotal: 0,
  }));
  const years = new Set();

  let temperatureTotal = 0;
  let temperatureCount = 0;
  let precipitationTotal = 0;

  dates.forEach((dateValue, index) => {
    const date = new Date(`${dateValue}T00:00:00Z`);
    const month = date.getUTCMonth();
    const temp = temperatures[index];
    const rain = precipitation[index];

    if (Number.isFinite(temp)) {
      monthBuckets[month].temperatureTotal += temp;
      monthBuckets[month].temperatureCount += 1;
      temperatureTotal += temp;
      temperatureCount += 1;
    }

    if (Number.isFinite(rain)) {
      monthBuckets[month].precipitationTotal += rain;
      precipitationTotal += rain;
    }

    years.add(date.getUTCFullYear());
  });

  if (!temperatureCount || !years.size) {
    throw new Error("Not enough historical climate data was returned for that location.");
  }

  const monthlyAverageTemperatures = monthBuckets.map((month) => (
    month.temperatureCount ? month.temperatureTotal / month.temperatureCount : null
  ));
  const availableMonthlyTemperatures = monthlyAverageTemperatures.filter(Number.isFinite);

  return {
    annualAverageTemperature: temperatureTotal / temperatureCount,
    annualPrecipitation: precipitationTotal / years.size,
    coldestMonthTemperature: Math.min(...availableMonthlyTemperatures),
    warmestMonthTemperature: Math.max(...availableMonthlyTemperatures),
  };
}

export function estimateClimateCategory(stats) {
  if (stats.annualPrecipitation <= 300) {
    return "desert";
  }

  if (stats.coldestMonthTemperature >= 18 && stats.annualPrecipitation > 800) {
    return "tropical";
  }

  if (stats.coldestMonthTemperature <= -3 && stats.warmestMonthTemperature >= 10) {
    return "continental";
  }

  if (stats.annualAverageTemperature >= 16 && stats.coldestMonthTemperature > 0) {
    return "subtropical";
  }

  return "temperate";
}
