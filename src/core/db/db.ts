import weaviate, { WeaviateClient } from 'weaviate-client';

class Db {
	private static client: Promise<WeaviateClient>;

	public static getClient(): Promise<WeaviateClient> {
		if (!Db.client) {
			Db.client = weaviate.connectToLocal({
				port: 8080,
			});
		}
		return Db.client;
	}
}

export default Db;
