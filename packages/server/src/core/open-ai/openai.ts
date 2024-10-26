import 'dotenv/config';
import OpenAI from 'openai';

export class OpenAISingleton {
	private openai: OpenAI;

	constructor() {
		this.openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}

	public getOpenAI(): OpenAI {
		return this.openai;
	}
}
