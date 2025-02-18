namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowance
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model.Lookups;

	public class ValidToRequired : RequiredRule<PerDiemAllowance>
	{
		public ValidToRequired()
		{
			Init(x => x.ValidTo);
		}
	}
}