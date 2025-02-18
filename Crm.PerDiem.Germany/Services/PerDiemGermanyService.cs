namespace Crm.PerDiem.Germany.Services
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.PerDiem.Germany.Model;
	using Crm.PerDiem.Germany.Services.Interfaces;

	public class PerDiemGermanyService : IPerDiemGermanyService
	{
		private readonly IRepositoryWithTypedId<PerDiemAllowanceEntryAllowanceAdjustmentReference, Guid> allowanceEntryDeductionsReferenceRepository;

		public PerDiemGermanyService(
			IRepositoryWithTypedId<PerDiemAllowanceEntryAllowanceAdjustmentReference, Guid> allowanceEntryDeductionsReferenceRepository)
		{
			this.allowanceEntryDeductionsReferenceRepository = allowanceEntryDeductionsReferenceRepository;
		}
		public virtual IEnumerable<string> GetUsedPerDiemDeductions()
		{
			return allowanceEntryDeductionsReferenceRepository.GetAll().Select(c => c.PerDiemAllowanceAdjustmentKey).Distinct();
		}
	}
}
