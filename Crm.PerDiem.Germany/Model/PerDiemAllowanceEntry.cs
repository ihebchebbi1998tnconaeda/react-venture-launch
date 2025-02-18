namespace Crm.PerDiem.Germany.Model
{
	using Crm.PerDiem.Model;
	using System.Collections.Generic;

	public class PerDiemAllowanceEntry : Expense
	{
		public virtual bool AllDay { get; set; }

		public virtual string PerDiemAllowanceKey { get; set; }
		public virtual ICollection<PerDiemAllowanceEntryAllowanceAdjustmentReference> AdjustmentReferences { get; set; }

		public PerDiemAllowanceEntry()
		{
			AdjustmentReferences = new List<PerDiemAllowanceEntryAllowanceAdjustmentReference>();
		}
	}
}
