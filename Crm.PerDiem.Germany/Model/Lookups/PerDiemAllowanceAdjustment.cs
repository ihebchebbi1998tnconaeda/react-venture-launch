using Crm.Library.Globalization.Lookup;
using Crm.PerDiem.Germany.Model.Enums;
using System;

namespace Crm.PerDiem.Germany.Model.Lookups
{
	using Crm.Library.BaseModel.Attributes;

	[Lookup("[LU].[PerDiemAllowanceAdjustment]")]
	public class PerDiemAllowanceAdjustment : EntityLookup<string>
	{
		[LookupProperty(Shared = true)]
		public virtual bool IsPercentage { get; set; }
		[LookupProperty(Shared = true)]
		[UI(Hidden = true)]
		public virtual AdjustmentFrom AdjustmentFrom { get; set; }

		[LookupProperty(Shared = true)]
		public virtual string CountryKey { get; set; }

		[LookupProperty(Shared = true)]
		public virtual decimal AdjustmentValue { get; set; }
		[LookupProperty(Shared = true)]
		public virtual DateTime ValidFrom { get; set; }
		[LookupProperty(Shared = true)]
		public virtual DateTime ValidTo { get; set; }

	}


}
