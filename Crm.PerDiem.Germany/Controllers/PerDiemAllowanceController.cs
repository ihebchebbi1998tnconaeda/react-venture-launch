namespace Crm.PerDiem.Germany.Controllers
{
	using Crm.Library.Helper;
	using Crm.Library.Model;
	using Crm.Library.Model.Authorization;
	using Crm.Library.Model.Authorization.PermissionIntegration;
	using Crm.Library.Modularization;
	using Crm.PerDiem.Germany.Model;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Mvc;

	[Authorize]
	public class PerDiemAllowanceController : Controller
	{
		[RequiredPermission(PermissionName.Edit, Group = nameof(PerDiemAllowanceEntry))]
		public virtual ActionResult EditTemplate()
		{
			return PartialView();
		}
		
		[AllowAnonymous]
		[RenderAction("PerDiemReportOverviewEntry", Priority = 100)]
		public virtual ActionResult PerDiemReportOverviewEntry()
		{
			return PartialView();
		}
		
		[AllowAnonymous]
		[RenderAction("PerDiemReportResource", Priority = 90)]
		public virtual ActionResult PerDiemReportResource()
		{
			return Content(Url.JsResource("Crm.PerDiem.Germany", "perDiemGermanyReportTs"));
		}

		[RenderAction("TimeEntryIndexPrimaryAction", Priority = 80)]
		[RequiredPermission(PermissionName.Create, Group = nameof(PerDiemAllowanceEntry))]
		public virtual ActionResult PrimaryActionAddPerDiemAllowanceEntry()
		{
			return PartialView();
		}

		[RenderAction("ExpenseTemplateActions", Priority = 100)]
		[RequiredPermission(PermissionName.Edit, Group = nameof(PerDiemAllowanceEntry))]
		public virtual ActionResult TemplateActionEdit()
		{
			return PartialView();
		}

		[RenderAction("ExpenseTemplateActions", Priority = 50)]
		[RequiredPermission(PermissionName.Delete, Group = nameof(PerDiemAllowanceEntry))]
		public virtual ActionResult TemplateActionDelete()
		{
			return PartialView();
		}

		[RenderAction("ExpenseTemplateTableColumns")]
		[RequiredPermission(nameof(PerDiemAllowanceEntry), Group = PermissionGroup.WebApiRead)]
		public virtual ActionResult TemplateTableColumns()
		{
			return PartialView();
		}

		[RenderAction("TimeEntryReportEntryDetails")]
		[RequiredPermission(nameof(PerDiemAllowanceEntry), Group = PermissionGroup.WebApiRead)]
		public virtual ActionResult TimeEntryReportEntryDetails()
		{
			return PartialView();
		}
		
		[RenderAction("LookupEditBasicInformation")]
		public virtual ActionResult LookupPropertyEditPerDiemAllowanceAdjustment() => PartialView();
		
		[RenderAction("LookupBasicInformation")]
		public virtual ActionResult LookupPropertyDetailsPerDiemAllowanceAdjustment() => PartialView();
	}
}
