namespace Crm.PerDiem.Germany.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;

	[Migration(20240703120500)]
	public class ChangeLookupsReplicationToGuidId : Migration
	{
		public override void Up()
		{
			Database.ChangeReplicatedEntityFromIntToGuidId("LU", "PerDiemAllowance", "PerDiemAllowanceId");
			Database.ChangeReplicatedEntityFromIntToGuidId("LU", "PerDiemAllowanceAdjustment", "PerDiemAllowanceAdjustmentId");
		}
	}
}
