import {MongoClient, Db} from 'mongodb';

const url = 'mongodb://localhost:27017';

const dbName = 'yasn';

interface GlobalExtend extends NodeJS.Global {
	mongoClient: Mongo;
}

declare var global: GlobalExtend;

export class Mongo {
	private nativeMongoClient: MongoClient | null;
	private db: Db | null;

	private constructor() {
		this.nativeMongoClient = null;
		this.db = null;
	}

	static async getInstance() {
		if (!global.mongoClient) {
			global.mongoClient = new Mongo();
			await global.mongoClient.init();
		}

		return global.mongoClient.getDb();
	}

	private async init() {
		this.nativeMongoClient = new MongoClient(url);
		try {
			await this.nativeMongoClient.connect();
		} catch (e) {
			console.error('Failed to connect db', e);
			throw e;
		}
		this.db = this.nativeMongoClient.db(dbName);
	}

	public getDb() {
		return this.db!;
	}
}
