namespace Crm.PerDiem.Germany.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Helper;
	using Crm.PerDiem.Germany.Model.Lookups;

	[Migration(20230825100300)]
	public class AddAuthDataIdToLookups : Migration
	{
		public override void Up()
		{
			var helper = new UnicoreMigrationHelper(Database);
			helper.AddOrUpdateEntityAuthDataColumn<PerDiemAllowance>("LU", "PerDiemAllowance");
			helper.AddOrUpdateEntityAuthDataColumn<PerDiemAllowanceAdjustment>("LU", "PerDiemAllowanceAdjustment");
		}
	}
}
