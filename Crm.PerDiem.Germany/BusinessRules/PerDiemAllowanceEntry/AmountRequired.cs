namespace Crm.PerDiem.Germany.BusinessRules.ExpenseRules
{
	using Crm.Library.Validation.BaseRules;
	using Crm.PerDiem.Germany.Model;

	public class AmountRequired : RequiredRule<PerDiemAllowanceEntry>
	{
		// Constructor
		public AmountRequired()
		{
			Init(e => e.Amount);
		}

		public override bool IsSatisfiedBy(PerDiemAllowanceEntry entity)
		{
			return entity.Amount >= 0;
		}
	}
}