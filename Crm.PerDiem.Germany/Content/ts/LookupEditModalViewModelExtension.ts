import {namespace} from "@Main/namespace";
import {HelperString} from "@Main/helper/Helper.String";
export class LookupEditModalViewModelExtension extends window.Main.ViewModels.LookupEditModalViewModel {

	async init(id?: string, params?: {[key:string]:string}) {
		await super.init(id, params);
	}
	getAdjustmentFromOptions(): {key: number, value: string}[] {
		const options = [];
		let enumIndex = 0;
		// @ts-ignore
		while (!!Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom.getEnumName(enumIndex)) {
			options.push(
				{
					key: enumIndex,
					// @ts-ignore
					value: HelperString.getTranslatedString('PerDiem' + Crm.PerDiem.Germany.Model.Enums.AdjustmentFrom.getEnumName(enumIndex))
				}
			);
			enumIndex++;
		}
		return options;
	}
}
namespace("Main.ViewModels").LookupEditModalViewModel = LookupEditModalViewModelExtension;
