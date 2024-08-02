import fs from 'fs';
import path from 'path';
import PdfParse from 'pdf-parse';
import { dataType, vectorizer, WeaviateClient } from 'weaviate-client';
import Db from './db';

const pdfDir = path.resolve(__dirname, '../manuals');

async function recreateDb() {
	const db = await Db.getClient();

	await db.collections.deleteAll();

	await createCollections(db);
	await createObjects(db);

	console.log('Database recreated');
}

async function createCollections(db: WeaviateClient) {
	db.collections.create({
		name: 'Document',
		vectorizers: vectorizer.text2VecTransformers(),
		properties: [
			{ name: 'title', dataType: dataType.TEXT },
			{ name: 'content', dataType: dataType.TEXT },
		],
	});
}

async function createObjects(db: WeaviateClient) {
	const Document = db.collections.get('Document');

	const allPdfsParsed = await parseAllPdfs();

	const uuid = await Document.data.insertMany(allPdfsParsed);

	console.log('Inserted documents with UUIDs:', uuid);
}

async function parseAllPdfs(): Promise<{ title: string; content: string }[]> {
	if (!fs.existsSync(pdfDir)) {
		throw new Error(`Diretório não encontrado: ${pdfDir}`);
	}

	const pdfFiles = fs.readdirSync(pdfDir);
	const allPdfsParsed: { title: string; content: string }[] = [];

	for (const pdfFile of pdfFiles) {
		const pdf = fs.readFileSync(path.join(pdfDir, pdfFile));
		const pdfParsed = await PdfParse(pdf);

		allPdfsParsed.push({
			title: pdfParsed.info.Title,
			content: pdfParsed.text,
		});
	}

	return allPdfsParsed;
}

(async () => {
	await recreateDb();
})();
