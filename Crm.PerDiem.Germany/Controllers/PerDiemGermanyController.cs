namespace Crm.PerDiem.Germany.Controllers
{
	using Crm.Library.Helper;
	using Crm.Library.Model;
	using Crm.Library.Model.Authorization;
	using Crm.Library.Modularization;
	using Crm.PerDiem.Germany.Model;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Mvc;

	[Authorize]
	public class PerDiemGermanyController : Controller
	{
		[RenderAction("MaterialHeadResource", Priority = 2000)]
		[RequiredPermission(nameof(PerDiemAllowanceEntry), Group = PermissionGroup.WebApiRead)]
		public virtual ActionResult MaterialHeadResource()
		{
			return Content(Url.JsResource("Crm.PerDiem.Germany", "perDiemGermanyMaterialTs"));
		}
	}
}
