namespace Crm.PerDiem.Germany.Controllers.OData
{
	using Crm.Library.Api.Attributes;
	using Crm.Library.Api.Mapping;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.PerDiem.Controllers.OData;
	using Crm.PerDiem.Germany.Model;
	using Crm.PerDiem.Germany.Rest.Model;

	using Microsoft.AspNetCore.OData.Query;
	using Microsoft.AspNetCore.Mvc;

	[ControllerName("CrmPerDiemGermany_PerDiemAllowanceEntry")]
	public class PerDiemAllowanceEntryODataController : DistinctDateODataController<PerDiemAllowanceEntry, PerDiemAllowanceEntryRest>
	{
		public PerDiemAllowanceEntryODataController(IRepository<PerDiemAllowanceEntry> repository, IODataMapper mapper)
			: base(repository, mapper)
		{
		}
		[HttpGet]
		public virtual IActionResult GetDistinctPerDiemAllowanceEntryDates(ODataQueryOptions<PerDiemAllowanceEntryRest> options) => base.GetDistinctDates(options, x => x.Date);
	}
}
