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
  
  // Future projections - Starting September, incrementing 6 missions per quarter
  {
    date: "2025-09",
    missions: 9,
    concepts: 30,
    hours: 4.5,
    isProjection: true
  },
  {
    date: "2025-12",
    missions: 15,
    concepts: 45,
    hours: 7.5,
    isProjection: true
  },
  {
    date: "2026-03",
    missions: 21,
    concepts: 60,
    hours: 10.5,
    isProjection: true
  },
  {
    date: "2026-06",
    missions: 27,
    concepts: 75,
    hours: 13.5,
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