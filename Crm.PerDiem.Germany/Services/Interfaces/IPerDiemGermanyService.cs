namespace Crm.PerDiem.Germany.Services.Interfaces
{
	using System.Collections.Generic;
	using Crm.Library.AutoFac;

	public interface IPerDiemGermanyService : IDependency
	{
		IEnumerable<string> GetUsedPerDiemDeductions();
	}
}
