namespace Crm.PerDiem.Germany.Rest.Model.Lookups
{
	using System;

	using Crm.Library.Rest;
	using Crm.PerDiem.Germany.Model.Lookups;

	[RestTypeFor(DomainType = typeof(PerDiemAllowance))]
	public class PerDiemAllowanceRest : RestEntityLookupWithExtensionValues
	{
		public decimal AllDayAmount { get; set; }
		public decimal PartialDayAmount { get; set; }
		public string CurrencyKey { get; set; }
		public DateTime ValidFrom { get; set; }
		public DateTime ValidTo { get; set; }
	}
}
