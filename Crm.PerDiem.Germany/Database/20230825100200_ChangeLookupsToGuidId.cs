namespace Crm.PerDiem.Germany.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

	[Migration(20230825100200)]
	public class ChangeLookupsToGuidId : Migration
	{
		public override void Up()
		{
			Database.ChangeTableFromIntToGuidId("LU", "PerDiemAllowance", "PerDiemAllowanceId");
			Database.ChangeTableFromIntToGuidId("LU", "PerDiemAllowanceAdjustment", "PerDiemAllowanceAdjustmentId");
		}
	}
}
