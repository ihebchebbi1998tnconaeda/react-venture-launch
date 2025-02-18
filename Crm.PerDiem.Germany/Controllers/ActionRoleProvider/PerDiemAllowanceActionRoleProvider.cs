namespace Crm.PerDiem.Germany.Controllers.ActionRoleProvider
{
	using Crm.Library.Model.Authorization;
	using Crm.Library.Model.Authorization.PermissionIntegration;
	using Crm.Library.Modularization.Interfaces;
	using Crm.PerDiem.Germany.Model;
	using Crm.PerDiem.Germany.Model.Lookups;

	using Main;

	public class PerDiemAllowanceActionRoleProvider : RoleCollectorBase
	{
		public PerDiemAllowanceActionRoleProvider(IPluginProvider pluginProvider)
			: base(pluginProvider)
		{
			var defaultRoleNames = new[]
			{
				CrmPlugin.Roles.HeadOfSales, CrmPlugin.Roles.SalesBackOffice, CrmPlugin.Roles.InternalSales, CrmPlugin.Roles.FieldSales,
				"HeadOfService", "ServiceBackOffice", "InternalService", "FieldService"
			};

			Add(nameof(PerDiemAllowanceEntry), PermissionName.Create, defaultRoleNames);
			AddImport(nameof(PerDiemAllowanceEntry), PermissionName.Create, nameof(PerDiemAllowanceEntry), PermissionName.Edit);
			Add(nameof(PerDiemAllowanceEntry), PermissionName.Delete, defaultRoleNames);
			AddImport(nameof(PerDiemAllowanceEntry), PermissionName.Delete, nameof(PerDiemAllowanceEntry), PermissionName.Edit);
			Add(nameof(PerDiemAllowanceEntry), PermissionName.Edit, defaultRoleNames);
			Add(nameof(PerDiemAllowanceEntry), PerDiemPlugin.PermissionName.NoMinDateLimit, CrmPlugin.Roles.HeadOfSales, CrmPlugin.Roles.SalesBackOffice, CrmPlugin.Roles.InternalSales, "HeadOfService", "ServiceBackOffice", "InternalService");

			Add(nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Create, defaultRoleNames);
			AddImport(nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Create, nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Edit);
			Add(nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Delete, defaultRoleNames);
			AddImport(nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Delete, nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Edit);
			Add(nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), PermissionName.Edit, defaultRoleNames);

			Add(PermissionGroup.WebApi, nameof(PerDiemAllowance), CrmPlugin.Roles.HeadOfSales, CrmPlugin.Roles.SalesBackOffice, CrmPlugin.Roles.InternalSales, CrmPlugin.Roles.FieldSales, "HeadOfService", "ServiceBackOffice", "InternalService", "FieldService", Roles.APIUser);
			Add(PermissionGroup.WebApi, nameof(PerDiemAllowanceAdjustment), CrmPlugin.Roles.HeadOfSales, CrmPlugin.Roles.SalesBackOffice, CrmPlugin.Roles.InternalSales, CrmPlugin.Roles.FieldSales, "HeadOfService", "ServiceBackOffice", "InternalService", "FieldService", Roles.APIUser);
			Add(PermissionGroup.WebApi, nameof(PerDiemAllowanceEntry), CrmPlugin.Roles.HeadOfSales, CrmPlugin.Roles.SalesBackOffice, CrmPlugin.Roles.InternalSales, CrmPlugin.Roles.FieldSales, "HeadOfService", "ServiceBackOffice", "InternalService", "FieldService", Roles.APIUser);
			Add(PermissionGroup.WebApi, nameof(PerDiemAllowanceEntryAllowanceAdjustmentReference), CrmPlugin.Roles.HeadOfSales, CrmPlugin.Roles.SalesBackOffice, CrmPlugin.Roles.InternalSales, CrmPlugin.Roles.FieldSales, "HeadOfService", "ServiceBackOffice", "InternalService", "FieldService", Roles.APIUser);
		}
	}
}
