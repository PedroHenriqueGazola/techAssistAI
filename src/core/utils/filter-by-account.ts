import { Collection, FilterValue } from 'weaviate-client';

export function filterByAccount(collection: Collection, accountId: string): FilterValue | undefined {
	return collection.filter.byRef('accountId').byId().equal(accountId);
}
