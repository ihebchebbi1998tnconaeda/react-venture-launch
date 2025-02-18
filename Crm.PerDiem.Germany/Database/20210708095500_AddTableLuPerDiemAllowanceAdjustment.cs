using Crm.Library.Data.MigratorDotNet.Framework;
using System.Data;

namespace Crm.PerDiem.Germany.Database
{
	[Migration(20210708095500)]
	public class AddTableLuPerDiemAllowanceAdjustment : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[LU].[PerDiemAllowanceAdjustment]"))
			{
				Database.AddTable(
					"LU.PerDiemAllowanceAdjustment",
					new Column("PerDiemAllowanceAdjustmentId", DbType.Int32, ColumnProperty.PrimaryKeyWithIdentity),
					new Column("Name", DbType.String, ColumnProperty.NotNull),
					new Column("Value", DbType.String, ColumnProperty.NotNull),
					new Column("Language", DbType.String, 2, ColumnProperty.NotNull),
					new Column("SortOrder", DbType.Int32, ColumnProperty.NotNull, 0),
					new Column("IsPercentage", DbType.Boolean, ColumnProperty.NotNull, true),
					new Column("AdjustmentFrom", DbType.Int16, ColumnProperty.NotNull),
					new Column("AdjustmentValue", DbType.Decimal, ColumnProperty.NotNull),
					new Column("CountryKey", DbType.String, 50, ColumnProperty.Null, null),
					new Column("Favorite", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("ValidFrom", DbType.DateTime, ColumnProperty.NotNull),
					new Column("ValidTo", DbType.DateTime, ColumnProperty.NotNull),
					new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("CreateUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("ModifyUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true)
				);
			}

			Insert("breakfast", "Frühstück", "Breakfast", "Desayuno", "Petit-déjeuner", 2, "-0.2", true, 1);
			Insert("lunch", "Mittagessen", "Lunch", "Almuerzo", "Déjeuner", 2, "-0.4", true, 2);
			Insert("dinner", "Abendessen", "Dinner", "Cena", "Diner", 2, "-0.4", true, 3);
		}

		private void Insert(string value, string nameDe, string nameEn, string nameEs, string nameFr, int adjustmentFrom, string adjustmentValue, bool isPercentage, int sortOrder)
		{
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowanceAdjustment (Name, Value, [Language], IsPercentage, AdjustmentFrom, AdjustmentValue, ValidFrom, ValidTo, SortOrder) VALUES('{nameDe}', '{value}', 'de', '{isPercentage}', '{adjustmentFrom}','{adjustmentValue}', '2021-01-01', '2999-12-31T23:59:59','{sortOrder}'); ");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowanceAdjustment (Name, Value, [Language], IsPercentage, AdjustmentFrom, AdjustmentValue, ValidFrom, ValidTo, SortOrder) VALUES('{nameEn}', '{value}', 'en', '{isPercentage}', '{adjustmentFrom}','{adjustmentValue}', '2021-01-01', '2999-12-31T23:59:59','{sortOrder}'); ");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowanceAdjustment (Name, Value, [Language], IsPercentage, AdjustmentFrom, AdjustmentValue, ValidFrom, ValidTo, SortOrder) VALUES('{nameEs}', '{value}', 'es', '{isPercentage}', '{adjustmentFrom}','{adjustmentValue}', '2021-01-01', '2999-12-31T23:59:59','{sortOrder}'); ");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowanceAdjustment (Name, Value, [Language], IsPercentage, AdjustmentFrom, AdjustmentValue, ValidFrom, ValidTo, SortOrder) VALUES('{nameFr}', '{value}', 'fr', '{isPercentage}', '{adjustmentFrom}','{adjustmentValue}', '2021-01-01', '2999-12-31T23:59:59','{sortOrder}'); ");
		}
	}
}
