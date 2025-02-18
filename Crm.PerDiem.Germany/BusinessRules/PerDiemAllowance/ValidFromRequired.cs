namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowance
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model.Lookups;

	public class ValidFromRequired : RequiredRule<PerDiemAllowance>
	{
		public ValidFromRequired()
		{
			Init(x => x.ValidFrom);
		}
	}
}