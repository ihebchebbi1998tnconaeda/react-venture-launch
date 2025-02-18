using Crm.Library.Data.MigratorDotNet.Framework;
using System.Data;

namespace Crm.PerDiem.Germany.Database
{
	[Migration(20210708095800)]
	public class CreateTableCrmPerDiemAllowanceEntryAllowanceAdjustmentReference : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[CRM].[PerDiemAllowanceEntryAllowanceAdjustmentReference]"))
			{
				Database.AddTable(
					"CRM.PerDiemAllowanceEntryAllowanceAdjustmentReference",
					new Column("PerDiemAllowanceEntryAllowanceAdjustmentReferenceId", DbType.Guid, ColumnProperty.PrimaryKey, "NEWSEQUENTIALID()"),
					new Column("PerDiemAllowanceEntryKey", DbType.Guid, ColumnProperty.NotNull),
					new Column("PerDiemAllowanceAdjustmentKey", DbType.String, 50, ColumnProperty.NotNull),
					new Column("IsPercentage", DbType.Boolean, ColumnProperty.NotNull, true),
					new Column("AdjustmentFrom", DbType.String,50, ColumnProperty.NotNull),
					new Column("AdjustmentValue", DbType.Decimal, ColumnProperty.NotNull),
					new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("CreateUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("ModifyUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true)
				);

				if (!Database.ConstraintExists("[CRM].[PerDiemAllowanceEntryAllowanceAdjustmentReference]", "FK_PerDiemAllowanceEntryAllowanceAdjustmentReference_PerDiemAllowanceEntry"))
				{
					Database.AddForeignKey("FK_PerDiemAllowanceEntryAllowanceAdjustmentReference_PerDiemAllowanceEntry", "[CRM].[PerDiemAllowanceEntryAllowanceAdjustmentReference]", "PerDiemAllowanceEntryKey", "[CRM].[PerDiemAllowanceEntry]", "PerDiemAllowanceEntryId");
				}
			}
		}
	}
}