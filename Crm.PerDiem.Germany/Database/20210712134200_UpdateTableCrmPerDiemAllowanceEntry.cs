using Crm.Library.Data.MigratorDotNet.Framework;

namespace Crm.PerDiem.Germany.Database
{
	[Migration(20210712134200)]
	public class UpdateTableCrmPerDiemAllowanceEntry : Migration
	{
		public override void Up()
		{
			Database.ExecuteNonQuery(
				@"INSERT INTO CRM.PerDiemAllowanceEntryAllowanceAdjustmentReference (PerDiemAllowanceEntryKey, PerDiemAllowanceAdjustmentKey, IsPercentage, AdjustmentFrom, AdjustmentValue) 
				SELECT a.PerDiemAllowanceEntryId, 'breakfast', 1, 2,-0.2
				FROM CRM.PerDiemAllowanceEntry a
				Where a.CutBreakfast = 1 AND a.IsActive = 1");

			Database.ExecuteNonQuery(
				@"INSERT INTO CRM.PerDiemAllowanceEntryAllowanceAdjustmentReference (PerDiemAllowanceEntryKey, PerDiemAllowanceAdjustmentKey, IsPercentage, AdjustmentFrom, AdjustmentValue) 
				SELECT a.PerDiemAllowanceEntryId, 'lunch', 1, 2,-0.4
				FROM CRM.PerDiemAllowanceEntry a
				Where a.CutLunch = 1 AND a.IsActive = 1");

			Database.ExecuteNonQuery(
				@"INSERT INTO CRM.PerDiemAllowanceEntryAllowanceAdjustmentReference (PerDiemAllowanceEntryKey, PerDiemAllowanceAdjustmentKey, IsPercentage, AdjustmentFrom, AdjustmentValue) 
				SELECT a.PerDiemAllowanceEntryId, 'dinner', 1, 2,-0.4
				FROM CRM.PerDiemAllowanceEntry a
				Where a.CutDinner = 1 AND a.IsActive = 1");

			Database.RemoveColumn("[CRM].[PerDiemAllowanceEntry]", "CutBreakfast");
			Database.RemoveColumn("[CRM].[PerDiemAllowanceEntry]", "CutDinner");
			Database.RemoveColumn("[CRM].[PerDiemAllowanceEntry]", "CutLunch");
		}
	}
}