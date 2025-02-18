namespace Crm.PerDiem.Germany.Model.Mappings
{
	using System;

	using Crm.Library.BaseModel.Mappings;

	using NHibernate.Mapping.ByCode;
	using NHibernate.Type;

	using GuidCombGeneratorDef = LMobile.Unicore.NHibernate.GuidCombGeneratorDef;

	public class PerDiemAllowanceEntryMap : EntityClassMapping<PerDiemAllowanceEntry>
	{
		public PerDiemAllowanceEntryMap()
		{
			Schema("CRM");
			Table("PerDiemAllowanceEntry");

			Id(
				x => x.Id,
				map =>
				{
					map.Column("PerDiemAllowanceEntryId");
					map.Generator(GuidCombGeneratorDef.Instance);
					map.UnsavedValue(Guid.Empty);
				});

			Property(x => x.AllDay);
			Property(x => x.Amount);
			Property(x => x.CostCenterKey);
			Property(x => x.CurrencyKey);
			Property(x => x.Date, m => m.Type<DateType>());
			Property(x => x.IsClosed);
			Property(x => x.PerDiemAllowanceKey);
			Property(x => x.PerDiemReportId);
			Property(x => x.ResponsibleUser);
			
			ManyToOne(
				x => x.PerDiemReport,
				map =>
				{
					map.Column("PerDiemReportId");
					map.Fetch(FetchKind.Select);
					map.Lazy(LazyRelation.Proxy);
					map.Cascade(Cascade.None);
					map.Insert(false);
					map.Update(false);
				});
			ManyToOne(x => x.ResponsibleUserObject,
				m =>
				{
					m.Column("ResponsibleUser");
					m.Fetch(FetchKind.Select);
					m.Insert(false);
					m.Update(false);
				});
			this.EntitySet(
				x => x.AdjustmentReferences,
				map =>
				{
					map.Key(km => km.Column("PerDiemAllowanceEntryKey"));
					map.Inverse(true);
					map.Fetch(CollectionFetchMode.Select);
					map.Lazy(CollectionLazy.Lazy);
					map.BatchSize(100);
				},
				a => a.OneToMany());
		}
	}
}
