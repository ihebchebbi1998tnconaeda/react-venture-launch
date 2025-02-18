namespace Crm.PerDiem.Germany.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

	[Migration(20200219130500)]
	public class MigrateExpenseReportToPerDiemReport : Migration
	{
		public override void Up()
		{
			if (Database.TableExists("[CRM].[PerDiemReport]") && Database.TableExists("[SMS].[ExpenseReport]"))
			{
				Database.AddColumn("[CRM].[PerDiemAllowanceEntry]", new Column("PerDiemReportId", DbType.Guid, ColumnProperty.Null));
				Database.AddForeignKey("FK_PerDiemAllowanceEntry_PerDiemReport", "CRM.PerDiemAllowanceEntry", "PerDiemReportId", "CRM.PerDiemReport", "PerDiemReportId");
				Database.ExecuteNonQuery("UPDATE [CRM].[PerDiemAllowanceEntry] SET [PerDiemReportId] = [ExpenseReportId] WHERE [ExpenseReportId] IS NOT NULL");
				Database.RemoveForeignKeyIfExisting("CRM", "PerDiemAllowanceEntry", "FK_PerDiemAllowanceEntry_ExpenseReport");
				Database.RemoveColumn("[CRM].[PerDiemAllowanceEntry]", "ExpenseReportId");
			}
		}
	}
}