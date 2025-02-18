namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowanceEntry
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model;

	public class DateRequired : RequiredRule<PerDiemAllowanceEntry>
	{
		public DateRequired()
		{
			Init(x => x.Date);
		}
	}
}