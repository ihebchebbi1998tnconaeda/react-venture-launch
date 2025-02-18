namespace Crm.PerDiem.Germany.Controllers.OData
{
	using Crm.Library.Api.Model;
	using Crm.PerDiem.Controllers.OData;
	using Crm.PerDiem.Germany.Rest.Model;

	using ODataConventionModelBuilder = Crm.Library.Api.Model.ODataConventionModelBuilder;

	public class PerDiemGermanyFunctionConfigurator : IModelConfigurator
	{
		private readonly DistinctDateFunctionConfiguratorHelper helper;
		public PerDiemGermanyFunctionConfigurator(DistinctDateFunctionConfiguratorHelper helper)
		{
			this.helper = helper;
		}
		public virtual void Configure(ODataConventionModelBuilder builder)
		{
			helper.Configure<PerDiemAllowanceEntryRest>(builder);
		}
	}
}
