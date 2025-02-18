namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowance
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model.Lookups;
	public class AdjustmentValidToRequired : RequiredRule<PerDiemAllowanceAdjustment>
	{
		public AdjustmentValidToRequired()
		{
			Init(x => x.ValidTo);
		}
	}
}