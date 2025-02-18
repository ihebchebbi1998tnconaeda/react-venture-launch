using AutoMapper;
using Crm.PerDiem.Germany.Model.Lookups;
using Crm.Library.Data.Domain.DataInterfaces;
using Crm.Library.Rest;
using Crm.Library.Services;
using System.Linq;
using Crm.Library.Model;
using Crm.Library.Helper;
using System;

namespace Crm.PerDiem.Germany.Services
{
	using Crm.PerDiem.Model;

	public class PerDiemAllowanceSyncService : DefaultLookupSyncService<PerDiemAllowance>
	{
		private readonly IAppSettingsProvider appSettingsProvider;
		public PerDiemAllowanceSyncService(IRepositoryWithTypedId<PerDiemAllowance, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper, IAppSettingsProvider appSettingsProvider) : base(repository, restTypeProvider, restSerializer, mapper)
		{
			this.appSettingsProvider = appSettingsProvider;
		}

		public override Type[] SyncDependencies => new[] { typeof(PerDiemReport) };

		public override IQueryable<PerDiemAllowance> GetAll(User user)
		{
			var maxDaysAgo = appSettingsProvider.GetValue(PerDiemPlugin.Settings.Expense.MaxDaysAgo);
			var fromDate = DateTime.Now.Date.AddDays(-1 * maxDaysAgo);
			return repository.GetAll().Where(x => x.ValidTo >= fromDate);
		}
	}
}
