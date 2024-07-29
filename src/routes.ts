import express from 'express';
import WeaviateController from './core/controllers/weaviateController';

const router = express.Router();

const weaviateController = new WeaviateController();

router.post('/search-solution', weaviateController.searchSolution);

export { router };
