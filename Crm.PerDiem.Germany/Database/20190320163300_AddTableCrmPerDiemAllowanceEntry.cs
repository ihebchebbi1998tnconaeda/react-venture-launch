namespace Crm.PerDiem.Germany.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Helper;
	using Crm.PerDiem.Germany.Model;

	[Migration(20190320163300)]
	public class AddTableCrmPerDiemAllowanceEntry : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[CRM].[PerDiemAllowanceEntry]"))
			{
				var reportTable = Database.TableExists("[CRM].[PerDiemReport]") ? "[CRM].[PerDiemReport]" : "[SMS].[ExpenseReport]";
				var reportTableName = Database.TableExists("[CRM].[PerDiemReport]") ? "PerDiemReport" : "ExpenseReport";
				var reportTableId = Database.TableExists("[CRM].[PerDiemReport]") ? "PerDiemReportId" : "Id";
				Database.AddTable(
					"CRM.PerDiemAllowanceEntry",
					new Column("PerDiemAllowanceEntryId", DbType.Guid, ColumnProperty.PrimaryKey, "NEWSEQUENTIALID()"),
					new Column("AllDay", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("Amount", DbType.Decimal, 2, ColumnProperty.NotNull),
					new Column("CostCenterKey", DbType.String, 50, ColumnProperty.Null),
					new Column("CurrencyKey", DbType.String, 20, ColumnProperty.NotNull),
					new Column("CutBreakfast", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("CutDinner", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("CutLunch", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("Date", DbType.DateTime, ColumnProperty.NotNull),
					new Column("IsClosed", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column($"{reportTableName}Id", DbType.Guid, ColumnProperty.Null),
					new Column("PerDiemAllowanceKey", DbType.String, 50, ColumnProperty.NotNull),
					new Column("ResponsibleUser", DbType.String, 256, ColumnProperty.NotNull),
					new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("CreateUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("ModifyUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true)
				);
				Database.AddForeignKey($"FK_PerDiemAllowanceEntry_{reportTableName}", "[CRM].[PerDiemAllowanceEntry]", $"{reportTableName}Id", reportTable, reportTableId);
			}
			var helper = new UnicoreMigrationHelper(Database);
				helper.AddEntityTypeAndAuthDataColumnIfNeeded<PerDiemAllowanceEntry>("CRM", "PerDiemAllowanceEntry");
		}
	}
}
