// Growth data for Cuidate Online
// This file tracks the evolution of the platform over time

export interface GrowthDataPoint {
  date: string;
  missions: number;
  concepts: number;
  hours: number;
  isProjection: boolean;
}

export const GROWTH_DATA: GrowthDataPoint[] = [
  // Historical data
  {
    date: "2025-01",
    missions: 3,
    concepts: 15,
    hours: 1.5,
    isProjection: false
  },
  
  // Future projections
  {
    date: "2025-03",
    missions: 6,
    concepts: 25,
    hours: 3,
    isProjection: true
  },
  {
    date: "2025-06",
    missions: 12,
    concepts: 40,
    hours: 6,
    isProjection: true
  },
  {
    date: "2025-09",
    missions: 18,
    concepts: 55,
    hours: 9,
    isProjection: true
  },
  {
    date: "2025-12",
    missions: 25,
    concepts: 70,
    hours: 12,
    isProjection: true
  }
];

export function getCurrentStats() {
  const currentData = GROWTH_DATA.find(d => !d.isProjection);
  return {
    missions: currentData?.missions || 3,
    concepts: currentData?.concepts || 15,
    hours: currentData?.hours || 1.5
  };
}

export function getProjections() {
  return GROWTH_DATA.filter(d => d.isProjection);
}

export function getAllData() {
  return GROWTH_DATA;
}