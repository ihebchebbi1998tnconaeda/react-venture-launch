using Crm.Library.BaseModel;
using Crm.Library.BaseModel.Interfaces;
using Crm.PerDiem.Germany.Model.Enums;

using System;

namespace Crm.PerDiem.Germany.Model
{
	public class PerDiemAllowanceEntryAllowanceAdjustmentReference : EntityBase<Guid>, ISoftDelete, INoAuthorisedObject
	{
		public virtual Guid PerDiemAllowanceEntryKey { get; set; }
		public virtual bool IsPercentage { get; set; }
		public virtual AdjustmentFrom AdjustmentFrom { get; set; }
		public virtual decimal AdjustmentValue { get; set; }
		public virtual string PerDiemAllowanceAdjustmentKey { get; set; }
	}
}
