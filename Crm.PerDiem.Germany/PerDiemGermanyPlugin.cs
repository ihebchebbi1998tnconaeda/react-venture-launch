namespace Crm.PerDiem.Germany
{
	using Crm.Library.Modularization;

	[Plugin(Requires = "Crm.PerDiem")]
	public class PerDiemGermanyPlugin : Plugin
	{
		public static string PluginName = typeof(PerDiemGermanyPlugin).Namespace;
	}
}