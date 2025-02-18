

namespace Crm.PerDiem.Germany.BusinessRules.PerDiemAllowanceAdjustment
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model.Lookups;
	public class AdjustmentValueIsNotZero : NotZeroRule<PerDiemAllowanceAdjustment>
	{
		public AdjustmentValueIsNotZero()
		{
			Init(x => x.AdjustmentValue);
		}

	}
}