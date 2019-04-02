export interface Routes {
  RouteID: string;
  Name: string;
  LineDescription: string;
}

export interface RouteDetails {
  RouteID: string;
  Name: string;
  Direction0: Direction0;
  Direction1: Direction0;
}

interface Direction0 {
  TripHeadsign: string;
  DirectionText: string;
  DirectionNum: string;
  Shape: Shape[];
  Stops: Stop[];
}

interface Stop {
  StopID: string;
  Name: string;
  Lon: number;
  Lat: number;
  Routes: string[];
}

interface Shape {
  Lat: number;
  Lon: number;
  SeqNum: number;
}
