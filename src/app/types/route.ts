export interface Route {
  id: number;
  tagSkill?: string[];
  capacity: number;
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  maxTask?: number;
  //   driver?: Driver;
}

export interface Driver {
  id: number;
  name: string;
  //any other information here,but i think is not important now
}
