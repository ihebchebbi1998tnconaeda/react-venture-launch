
using Crm.Library.BaseModel.Mappings;
using Crm.PerDiem.Germany.Model.Enums;

using NHibernate.Type;
using System;


namespace Crm.PerDiem.Germany.Model.Mappings
{
	public class PerDiemAllowanceEntryAllowanceAdjustmentReferenceMap : EntityClassMapping<PerDiemAllowanceEntryAllowanceAdjustmentReference>

	{
		public PerDiemAllowanceEntryAllowanceAdjustmentReferenceMap()
		{
			Schema("CRM");
			Table("PerDiemAllowanceEntryAllowanceAdjustmentReference");

			Id(
				x => x.Id,
				map =>
				{
					map.Column("PerDiemAllowanceEntryAllowanceAdjustmentReferenceId");
					map.Generator(LMobile.Unicore.NHibernate.GuidCombGeneratorDef.Instance);
					map.UnsavedValue(Guid.Empty);
				});
			Property(x => x.PerDiemAllowanceEntryKey);
			Property(x => x.PerDiemAllowanceAdjustmentKey);
			Property(x => x.AdjustmentValue);
			Property(x => x.AdjustmentFrom, m => m.Type<EnumStringType<AdjustmentFrom>>());
			Property(x => x.IsPercentage);
		}
	}
}
