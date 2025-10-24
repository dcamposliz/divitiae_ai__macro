/**
 * Downsample time series data for chart performance
 * Uses LTTB (Largest Triangle Three Buckets) algorithm
 */

export function sampleData(data, maxPoints = 500) {
  if (!data || data.length <= maxPoints) return data;

  const sampled = [];
  const bucketSize = (data.length - 2) / (maxPoints - 2);

  // Always include first point
  sampled.push(data[0]);

  for (let i = 0; i < maxPoints - 2; i++) {
    const avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
    const avgRangeEnd = Math.floor((i + 2) * bucketSize) + 1;
    const avgRangeLength = avgRangeEnd - avgRangeStart;

    let avgX = 0;
    let avgY = 0;

    for (let j = avgRangeStart; j < avgRangeEnd && j < data.length; j++) {
      avgX += new Date(data[j].date).getTime();
      avgY += data[j].value;
    }

    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    const rangeOffs = Math.floor((i + 0) * bucketSize) + 1;
    const rangeTo = Math.floor((i + 1) * bucketSize) + 1;

    const pointAX = new Date(sampled[sampled.length - 1].date).getTime();
    const pointAY = sampled[sampled.length - 1].value;

    let maxArea = -1;
    let maxAreaPoint = null;

    for (let j = rangeOffs; j < rangeTo && j < data.length; j++) {
      const pointX = new Date(data[j].date).getTime();
      const pointY = data[j].value;

      const area = Math.abs(
        (pointAX - avgX) * (pointY - pointAY) - (pointAX - pointX) * (avgY - pointAY)
      ) * 0.5;

      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[j];
      }
    }

    if (maxAreaPoint) {
      sampled.push(maxAreaPoint);
    }
  }

  // Always include last point
  sampled.push(data[data.length - 1]);

  return sampled;
}
