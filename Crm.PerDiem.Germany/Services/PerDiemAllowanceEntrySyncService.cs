namespace Crm.PerDiem.Germany.Services
{
	using System;
	using System.Collections.Generic;
	using System.Linq;

	using AutoMapper;

	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Helper;
	using Crm.Library.Model;
	using Crm.Library.Model.Authorization.Interfaces;
	using Crm.Library.Rest;
	using Crm.Library.Services;
	using Crm.Library.Services.Interfaces;
	using Crm.PerDiem.Germany.Model;
	using Crm.PerDiem.Model;

	public class PerDiemAllowanceEntrySyncService : DefaultSyncService<PerDiemAllowanceEntry, Guid>
	{
		private readonly IAppSettingsProvider appSettingsProvider;
		private readonly ISyncService<PerDiemReport> perDiemReportSyncService;
		private readonly IAuthorizationManager authorizationManager;
		public PerDiemAllowanceEntrySyncService(IRepositoryWithTypedId<PerDiemAllowanceEntry, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper, IAppSettingsProvider appSettingsProvider, ISyncService<PerDiemReport> perDiemReportSyncService, IAuthorizationManager authorizationManager)
			: base(repository, restTypeProvider, restSerializer, mapper)
		{
			this.appSettingsProvider = appSettingsProvider;
			this.perDiemReportSyncService = perDiemReportSyncService;
			this.authorizationManager = authorizationManager;
		}

		public override Type[] SyncDependencies => new[] { typeof(PerDiemReport)};
		public override Type[] ClientSyncDependencies => new[] { typeof(PerDiemReport)};

		public override IQueryable<PerDiemAllowanceEntry> GetAll(User user, IDictionary<string, int?> groups, IDictionary<string, Guid> clientIds)
		{
			var historySyncPeriod = appSettingsProvider.GetValue(PerDiemPlugin.Settings.Expense.ClosedHistorySyncPeriod);
			var isClosedEntitiesSince = DateTime.UtcNow.AddDays(-1 * historySyncPeriod);
			var perDiemReports = perDiemReportSyncService.GetAll(user, groups, clientIds);
			var seeAllUsersExpenses = authorizationManager.IsAuthorizedForAction(user, PerDiemPlugin.PermissionGroup.Expense, PerDiemPlugin.PermissionName.SeeAllUsersExpenses);
			var result = repository.GetAll().Where(
				x =>
					(seeAllUsersExpenses || x.ResponsibleUser == user.Id) && (!x.IsClosed || x.IsClosed && x.Date >= isClosedEntitiesSince) ||
					x.PerDiemReportId.HasValue && perDiemReports.Any(y => y.Id == x.PerDiemReportId.Value));
			return result;
		}
	}
}
