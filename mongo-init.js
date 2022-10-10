db.createUser(
	{
		user: "apas_username",
		pwd: "apas_password",
		roles: [
			{
					role: "readWrite",
					db: "apas"
			}
		]
	}
);