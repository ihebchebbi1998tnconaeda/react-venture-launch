using AutoMapper;
using Crm.Library.Data.Domain.DataInterfaces;
using Crm.Library.Helper;
using Crm.Library.Model;
using Crm.Library.Rest;
using Crm.Library.Services;
using Crm.Library.Services.Interfaces;
using Crm.PerDiem.Germany.Model;

using System;
using System.Linq;

namespace Crm.PerDiem.Germany.Services
{
	using System.Collections.Generic;

	public class PerDiemAllowanceEntryAllowanceAdjustmentReferenceSyncService : DefaultSyncService<PerDiemAllowanceEntryAllowanceAdjustmentReference, Guid>
	{
		private readonly ISyncService<PerDiemAllowanceEntry> syncService;
		public PerDiemAllowanceEntryAllowanceAdjustmentReferenceSyncService(IRepositoryWithTypedId<PerDiemAllowanceEntryAllowanceAdjustmentReference, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper, IAppSettingsProvider appSettingsProvider, ISyncService<PerDiemAllowanceEntry> syncService)
			: base(repository, restTypeProvider, restSerializer, mapper)
		{
			this.syncService = syncService;
		}
		public override Type[] SyncDependencies => new[] { typeof(PerDiemAllowanceEntry) };
		public override Type[] ClientSyncDependencies => new[] { typeof(PerDiemAllowanceEntry) };
		public override IQueryable<PerDiemAllowanceEntryAllowanceAdjustmentReference> GetAll(User user, IDictionary<string, int?> groups, IDictionary<string, Guid> clientIds)
		{
			var entities = repository.GetAll();
			var perDiemAllowanceEntriesId = syncService.GetAll(user, groups, clientIds).Select(x => x.Id);
			return entities.Where(x => perDiemAllowanceEntriesId.Contains(x.PerDiemAllowanceEntryKey));
		}

	}
}
