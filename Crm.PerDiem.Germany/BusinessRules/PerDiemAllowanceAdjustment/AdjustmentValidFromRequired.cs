namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowance
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model.Lookups;
	public class AdjustmentValidFromRequired : RequiredRule<PerDiemAllowanceAdjustment>
	{
		public AdjustmentValidFromRequired()
		{
			Init(x => x.ValidFrom);
		}
	}
}