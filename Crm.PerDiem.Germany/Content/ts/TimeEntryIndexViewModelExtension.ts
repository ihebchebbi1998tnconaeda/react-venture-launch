import moment from "moment";
import {uniq} from "lodash";
import {HelperConfirm} from "@Main/helper/Helper.Confirm";
import {HelperDatabase} from "@Main/helper/Helper.Database";

export class TimeEntryIndexViewModelExtension extends window.Crm.PerDiem.ViewModels.TimeEntryIndexViewModel {

	perDiemAllowanceEntries = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.ObservableCrmPerDiemGermany_PerDiemAllowanceEntry>([]);
	perDiemAllowances = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowance>([]);
	canAddPerDiemAllowanceEntry: KnockoutComputed<boolean>;

	constructor() {
		super();

		this.canAddPerDiemAllowanceEntry = ko.computed(() =>
			this.canAddExpense() && this.perDiemAllowanceEntries().some(entry => moment(entry.Date()).isSame(this.selectedDate())) === false
		);
		this.lookups.adjustments = {
			$tableName: "CrmPerDiemGermany_PerDiemAllowanceAdjustment"
		}
	}

	async init(id?: string, params?: {[key:string]:string}): Promise<void> {
		await super.init(id, params);
		HelperDatabase.registerEventHandlers(this, {
			"CrmPerDiemGermany_PerDiemAllowanceEntry": {
				"afterCreate": this.refreshPerDiemAllowanceEntries,
				"afterDelete": this.refreshPerDiemAllowanceEntries,
				"afterUpdate": this.refreshPerDiemAllowanceEntries
			}
		});
	}

	async refresh(): Promise<void> {
		await super.refresh();
		await this.refreshPerDiemAllowanceEntries();
	};
	
	async refreshPerDiemAllowanceEntries(): Promise<void> {
		let setLoading = this.loading() === false;
		if (setLoading) {
			this.loading(true);
		}
		await window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
			.include("AdjustmentReferences")
			.filter(function (it) {
					return it.ResponsibleUser === this.username &&
						it.Date >= this.dateMin &&
						it.Date <= this.dateMax;
				},
				{
					dateMin: this.dateFilterFrom(),
					dateMax: this.dateFilterTo(),
					username: this.username()
				})
			.toArray(this.perDiemAllowanceEntries);

		const perDiemAllowanceKeys = uniq(this.perDiemAllowanceEntries().map(function (x) {
			return x.PerDiemAllowanceKey();
		}));

		const lookups = await window.Helper.Lookup.getLocalizedArrayMap(
			"CrmPerDiemGermany_PerDiemAllowance",
			null,
			"it.Key in this.keys",
			{ keys: perDiemAllowanceKeys }
		);
		lookups.$array = lookups.$array.filter((x) => x.Key !== null);
		this.perDiemAllowances(lookups.$array);
		if (setLoading) {
			this.loading(false);
		}

	};

	getCurrencyKeys(): string[] {
		return uniq(this.perDiemAllowanceEntries()
			.map(entry => entry.CurrencyKey())
			.concat(super.getCurrencyKeys()));
	}

	getExpensesForDate(date: Date): any[] {
		const filteredPerDiemAllowanceEntries = this.perDiemAllowanceEntries()
			.filter(entry => moment(entry.Date()).isSame(date));

		return [...filteredPerDiemAllowanceEntries, ...super.getExpensesForDate(date)];
	};

	async deletePerDiemAllowanceEntry(perDiemAllowanceEntry: Crm.PerDiem.Germany.Rest.Model.ObservableCrmPerDiemGermany_PerDiemAllowanceEntry): Promise<void> {
		if (perDiemAllowanceEntry.IsClosed()) {
			return;
		}

		if (await HelperConfirm.confirmDeleteAsync()) {
			this.loading(true);
			perDiemAllowanceEntry.AdjustmentReferences().forEach(reference => {
				window.database.remove(reference)
			});
			window.database.remove(perDiemAllowanceEntry);
			await window.database.saveChanges();
		}
	};

}

window.Crm.PerDiem.ViewModels.TimeEntryIndexViewModel = TimeEntryIndexViewModelExtension;
