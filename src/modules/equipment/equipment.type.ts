export interface Equipment {
	id: string;
	name: string;
	description?: string;
	serialNumber: string;
	accountId: string;
}

export interface ValidateCreateEquipmentResponse {
	valid: boolean;
	error?: string;
}

export interface CreateEquipmentParams {
	name: string;
	description?: string;
	serialNumber: string;
}
