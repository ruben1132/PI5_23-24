export interface IDronePersistence {
	_id: string;
    designation: string; 
    state: boolean;
    taskTypesAllowed: Set<string>;
}
  
