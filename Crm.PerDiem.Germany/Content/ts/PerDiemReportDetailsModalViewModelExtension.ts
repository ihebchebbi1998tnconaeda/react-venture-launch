import {uniq} from "lodash";
import {HelperLookup} from "@Main/helper/Helper.Lookup";

export class PerDiemReportDetailsModalViewModelExtension extends window.Crm.PerDiem.ViewModels.PerDiemReportDetailsModalViewModel {

	perDiemAllowanceEntries = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.ObservableCrmPerDiemGermany_PerDiemAllowanceEntry>([]);

	constructor() {
		super();
		const superReportEntries = this.reportEntries;
		this.reportEntries = ko.pureComputed(() => [...superReportEntries(), ...this.perDiemAllowanceEntries()]);
		this.lookups.perDiemAllowances = {
			$tableName: "CrmPerDiemGermany_PerDiemAllowance"
		};
		this.lookups.adjustments = {
			$tableName: "CrmPerDiemGermany_PerDiemAllowanceAdjustment"
		};
	}

	async loadReportEntries(id?: string, params?: any): Promise<void> {
		await super.loadReportEntries(id, params);
		const filter = id
			? function (it) {
				return it.PerDiemReportId === this.id;
			}
			: function (it) {
				return it.ResponsibleUser === this.username && it.Date >= this.fromDate && it.Date <= this.toDate;
			};
		const filterParams = id ? {id: id} : params;
		await window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
			.include("AdjustmentReferences")
			.filter(filter, filterParams)
			.orderBy("it.Date")
			.toArray(this.perDiemAllowanceEntries);

		const perDiemAllowanceKeys = uniq(this.perDiemAllowanceEntries().map(allowanceEntry => allowanceEntry.PerDiemAllowanceKey()));
		this.lookups.perDiemAllowances = await HelperLookup
			.getLocalizedArrayMap("CrmPerDiemGermany_PerDiemAllowance",
				null,
				"it.Key in this.perDiemAllowanceKeys",
				{perDiemAllowanceKeys: perDiemAllowanceKeys});
		this.lookups.adjustments = await HelperLookup.getLocalizedArrayMap("CrmPerDiemGermany_PerDiemAllowanceAdjustment");
	}
}


window.Crm.PerDiem.ViewModels.PerDiemReportDetailsModalViewModel = PerDiemReportDetailsModalViewModelExtension;
