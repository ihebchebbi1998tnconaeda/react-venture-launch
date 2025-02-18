namespace Crm.PerDiem.Germany.Rest.Model.Lookups
{
	using System;

	using Crm.Library.BaseModel.Attributes;
	using Crm.Library.Rest;
	using Crm.PerDiem.Germany.Model.Enums;
	using Crm.PerDiem.Germany.Model.Lookups;

	[RestTypeFor(DomainType = typeof(PerDiemAllowanceAdjustment))]
	public class PerDiemAllowanceAdjustmentRest : RestEntityLookupWithExtensionValues
	{
		public bool IsPercentage { get; set; }
		[UI(Hidden = true)]
		public AdjustmentFrom AdjustmentFrom { get; set; }
		public string CountryKey { get; set; }
		public decimal AdjustmentValue { get; set; }
		public DateTime ValidFrom { get; set; }
		public DateTime ValidTo { get; set; }
	}
}
