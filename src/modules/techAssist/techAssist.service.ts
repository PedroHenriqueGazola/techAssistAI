import Db from '../../core/db/db';
import { OpenAISingleton } from '../../core/open-ai/openai';
import { DiagnoseIssueParams } from './techAssist.type';

export class TechAssistService {
	public async diagnoseIssue(
		params: DiagnoseIssueParams,
	): Promise<string | undefined | null> {
		const { description, equipmentId } = params;

		try {
			const db = await Db.getClient();

			const documentCollection = db.collections.get('Document');

			const { objects } = await documentCollection.query.hybrid(description, {
				alpha: 0.5,
				limit: 5,
				returnMetadata: ['score', 'distance', 'explainScore'],
				filters: documentCollection.filter
					.byRef('equipmentId')
					.byId()
					.equal(equipmentId),
			});

			if (!objects.length) {
				throw new Error('Document not found for the given equipment ID');
			}

			const manualContent = [];

			for (const object of objects) {
				const score = object.metadata?.['score'] || 0;
				if (score < 0.2) {
					continue;
				}

				manualContent.push(object.properties.content);
			}

			const text = manualContent.join('\n\n');

			const prompt = `
				Você é um assistente técnico que ajuda a diagnosticar problemas de equipamentos com base em descrições fornecidas pelos técnicos.
				Abaixo está a descrição do problema fornecida pelo técnico:
				${description}

				Abaixo está o trecho relevante do manual:
				${text}

				Com base nas informações acima, forneça uma solução detalhada para o problema.
			`;

			const openai = new OpenAISingleton().getOpenAI();

			const completion = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'Você é um assistente técnico que ajuda a diagnosticar problemas de equipamentos com base em descrições fornecidas pelos técnicos.',
					},
					{ role: 'user', content: prompt },
				],
			});

			return completion.choices[0].message.content;
		} catch (error) {
			console.log(error);
			throw new Error('Erro ao processar a consulta');
		}
	}
}
