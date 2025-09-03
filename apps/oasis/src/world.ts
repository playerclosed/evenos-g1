export type POI = { id: string; x: number; y: number; r: number; label: string; portal?: boolean };
export class World {
  width = 800; height = 200;
  pois: POI[] = [
    { id:'shard',  x:120, y:100, r:12, label:'Shard' },
    { id:'token',  x:520, y:80,  r:12, label:'Token' },
    { id:'portal', x:680, y:140, r:14, label:'Portal', portal:true }
  ];
}
