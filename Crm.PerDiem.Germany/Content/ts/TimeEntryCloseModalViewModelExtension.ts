import {uniq} from "lodash";
import {HelperLookup} from "@Main/helper/Helper.Lookup";
import type {TimeEntryIndexViewModel} from "@Crm.PerDiem/TimeEntryIndexViewModel";

export class TimeEntryCloseModalViewModelExtension extends window.Crm.PerDiem.ViewModels.TimeEntryCloseModalViewModel {

	perDiemAllowanceEntries = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.ObservableCrmPerDiemGermany_PerDiemAllowanceEntry>([]);

	constructor(parentViewModel: TimeEntryIndexViewModel) {
		super(parentViewModel);

		let reportEntries = this.reportEntries;
		this.reportEntries = ko.pureComputed(() => [...reportEntries(), ...this.perDiemAllowanceEntries()]);

		this.lookups.adjustments = {
			$tableName: "CrmPerDiemGermany_PerDiemAllowanceAdjustment"
		};
	}

	async init(id?: string, params?: {[key:string]:string}): Promise<void> {
		await super.init(id, params);

		await window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
			.GetDistinctPerDiemAllowanceEntryDates(this.currentUser().Id)
			.forEach((date) => {
				if (this.distinctDates.indexOf(date) === -1) {
					this.distinctDates.push(date);
				}
			});

		const perDiemAllowanceKeys = uniq(this.perDiemAllowanceEntries().map(allowanceEntry => allowanceEntry.PerDiemAllowanceKey()));
		this.lookups.perDiemAllowances = await HelperLookup
			.getLocalizedArrayMap("CrmPerDiemGermany_PerDiemAllowance",
				null,
				"it.Key in this.perDiemAllowanceKeys",
				{perDiemAllowanceKeys: perDiemAllowanceKeys});

	};

	async refresh(): Promise<void> {
		const id = this.perDiemReportId();
		await super.refresh();
		if (!this.perDiemReport().From() || !this.perDiemReport().To()) {
			this.perDiemAllowanceEntries([]);
			return;
		}
		let query = window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
			.include("AdjustmentReferences")
			.include("ResponsibleUserObject");
		query = id
			? query.filter(function (it) {
				return it.PerDiemReportId === this.id;
			}, {id: id})
			: query.filter(function (it) {
					return it.ResponsibleUser === this.selectedUser &&
						it.IsClosed === false &&
						it.Date >= this.from &&
						it.Date <= this.to &&
						it.PerDiemReportId === null;
				},
				{
					selectedUser: this.selectedUser(),
					from: this.perDiemReport().From(),
					to: this.perDiemReport().To()
				});
		await query
			.orderBy("it.Date")
			.toArray(this.perDiemAllowanceEntries);

	}
}

window.Crm.PerDiem.ViewModels.TimeEntryCloseModalViewModel = TimeEntryCloseModalViewModelExtension;



