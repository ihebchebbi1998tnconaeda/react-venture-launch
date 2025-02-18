window.Helper.Database.setTransactionId("CrmPerDiemGermany_PerDiemAllowanceEntry",
	async function (response: Crm.PerDiem.Germany.Rest.Model.CrmPerDiemGermany_PerDiemAllowanceEntry) {
		return [response.PerDiemReportId, response.Id];
	});

window.Helper.Database.setTransactionId("CrmPerDiemGermany_PerDiemAllowanceEntryAllowanceAdjustmentReference",
	async function (response: Crm.PerDiem.Germany.Rest.Model.CrmPerDiemGermany_PerDiemAllowanceEntryAllowanceAdjustmentReference) {
		return response.PerDiemAllowanceEntryKey;
	});







