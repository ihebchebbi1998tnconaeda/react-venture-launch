namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowanceEntry
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model;

	public class PerDiemAllowanceRequired : RequiredRule<PerDiemAllowanceEntry>
	{
		public PerDiemAllowanceRequired()
		{
			Init(x => x.PerDiemAllowanceKey, "Region");
		}
	}
}