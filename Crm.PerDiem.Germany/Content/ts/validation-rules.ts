window.ko.validationRules.add("CrmPerDiemGermany_PerDiemAllowanceEntry", (entity) => {
	entity.Date.extend({
		validation: {
			async: true,
			validator: async (val, params, callback) => {
				try {
					const results = await window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
						.filter(function (it) {
								return it.ResponsibleUser === this.responsibleUser &&
									it.Date === this.date &&
									it.Id !== this.id;
							},
							{
								id: entity.Id(),
								responsibleUser: entity.ResponsibleUser(),
								date: entity.Date()
							})
						.toArray();
					if (results.length > 0) {
						callback({
							isValid: false,
							message: window.Helper.String.getTranslatedString("PerDiemAllowanceExistingForDate")
						});
					} else {
						callback(true);
					}
				} catch {
					callback(true);
				}
			}
		}
	});
});