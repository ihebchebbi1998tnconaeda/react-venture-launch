namespace Crm.PerDiem.Germany.Rest.Model
{
	using System;

	using Crm.Library.Api.Attributes;
	using Crm.Library.Rest;
	using Crm.PerDiem.Germany.Model;

	[RestTypeFor(DomainType = typeof(PerDiemAllowanceEntryAllowanceAdjustmentReference))]
	public class PerDiemAllowanceEntryAllowanceAdjustmentReferenceRest : RestEntityWithExtensionValues
	{
		public Guid PerDiemAllowanceEntryKey { get; set; }
		public string PerDiemAllowanceAdjustmentKey { get; set; }
		public bool IsPercentage { get; set; }
		[RestrictedField]
		public string AdjustmentFrom { get; set; }

		public decimal AdjustmentValue { get; set; }
	}
}
