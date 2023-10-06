export interface IRobotPersistence {
	_id: string;
    designation: string; 
    state: boolean;
    taskTypesAllowed: Set<string>;
}
  
