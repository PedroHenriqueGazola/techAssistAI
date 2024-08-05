import { Application, Request, Response } from 'express';
import Controller, { Methods, RouteConfig } from '../../controller/controller';
import { EquipmentService } from './equipment.service';

export default class EquipmentController extends Controller {
	public path = '/equipments';
	public routes = [
		{
			path: '',
			method: Methods.GET,
			handler: this.search,
			localMiddleware: [],
		},
		{
			path: '/:id',
			method: Methods.GET,
			handler: this.getOne,
			localMiddleware: [],
		},
		{
			path: '',
			method: Methods.POST,
			handler: this.createEquipment,
			localMiddleware: [],
		},
	] as RouteConfig[];

	public equipmentService: EquipmentService;

	public constructor(app: Application) {
		super(app);

		this.equipmentService = new EquipmentService();
	}

	public async search(req: Request, res: Response): Promise<void> {}

	public async getOne(req: Request, res: Response): Promise<void> {}

	public async createEquipment(req: Request, res: Response): Promise<void> {}
}
