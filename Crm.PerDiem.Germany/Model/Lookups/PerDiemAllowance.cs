namespace Crm.PerDiem.Germany.Model.Lookups
{
	using System;

	using Crm.Library.Globalization.Lookup;

	[Lookup("[LU].[PerDiemAllowance]")]
	public class PerDiemAllowance : EntityLookup<string>
	{
		[LookupProperty(Shared = true)]
		public virtual decimal AllDayAmount { get; set; }
		[LookupProperty(Shared = true)]
		public virtual decimal PartialDayAmount { get; set; }
		[LookupProperty(Shared = true)]
		public virtual string CurrencyKey { get; set; }
		[LookupProperty(Shared = true)]
		public virtual DateTime ValidFrom { get; set; }
		[LookupProperty(Shared = true)]
		public virtual DateTime ValidTo { get; set; }
	}
}