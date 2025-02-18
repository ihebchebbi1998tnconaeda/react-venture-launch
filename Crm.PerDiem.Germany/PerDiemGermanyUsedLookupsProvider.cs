namespace Crm.PerDiem.Germany
{
	using System;
	using System.Collections.Generic;
	using Crm.Library.Globalization.Lookup;
	using Crm.PerDiem.Germany.Model.Lookups;
	using Crm.PerDiem.Germany.Services.Interfaces;

	public class PerDiemGermanyUsedLookupsProvider : IUsedLookupsProvider
	{
		private readonly IPerDiemGermanyService perDiemGermanyService;

		public PerDiemGermanyUsedLookupsProvider(IPerDiemGermanyService perDiemGermanyService)
		{
			this.perDiemGermanyService = perDiemGermanyService;
		}

		public virtual IEnumerable<object> GetUsedLookupKeys(Type lookupType)
		{
			if (lookupType == typeof(PerDiemAllowanceAdjustment))
			{
				return perDiemGermanyService.GetUsedPerDiemDeductions();
			}

			return new List<ILookup>();
		}
	}
}
