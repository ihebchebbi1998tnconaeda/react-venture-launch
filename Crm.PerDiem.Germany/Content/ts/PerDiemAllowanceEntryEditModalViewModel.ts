import {namespace} from "@Main/namespace";
import {HelperLookup} from "@Main/helper/Helper.Lookup";
import type moment from "moment";
import {HelperString} from "@Main/helper/Helper.String";

export class PerDiemAllowanceEditModalViewModel extends window.Main.ViewModels.ViewModelBase {
	lookups: LookupType = {
		costCenters: {
			$tableName: "Main_CostCenter"
		},
		currencies: {
			$tableName: "Main_Currency"
		}
	};
	perDiemAllowanceAdjustmentList = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowanceAdjustment>([]);
	perDiemAllowanceEntry = ko.observable<Crm.PerDiem.Germany.Rest.Model.ObservableCrmPerDiemGermany_PerDiemAllowanceEntry>(null);
	perDiemAllowances = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowance>([]);
	selectedAdjustments = ko.observableArray<Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowanceAdjustment>([]);
	minDate: KnockoutComputed<Date | false>;
	maxDate: KnockoutComputed<Date>;
	perDiemAllowance: KnockoutComputed<Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowance>;
	calculatedAmount: KnockoutComputed<number>;
	errors: KnockoutValidationErrors;

	constructor() {
		super();
		this.minDate = ko.pureComputed(() => {
			if (window.AuthorizationManager.isAuthorizedForAction("PerDiemAllowanceEntry", "NoMinDateLimit")) {
				return false;
			}
			return window.Crm.PerDiem.Settings.Expense.MaxDaysAgo ? window.moment().startOf("day").add(-parseInt(window.Crm.PerDiem.Settings.Expense.MaxDaysAgo), "days").toDate() : false
		});
		this.maxDate = ko.pureComputed(() => new Date());
		this.perDiemAllowance = ko.pureComputed(() => {
			if (!this.perDiemAllowanceEntry() || !this.perDiemAllowanceEntry().PerDiemAllowanceKey()) {
				return null;
			}
			return this.perDiemAllowances().find(allowances => allowances.Key === this.perDiemAllowanceEntry().PerDiemAllowanceKey()) || null;
		});
		this.calculatedAmount = ko.pureComputed(() => {
			if (!this.perDiemAllowance()) {
				return null;
			}
			const isAllDay = this.perDiemAllowanceEntry().AllDay();
			let amount = isAllDay
				? this.perDiemAllowance().AllDayAmount
				: this.perDiemAllowance().PartialDayAmount;
			let adjustmentMultiplier = isAllDay ? 1 : 0.5;

			this.perDiemAllowanceEntry().AdjustmentReferences().forEach(reference => {

				const adjustmentKey = reference.PerDiemAllowanceAdjustmentKey();

				if (adjustmentKey === "breakfast") {
					adjustmentMultiplier = 1;
				}

				if (reference.AdjustmentValue() < 0 && reference.IsPercentage()) {
					amount += this.perDiemAllowance().AllDayAmount * reference.AdjustmentValue() * adjustmentMultiplier;
				}
				if (reference.AdjustmentValue() < 0 && !reference.IsPercentage()) {
					amount += reference.AdjustmentValue();
				}
				if (reference.AdjustmentValue() > 0 && reference.IsPercentage()) {
					amount += this.perDiemAllowance().AllDayAmount * reference.AdjustmentValue() * adjustmentMultiplier;
				}
				if (reference.AdjustmentValue() > 0 && !reference.IsPercentage()) {
					amount += reference.AdjustmentValue();
				}
			})

			return +Math.max(amount, 0).toFixed(2);
		})

		this.errors = ko.validation.group([this.perDiemAllowanceEntry, this.calculatedAmount], {deep: true});
	}

	async init(id?: string, params?: {[key:string]:string}): Promise<void> {
		await super.init(id, params);
		let previousPerDiemAllowanceEntry = null;
		await window.Helper.Lookup.getLocalizedArrayMaps(this.lookups);
		if (!id && params.selectedDate) {
			const results = await window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
				.include("AdjustmentReferences")
				.filter(function (it) {
						return it.ResponsibleUser === this.user && it.Date === this.previousDay;
					},
					{
						user: window.Helper.User.getCurrentUserName(),
						previousDay: window.moment(params.selectedDate).add(-1, "day").toDate()
					})
				.take(1)
				.toArray();
			previousPerDiemAllowanceEntry = results.length === 1 ? results[0] : null;
		}
		let perDiemAllowanceEntry;
		if (id) {
			perDiemAllowanceEntry = await window.database.CrmPerDiemGermany_PerDiemAllowanceEntry
				.include("AdjustmentReferences")
				.find(id);
		} else {
			perDiemAllowanceEntry = window.database.CrmPerDiemGermany_PerDiemAllowanceEntry.defaultType.create();
			perDiemAllowanceEntry.Amount = null;
			perDiemAllowanceEntry.CostCenterKey = HelperLookup.getDefaultLookupValueSingleSelect(this.lookups.costCenters, perDiemAllowanceEntry.CostCenterKey);
			perDiemAllowanceEntry.Date = window.moment(params.selectedDate).toDate();
			perDiemAllowanceEntry.ResponsibleUser = params.username;
			if (previousPerDiemAllowanceEntry) {
				perDiemAllowanceEntry.AllDay = true;
				perDiemAllowanceEntry.CostCenterKey = previousPerDiemAllowanceEntry.CostCenterKey;
				perDiemAllowanceEntry.PerDiemAllowanceKey = previousPerDiemAllowanceEntry.PerDiemAllowanceKey;
			}
		}
		this.perDiemAllowanceEntry(perDiemAllowanceEntry.asKoObservable());
		await this.loadPerDiemAdjustments();
		await Promise.all(this.perDiemAllowanceEntry().AdjustmentReferences().map(reference => this.loadSelectedAdjustments(reference)))
		await this.loadPerDiemAllowances();

		const keepSelected = [];
		this.perDiemAllowanceEntry().AdjustmentReferences().forEach(reference => {
			keepSelected.push(reference.PerDiemAllowanceAdjustmentKey())
		})
		this.filterAdjustments(keepSelected);
		this.perDiemAllowance.subscribe(() => {
			const keepSelected = [];
			this.perDiemAllowanceEntry().AdjustmentReferences().forEach(function (reference) {
				keepSelected.push(reference.PerDiemAllowanceAdjustmentKey())
			})
			this.filterAdjustments(keepSelected);
		})
		this.calculatedAmount.subscribe((amount) => {
			this.perDiemAllowanceEntry().Amount(amount);
			this.perDiemAllowanceEntry().CurrencyKey(amount === null ? null : this.perDiemAllowance().CurrencyKey);
		});
		this.calculatedAmount.notifySubscribers(this.calculatedAmount());
		this.perDiemAllowanceEntry().Date.subscribe(async () => {
			if (this.loading() == false) {
				this.loading(true);
				await this.loadPerDiemAllowances();
				await this.loadPerDiemAdjustments();
				await Promise.all(
					this.perDiemAllowanceEntry().AdjustmentReferences().map(reference => this.loadSelectedAdjustments(reference))
				)
				this.loading(false);
			}
		})
		this.perDiemAllowanceEntry().AllDay.subscribe(newValue => {
			let removeItems = [];
			const keepSelected = [];
			this.perDiemAllowanceEntry().AdjustmentReferences().forEach(entity => {
				if (!(((entity.AdjustmentFrom() == "AllDay" || entity.AdjustmentFrom() == "Always") && newValue) || (!newValue && (entity.AdjustmentFrom() == "Partial" || entity.AdjustmentFrom() == "Always")))) {
					removeItems.push(entity)
				} else {
					keepSelected.push(entity.PerDiemAllowanceAdjustmentKey())
				}
			})
			for (let i = 0; i < removeItems.length; i++) {
				const valueToRemove = ko.utils.arrayFirst(this.perDiemAllowanceEntry().AdjustmentReferences(), (reference) => {
					return reference.Id == removeItems[i].Id;
				});
				this.perDiemAllowanceEntry().AdjustmentReferences.remove(valueToRemove);
				window.database.remove(valueToRemove)
			}
			removeItems = [];
			this.filterAdjustments(keepSelected);
		});
		this.perDiemAllowances.subscribe(perDiemAllowances => {
			const lookupMap = HelperLookup.mapLookups(perDiemAllowances);
			if (this.perDiemAllowanceEntry().PerDiemAllowanceKey() === null) {
				this.perDiemAllowanceEntry()
					.PerDiemAllowanceKey(HelperLookup.getDefaultLookupValueSingleSelect(lookupMap));
			} else if (!lookupMap[this.perDiemAllowanceEntry().PerDiemAllowanceKey()]) {
				this.perDiemAllowanceEntry().PerDiemAllowanceKey(null);
			}
		});
		this.selectedAdjustments.subscribe(newValueArray => {
			newValueArray.forEach((newValue: any) => {
				const adjustment: Crm.PerDiem.Germany.Rest.Model.Lookups.ObservableCrmPerDiemGermany_PerDiemAllowanceAdjustment = newValue.value;
				if (newValue.status == 'added' && $(".modal").is(':visible')) {
					const allowanceEntryAllowanceAdjustmentRef = window.database.CrmPerDiemGermany_PerDiemAllowanceEntryAllowanceAdjustmentReference.defaultType.create();
					allowanceEntryAllowanceAdjustmentRef.PerDiemAllowanceEntryKey = this.perDiemAllowanceEntry().Id();
					allowanceEntryAllowanceAdjustmentRef.IsPercentage = adjustment.IsPercentage();
					allowanceEntryAllowanceAdjustmentRef.AdjustmentValue = adjustment.AdjustmentValue();
					allowanceEntryAllowanceAdjustmentRef.AdjustmentFrom = Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom[adjustment.AdjustmentFrom()];
					allowanceEntryAllowanceAdjustmentRef.PerDiemAllowanceAdjustmentKey = adjustment.Key();
					this.perDiemAllowanceEntry().AdjustmentReferences.push(allowanceEntryAllowanceAdjustmentRef.asKoObservable())
					window.database.add(allowanceEntryAllowanceAdjustmentRef);
				} else if (newValue.status === 'deleted' && $(".modal").is(':visible')) {
					const valueToRemove = ko.utils.arrayFirst(this.perDiemAllowanceEntry().AdjustmentReferences(), function (reference) {
						return reference.PerDiemAllowanceAdjustmentKey() == adjustment.Key();
					});
					if (valueToRemove != null) {
						this.perDiemAllowanceEntry().AdjustmentReferences.remove(valueToRemove);
						window.database.remove(valueToRemove)
					}
				}
			})
		}, null, "arrayChange");

		this.loading(false);
		if (this.perDiemAllowanceEntry().PerDiemAllowanceKey() === null) {
			this.perDiemAllowanceEntry().PerDiemAllowanceKey(HelperLookup.getDefaultLookupValueSingleSelect(HelperLookup.mapLookups(this.perDiemAllowances()), this.perDiemAllowanceEntry().PerDiemAllowanceKey()));
		}
		this.perDiemAllowanceEntry().Id() === HelperString.emptyGuid()
			? window.database.add(this.perDiemAllowanceEntry().innerInstance)
			: window.database.attachOrGet(this.perDiemAllowanceEntry().innerInstance);
	}

	dispose(): void {
		window.database.detach(this.perDiemAllowanceEntry().innerInstance);
	}

	async save(): Promise<void> {
		this.loading(true);

		if (this.errors().length > 0) {
			this.loading(false);
			this.errors.showAllMessages();
			return;
		}

		try {
			await window.database.saveChanges();
			$(".modal:visible").modal("hide");
			this.loading(false);
		} catch {
			this.loading(false);
			swal(
				HelperString.getTranslatedString("UnknownError"),
				HelperString.getTranslatedString("Error_InternalServerError"),
				"error"
			);
		}
	}

	async loadPerDiemAllowances(): Promise<void> {
		const date = this.perDiemAllowanceEntry().Date();
		if (!date) {
			this.perDiemAllowances([]);
			return;
		}
		const results = await HelperLookup
			.getLocalizedArrayMap(
				"CrmPerDiemGermany_PerDiemAllowance",
				null,
				"it.ValidFrom <= this.date && this.date <= it.ValidTo",
				{date: date}
		);
		results.$array = results.$array.filter(x => x.Key !== null);
		this.perDiemAllowances(results.$array);
	}

	async loadPerDiemAdjustments(): Promise<void> {
		this.lookups.adjustments = await HelperLookup.getLocalizedArrayMap("CrmPerDiemGermany_PerDiemAllowanceAdjustment", null,
			"it.ValidFrom <= this.date && this.date <= it.ValidTo",
			{date: this.perDiemAllowanceEntry().Date()});
	}

	async loadSelectedAdjustments(reference: Crm.PerDiem.Germany.Rest.Model.ObservableCrmPerDiemGermany_PerDiemAllowanceEntryAllowanceAdjustmentReference): Promise<void> {
		const adjustment = await HelperLookup.getLocalized(
			"CrmPerDiemGermany_PerDiemAllowanceAdjustment",
			null,
			"it.Key == this.value && !(it.ValidFrom <= this.date && this.date <= it.ValidTo)", {
				value: reference.PerDiemAllowanceAdjustmentKey(), date: this.perDiemAllowanceEntry().Date()
			});

		if (adjustment.length != 0) {
			this.lookups.adjustments.$array.push(adjustment[0]);
		}
	}

	filterAdjustments(selected: Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowanceAdjustment[]): void {
		if (!(this.perDiemAllowance() == null || this.perDiemAllowanceEntry().AllDay() == undefined)) {
			this.perDiemAllowanceAdjustmentList.removeAll();
			this.selectedAdjustments.removeAll();
			this.lookups.adjustments.$array
				.filter((adjustment: Crm.PerDiem.Germany.Rest.Model.Lookups.CrmPerDiemGermany_PerDiemAllowanceAdjustment) => {
					const enumValue = adjustment.AdjustmentFrom;
					return (adjustment.CountryKey == this.perDiemAllowance().Key || adjustment.CountryKey == null) && ((this.perDiemAllowanceEntry().AllDay() && (enumValue == Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom.AllDay || enumValue == Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom.Always)) || (!this.perDiemAllowanceEntry().AllDay() && (enumValue == Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom.Partial || enumValue == Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom.Always)));
				})
				.forEach((adjustment) => {
					if (adjustment.Key != null) {
						const valueAlreadyExists = ko.utils.arrayFirst(this.perDiemAllowanceEntry().AdjustmentReferences(), (reference) => reference.PerDiemAllowanceAdjustmentKey() == adjustment.Key);
						if (!valueAlreadyExists) {
							const selectedItem = selected.find(element => element == adjustment.Key);
							if (adjustment.ValidFrom <= new Date() && new Date() <= adjustment.ValidTo && !selectedItem) {
								this.perDiemAllowanceAdjustmentList.push(adjustment.asKoObservable())
							} else if (selectedItem) {
								const selectedAdjustment = adjustment.asKoObservable();
								this.perDiemAllowanceAdjustmentList.push(selectedAdjustment);
								this.selectedAdjustments.push(selectedAdjustment);
							} else {
								this.perDiemAllowanceAdjustmentList.push(adjustment.asKoObservable())
							}
						} else {
							const selectedAdjustment = adjustment.asKoObservable();
							this.perDiemAllowanceAdjustmentList.push(selectedAdjustment);
							this.selectedAdjustments.push(selectedAdjustment);
						}
					}
				})
		}
		if (this.perDiemAllowance() == null) {
			this.perDiemAllowanceAdjustmentList.removeAll();
		}
	}

	isDeduction(adjustmentReference: Crm.PerDiem.Germany.Rest.Model.Lookups.ObservableCrmPerDiemGermany_PerDiemAllowanceAdjustment): boolean {
		const existingValue = ko.utils.arrayFirst(this.perDiemAllowanceEntry().AdjustmentReferences(), (reference) => reference.PerDiemAllowanceAdjustmentKey() == adjustmentReference.Key());
		if (existingValue != null) {
			return existingValue.AdjustmentValue() < 0;
		} else {
			return adjustmentReference.AdjustmentValue() < 0;
		}
	}
}

namespace("Crm.PerDiem.Germany.ViewModels").PerDiemAllowanceEditModalViewModel = PerDiemAllowanceEditModalViewModel; 

