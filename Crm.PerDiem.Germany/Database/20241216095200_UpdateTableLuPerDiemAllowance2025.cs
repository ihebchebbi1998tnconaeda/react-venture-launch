namespace Crm.PerDiem.Germany.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Helper;
	using Crm.PerDiem.Germany.Model.Lookups;

	[Migration(20241216095200)]
	public class UpdateTableLuPerDiemAllowance2025 : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[LU].[PerDiemAllowance]"))
			{
				Database.AddTable(
					"LU.PerDiemAllowance",
					new Column("PerDiemAllowanceId", DbType.Int32, ColumnProperty.PrimaryKeyWithIdentity),
					new Column("Value", DbType.String, 50, ColumnProperty.NotNull),
					new Column("Name", DbType.String, ColumnProperty.NotNull),
					new Column("Language", DbType.String, 2, ColumnProperty.NotNull),
					new Column("AllDayAmount", DbType.Decimal, 2, ColumnProperty.NotNull),
					new Column("PartialDayAmount", DbType.Decimal, 2, ColumnProperty.NotNull),
					new Column("CurrencyKey", DbType.String, 20, ColumnProperty.NotNull),
					new Column("ValidFrom", DbType.DateTime, ColumnProperty.NotNull),
					new Column("ValidTo", DbType.DateTime, ColumnProperty.NotNull),
					new Column("Favorite", DbType.Boolean, ColumnProperty.NotNull, false),
					new Column("SortOrder", DbType.Int32, ColumnProperty.NotNull, 0),
					new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("CreateUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("ModifyUser", DbType.String, ColumnProperty.NotNull, "'Setup'"),
					new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true)
				);
			}

			Insert("2025-DE", "Deutschland", "Germany", "Allemagne", "Németország", "Alemania", 14, 28, true);
			Insert("2025-AT", "Österreich ", "Austria", "Autriche", "Ausztria", "Austria", 33, 50, sortOrder: 1);
			Insert("2025-CH-GENEVA", "Schweiz (Genf)", "Switzerland (Geneva)", "Suisse (Genève)", "Svájc (Genf)", "Suiza (Ginebra)", 44, 66, sortOrder: 2);
			Insert("2025-CH", "Schweiz (im Übrigen)", "Switzerland (remaining)", "Suisse (restant)", "Svájc (fennmaradó)", "Suiza (restante)", 43, 64, sortOrder: 3);
			Insert("2025-AD", "Andorra", "Andorra", "Andorre", "Andorra", "Andorra", 28, 41);
			Insert("2025-AE", "Vereinigte Arabische Emirate", "United Arab Emirates", "Emirats Arabes Unis", "Egyesült Arab Emírségek", "Emiratos Árabes Unidos", 44, 65);
			Insert("2025-AF", "Afghanistan", "Afghanistan", "Afghanistan", "Afganisztán", "Afganistán", 20, 30);
			Insert("2025-AG", "Antigua und Barbuda", "Antigua and Barbuda", "Antigua et Barbuda", "Antigua és Barbuda", "Antigua y Barbuda", 30, 45);
			Insert("2025-AL", "Albanien", "Albania", "Albanie", "Albánia", "Albania", 18, 27);
			Insert("2025-AM", "Armenien", "Armenia", "Arménie", "Örményország", "Armenia", 20, 29);
			Insert("2025-AO", "Angola", "Angola", "Angola", "Angola", "Angola", 27, 40);
			Insert("2025-AR", "Argentinien", "Argentina", "Argentine", "Argentína", "Argentina", 24, 35);
			Insert("2025-AU", "Australien (im Übrigen)", "Australia (remaining)", "Australie (restant)", "Ausztrália (fennmaradó)", "Australia (restante)", 38, 57);
			Insert("2025-AU-CANBERRA", "Australien (Canberra)", "Australia (Canberra)", "Australie (Canberra)", "Ausztrália (Canberra)", "Australia (Canberra)", 49, 74);
			Insert("2025-AU-SYDNEY", "Australien (Sydney)", "Australia (Sydney)", "Australie", "Ausztrália (Sydney)", "Australia (Sídney)", 38, 57);
			Insert("2025-AZ", "Aserbaidschan", "Azerbaijan", "Azerbaïdjan", "Azerbajdzsán", "Azerbaiyán", 29, 44);
			Insert("2025-BA", "Bosnien und Herzegowina", "Bosnia and Herzegovina", "Bosnie et Herzégovine", "Bosznia és Hercegovina", "Bosnia y Herzegovina", 16, 23);
			Insert("2025-BB", "Barbados", "Barbados", "Barbade", "Barbados", "Barbados", 36, 54);
			Insert("2025-BD", "Bangladesch", "Bangladesh", "Bangladesh", "Bangladesben", "Bangladesh", 31, 46);
			Insert("2025-BE", "Belgien", "Belgium", "Belgique", "Belgium", "Bélgica", 40, 59);
			Insert("2025-BF", "Burkina Faso", "Burkina Faso", "Burkina Faso", "Burkina Faso", "Burkina Faso", 25, 38);
			Insert("2025-BG", "Bulgarien", "Bulgaria", "Bulgarie", "Bulgária", "Bulgaria", 15, 22);
			Insert("2025-BH", "Bahrain", "Bahrain", "Bahrain", "Bahrain", "Bahréin", 32, 48);
			Insert("2025-BI", "Burundi", "Burundi", "Burundi", "Burundi", "Burundi", 24, 36);
			Insert("2025-BJ", "Benin", "Benin", "Bénin", "Benin", "Benín", 35, 52);
			Insert("2025-BN", "Brunei", "Brunei", "Brunei", "Brunei", "Brunéi", 30, 45);
			Insert("2025-BO", "Bolivien", "Bolivia", "Bolivie", "Bolívia", "bolivia", 31, 46);
			Insert("2025-BR", "Brasilien (im Übrigen)", "Brazil (remaining)", "Brésil (restant)", "Brazília (fennmaradó)", "Brasil (restante)", 31, 46);
			Insert("2025-BR-BRASILIA", "Brasilien (Brasilia)", "Brazil (Brasilia)", "Brésil (Brasilia)", "Brazília (Brazília)", "Brasil", 34, 51);
			Insert("2025-BR-RIODEJANEIRO", "Brasilien (Rio de Janeiro)", "Brazil (Rio de Janeiro)", "Brésil (Rio de Janeiro)", "Brazília (Rio de Janeiro)", "Brasil (Río de Janeiro)", 46, 69);
			Insert("2025-BR-SAOPAULO", "Brasilien (Sao Paulo)", "Brazil (Sao Paulo)", "Brésil (Sao Paulo)", "Brazília (Sao Paulo)", "Brasil (São Paulo)", 31, 46);
			Insert("2025-BT", "Bhutan", "Bhutan", "Bhutan", "Bhutan", "Bhutan", 18, 27);
			Insert("2025-BW", "Botsuana", "Botswana", "Botswana", "Botswana", "Botsuana", 31, 46);
			Insert("2025-BY", "Weißrussland", "Belarus", "Belarus", "Belarus", "Bielorrusia", 13, 20);
			Insert("2025-CA", "Kanada (im Übrigen)", "Canada (remaining)", "Canada (restant)", "Kanada (fennmaradó)", "Canadá (restante)", 36, 54);
			Insert("2025-CA-OTTAWA", "Kanada (Ottawa)", "Canada (Ottawa)", "Canada (Ottawa)", "Kanada (Ottawa)", "Canadá (Ottawa)", 41, 62);
			Insert("2025-CA-TORONTO", "Kanada (Toronto)", "Canada (Toronto)", "Canada (Toronto)", "Kanada (Toronto)", "Canadá (Toronto)", 36, 54);
			Insert("2025-CA-VANCOUVER", "Kanada (Vancouver)", "Canada (Vancouver)", "Canada (Vancouver)", "Kanada (Vancouver)", "Canadá (Vancouver)", 42, 63);
			Insert("2025-CF", "Zentralafrikanische Republik", "Central African Republic", "République centrafricaine", "Közép-afrikai Köztársaság", "República Centroafricana", 36, 53);
			Insert("2025-CG", "Kongo (Republik)", "Kongo (Republic)", "Congo (République)", "Kongó (Köztársaság)", "Congo (República)", 41, 62);
			Insert("2025-CD", "Kongo (Demokratische Republik)", "Kongo (Democratic Republic)", "Congo (République démocratique)", "Kongó (Demokratikus Köztársaság)", "Congo (República Democrática)", 44, 65);
			Insert("2025-CI", "Republik Côte d''Ivoire", "Republic of Côte d''Ivoire", "République de Côte d''Ivoire", "Elefántcsontparti Köztársaság", "República de Costa de Marfil", 34, 51);
			Insert("2025-CL", "Chile", "Chile", "Chili", "Chile", "Chile", 29, 44);
			Insert("2025-CM", "Kamerun", "Cameroon", "Cameroun", "Kamerun", "Camerún", 37, 56);
			Insert("2025-CN", "China (im Übrigen)", "China (remaining)", "Chine (restant)", "Kína (fennmaradó)", "China (restante)", 32, 48);
			Insert("2025-CN-BEIJING", "China (Peking)", "China (Beijing)", "Chine (Beijing)", "Kína (Peking)", "China (Pekín)", 20, 30);
			Insert("2025-CN-CHENGDU", "China (Chengdu)", "China (Chengdu)", "Chine (Chengdu)", "Kína (Chengdu)", "China (Chengdú)", 28, 41);
			Insert("2025-CN-GUANGZHOU", "China (Kanton)", "China (Canton)", "Chine (Canton)", "Kína (Canton)", "China (Cantón)", 24, 36);
			Insert("2025-CN-HONGKONG", "China (Hongkong)", "China (Hong Kong)", "Chine (Hong Kong)", "Kína (Hong Kong)", "China (Hong Kong)", 48, 71);
			Insert("2025-CN-SHANGHAI", "China (Shanghai)", "China (Shanghai)", "Chine (Shanghai)", "Kína (Sanghaj)", "China (Shanghái)", 39, 58);
			Insert("2025-CO", "Kolumbien", "Colombia", "Colombie", "Colombia", "Colombia", 23, 34);
			Insert("2025-CR", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", 40, 60);
			Insert("2025-CU", "Kuba", "Cuba", "Cuba", "Kuba", "Cuba", 34, 51);
			Insert("2025-CV", "Kap Verde", "Cape Verde", "Cap Vert", "Zöld-foki Köztársaság", "Cabo Verde", 25, 38);
			Insert("2025-CY", "Zypern", "Cyprus", "Chypre", "Ciprus", "Chipre", 28, 42);
			Insert("2025-CZ", "Tschechische Republik", "Czech Republic", "République Tchèque", "Cseh Köztársaság", "República Checa", 21, 32);
			Insert("2025-DJ", "Dschibuti", "Djibouti", "Djibouti", "Djibouti", "Yibuti", 52, 77);
			Insert("2025-DK", "Dänemark", "Denmark", "Danemark", "Dánia", "Dinamarca", 50, 75);
			Insert("2025-DM", "Dominica", "Dominica", "Dominica", "Dominika", "república dominicana", 30, 45);
			Insert("2025-DO", "Dominikanische Republik", "Dominican Republic", "République Dominicaine", "Dominikai Köztársaság", "República Dominicana", 33, 50);
			Insert("2025-DZ", "Algerien", "Algeria", "Algérie", "Algéria", "Argelia", 32, 47);
			Insert("2025-EC", "Ecuador", "Ecuador", "Equateur", "Ecuador", "Ecuador", 18, 27);
			Insert("2025-EE", "Estland", "Estonia", "Estonie", "Észtország", "Estonia", 20, 29);
			Insert("2025-EG", "Ägypten", "Egypt", "Egypte", "Egyiptom", "Egipto", 33, 50);
			Insert("2025-ER", "Eritrea", "Eritrea", "Érythrée", "Eritrea", "Eritrea", 31, 46);
			Insert("2025-ES", "Spanien (im Übrigen)", "Spain (remaining)", "Espagne (restant)", "Spanyolország (fennmaradó)", "España (restante)", 23, 34);
			Insert("2025-ES-BARCELONA", "Spanien (Barcelona)", "Spain (Barcelona)", "Espagne (Barcelone)", "Spanyolország (Barcelona)", "España (Barcelona)", 23, 34);
			Insert("2025-ES-CANARYISLANDS", "Spanien (Kanarische Inseln)", "Spain (Canary Islands)", "Espagne (îles Canaries)", "Spanyolország (Kanári-szigetek)", "España (Islas Canarias)", 24, 36);
			Insert("2025-ES-MADRID", "Spanien (Madrid)", "Spain (Madrid)", "Espagne (Madrid)", "Spanyolország (Madrid)", "España (Madrid)", 28, 42);
			Insert("2025-ES-PALMADEMALLORCA", "Spanien (Palma de Mallorca)", "Spain (Palma de Mallorca)", "Espagne (Palma de Majorque)", "Spanyolország (Palma de Mallorca)", "España (Palma de Mallorca)", 29, 44);
			Insert("2025-ET", "Äthiopien", "Ethiopia", "Ethiopie", "Etiópia", "Etiopía", 29, 44);
			Insert("2025-FI", "Finnland", "Finland", "Finlande", "Finnország", "Finlandia", 36, 54);
			Insert("2025-FJ", "Fidschi", "Fiji", "Fidji", "Fidzsi-szigetek", "Fiyi", 21, 32);
			Insert("2025-FM", "Mikronesien", "Micronesia", "Micronésie", "Mikronézia", "Micronesia", 22, 33);
			Insert("2025-FR", "Frankreich (im Übrigen)", "France (remaining)", "France (restant)", "Franciaország (fennmaradó)", "Francia (restante)", 36, 53);
			Insert("2025-FR-LYON", "Frankreich (Lyon)", "France (Lyon)", "France", "Franciaországban (Lyon)", "Francia (Lyón)", 36, 53);
			Insert("2025-FR-MARSEILLE", "Frankreich (Marseille)", "France (Marseilles)", "France (Marseille)", "Franciaország (Marseille)", "Francia (Marsella)", 31, 46);
			Insert("2025-FR-PARIS", "Frankreich (Paris)", "France (Paris)", "France (Paris)", "Franciaország (Párizs)", "Francia (París)", 39, 58);
			Insert("2025-FR-STRASBOURG", "Frankreich (Straßburg)", "France (Strasbourg)", "France (Strasbourg)", "Franciaország (Strasbourg)", "Francia (Estrasburgo)", 34, 51);
			Insert("2025-GA", "Gabun", "Gabon", "Gabon", "Gabon", "Gabón", 43, 64);
			Insert("2025-GB", "Großbrit. u. Nordirland (im Übrigen)", "Great Britain and Northern Ireland (remaining)", "Grande-Bretagne et Irlande du Nord (restant)", "Nagy-Britannia és Észak-Írország (fennmaradó)", "Gran Bretaña e Irlanda del Norte (restantes)", 35, 52);
			Insert("2025-GB-LONDON", "Großbrit. u. Nordirland  (London)", "Great Britain and Northern Ireland (London)", "Grande-Bretagne et Irlande du Nord (Londres)", "Nagy-Britannia és Észak-Írország (London)", "Gran Bretaña e Irlanda del Norte (Londres)", 44, 66);
			Insert("2025-GD", "Grenada", "Grenada", "Grenada", "Grenada", "Granada", 30, 45);
			Insert("2025-GE", "Georgien", "Georgia", "Géorgie", "Grúzia", "Georgia", 30, 45);
			Insert("2025-GH", "Ghana", "Ghana", "Ghana", "Ghána", "Ghana", 31, 46);
			Insert("2025-GM", "Gambia", "Gambia", "Gambie", "Gambia", "Gambia", 27, 40);
			Insert("2025-GN", "Guinea", "Guinea", "Guinée", "Guinea", "Guinea", 40, 59);
			Insert("2025-GQ", "Äquatorialguinea", "Equatorial Guinea", "Guinée équatoriale", "Egyenlítoi-Guinea", "Guinea Ecuatorial", 28, 42);
			Insert("2025-GR", "Griechenland (im Übrigen)", "Greece (remaining)", "Grèce (restant)", "Görögország (fennmaradó)", "Grecia (restante)", 24, 36);
			Insert("2025-GR-ATHENS", "Griechenland (Athen)", "Greece (Athens)", "Grèce (Athènes)", "Görögország (Athén)", "Grecia (Atenas)", 27, 40);
			Insert("2025-GT", "Guatemala", "Guatemala", "Guatemala", "Guatemala", "Guatemala", 31, 46);
			Insert("2025-GW", "Guinea-Bissau", "Guinea-Bissau", "Guinée-Bissau", "Bissau-Guinea", "Guinea-Bisáu", 21, 32);
			Insert("2025-GY", "Guyana", "Guyana", "Guyane", "Guyana", "Guayana", 30, 45);
			Insert("2025-HN", "Honduras", "Honduras", "Honduras", "Honduras", "Honduras", 38, 57);
			Insert("2025-HR", "Kroatien", "Croatia", "Croatie", "Horvátország", "Croacia", 31, 46);
			Insert("2025-HT", "Haiti", "Haiti", "Haïti", "Haiti", "Haití", 39, 58);
			Insert("2025-HU", "Ungarn", "Hungary", "Hongrie", "Magyarország", "Hungría", 21, 32);
			Insert("2025-ID", "Indonesien", "Indonesia", "Indonésie", "Indonézia", "Indonesia", 30, 45);
			Insert("2025-IE", "Irland", "Ireland", "Irlande", "Írország", "Irlanda", 39, 58);
			Insert("2025-IL", "Israel", "Israel", "Israël", "Izrael", "Israel", 44, 66);
			Insert("2025-IN", "Indien (im Übrigen)", "India (remaining)", "Inde (restant)", "India (fennmaradó)", "India (restante)", 15, 22);
			Insert("2025-IN-BENGALURU", "Indien (Bangalore)", "India (Bengaluru)", "Inde (Bangalore)", "India (Bengaluru)", "India (Bangalore)", 28, 42);
			Insert("2025-IN-CHENNAI", "Indien (Chennai)", "India (Chennai)", "Inde (Chennai)", "India (Chennai)", "India (Chennai)", 15, 22);
			Insert("2025-IN-KOLKATA", "Indien (Kalkutta)", "India (Calcutta)", "Inde (Calcutta)", "India (Kalkutta)", "India (Calcuta)", 21, 32);
			Insert("2025-IN-MUMBAI", "Indien (Mumbai)", "India (Mumbai)", "Inde (Mumbai)", "India (Mumbai)", "India (Bombay)", 36, 53);
			Insert("2025-IN-NEWDELHI", "Indien (Neu Delhi)", "India (New Delhi)", "Inde (New Delhi)", "India (Újdelhi)", "India (Nueva Delhi)", 31, 46);
			Insert("2025-IR", "Iran", "Iran", "Iran", "Irán", "Irán", 22, 33);
			Insert("2025-IS", "Island", "Iceland", "Islande", "Izland", "Islandia", 41, 62);
			Insert("2025-IT", "Italien (im Übrigen)", "Italy (remaining)", "Italie (restant)", "Olaszország (fennmaradó)", "Italia (restante)", 28, 42);
			Insert("2025-IT-MILAN", "Italien (Mailand)", "Italy (Milan)", "Italie (Milan)", "Olaszország (Milánó)", "Italia (Milán)", 28, 42);
			Insert("2025-IT-ROME", "Italien (Rom)", "Italy (Rome)", "Italie (Rome)", "Olaszország (Róma)", "Italia (Roma)", 32, 48);
			Insert("2025-JM", "Jamaika", "Jamaica", "Jamaïque", "Jamaica", "Jamaica", 38, 57);
			Insert("2025-JO", "Jordanien", "Jordan", "Jordanie", "Jordánia", "Jordán", 38, 57);
			Insert("2025-JP", "Japan (im Übrigen)", "Japan (remaining)", "Japon (restant)", "Japán (fennmaradó)", "Japón (restante)", 22, 33);
			Insert("2025-JP-OSAKA", "Japan (Osaka)", "Japan (Osaka)", "Japon (Osaka)", "Japán (Oszaka)", "Japón (Osaka)", 22, 33);
			Insert("2025-JP-TOKYO", "Japan (Tokio)", "Japan (Tokyo)", "Japon (Tokyo)", "Japán (Tokió)", "Japón (Tokio)", 33, 50);
			Insert("2025-KE", "Kenia", "Kenya", "Kenya", "Kenya", "Kenia", 34, 51);
			Insert("2025-KG", "Kirgisistan", "Kyrgyzstan", "Kyrgyzstan", "Kirgizisztán", "Kirguistán", 18, 27);
			Insert("2025-KH", "Kambodscha", "Cambodia", "Cambodge", "Kambodzsa", "Camboya", 25, 38);
			Insert("2025-KN", "St. Kitts und Nevis", "St. Kitts and Nevis", "Saint-Kitts-et-Nevis", "St. Kitts és Nevis", "San Cristóbal y Nieves", 30, 45);
			Insert("2025-KW", "Kuwait", "Kuwait", "Koweit", "Kuvait", "Kuwait", 37, 56);
			Insert("2025-KZ", "Kasachstan", "Kazakhstan", "kazakhstan", "Kazahsztán", "Kazajstán", 22, 33);
			Insert("2025-LA", "Laos", "Laos", "Laos", "Laosz", "Laos", 24, 35);
			Insert("2025-LB", "Libanon", "Lebanon", "Liban", "Libanon", "Líbano", 46, 69);
			Insert("2025-LC", "St. Lucia", "St. Lucia", "Sainte Lucie", "St. Lucia", "Santa Lucía", 30, 45);
			Insert("2025-LI", "Liechtenstein", "Liechtenstein", "Liechtenstein", "Liechtenstein", "Liechtenstein", 37, 56);
			Insert("2025-LK", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Srí Lanka", "Sri Lanka", 24, 36);
			Insert("2025-LR", "Sri Lanka", "Liberia", "Libéria", "Libéria", "Liberia", 44, 65);
			Insert("2025-LS", "Lesotho", "Lesotho", "Lesotho", "Lesotho", "Lesoto", 19, 28);
			Insert("2025-LT", "Litauen", "Lithuania", "Lituanie", "Litvánia", "Lituania", 17, 26);
			Insert("2025-LU", "Luxemburg", "Luxembourg", "Luxembourg", "Luxemburg", "Luxemburgo", 42, 63);
			Insert("2025-LV", "Lettland", "Latvia", "Lettonie", "Lettország", "Letonia", 24, 35);
			Insert("2025-LY", "Libyen", "Libya", "Libye", "Líbia", "Libia", 42, 63);
			Insert("2025-MA", "Marokko", "Morocco", "Maroc", "Marokkó", "Marruecos", 28, 41);
			Insert("2025-MC", "Monaco", "Monaco", "Monaco", "Monaco", "Mónaco", 35, 52);
			Insert("2025-ME", "Montenegro", "Montenegro", "Monténégro", "Montenegró", "Montenegro", 21, 32);
			Insert("2025-MG", "Madagaskar", "Madagascar", "Madagascar", "Madagaszkár", "Madagascar", 22, 33);
			Insert("2025-MH", "Marshall Inseln", "Marshall Islands", "Iles Marshall", "Marshall-szigetek", "Islas Marshall", 42, 63);
			Insert("2025-MK", "Nordmazedonien", "North Macedonia", "Macédoine du Nord", "Észak-Macedónia", "Macedonia del Norte", 18, 27);
			Insert("2025-ML", "Mali", "Mali", "Mali", "Mali", "Malí", 25, 38);
			Insert("2025-MM", "Myanmar", "Myanmar", "Myanmar", "Myanmar", "Birmania", 16, 23);
			Insert("2025-MN", "Mongolei", "Mongolia", "Mongolie", "Mongólia", "Mongolia", 16, 23);
			Insert("2025-MR", "Mauretanien", "Mauritania", "Mauritanie", "Mauritánia", "Mauritania", 24, 35);
			Insert("2025-MT", "Malta", "Malta", "Malte", "Málta", "Malta", 31, 46);
			Insert("2025-MU", "Mauritius", "Mauritius", "Ile Maurice", "Mauritius", "Mauricio", 29, 44);
			Insert("2025-MV", "Malediven", "Maldives", "Maldives", "Maldív", "Maldivas", 47, 70);
			Insert("2025-MW", "Malawi", "Malawi", "Malawi", "Malawi", "Malaui", 28, 41);
			Insert("2025-MX", "Mexiko", "Mexico", "Mexique", "Mexikó", "México", 32, 48);
			Insert("2025-MY", "Malaysia", "Malaysia", "Malaisie", "Malaysia", "Malasia", 24, 36);
			Insert("2025-MZ", "Mosambik", "Mozambique", "Mozambique", "Mozambik", "Mozambique", 34, 51);
			Insert("2025-NA", "Namibia", "Namibia", "Namibie", "Namíbia", "Namibia", 20, 30);
			Insert("2025-NE", "Niger", "Niger", "Niger", "Niger", "Níger", 28, 42);
			Insert("2025-NG", "Nigeria", "Nigeria", "Nigeria", "Nigéria", "Nigeria", 31, 46);
			Insert("2025-NI", "Nicaragua", "Nicaragua", "Nicaragua", "Nicaragua", "Nicaragua", 31, 46);
			Insert("2025-NL", "Niederlande", "Netherlands", "Pays-Bas", "Hollandia", "Países Bajos", 32, 47);
			Insert("2025-NO", "Norwegen", "Norway", "Norvège", "Norvégia", "Noruega", 50, 75);
			Insert("2025-NP", "Nepal", "Nepal", "Népal", "Nepál", "Nepal", 24, 36);
			Insert("2025-NZ", "Neuseeland", "New Zealand", "Nouvelle zélande", "Új-Zéland", "Nueva Zelanda", 39, 58);
			Insert("2025-OM", "Oman", "Oman", "Oman", "Omán", "Omán", 43, 64);
			Insert("2025-PA", "Panama", "Panama", "Panama", "Panama", "Panamá", 28, 41);
			Insert("2025-PE", "Peru", "Peru", "Pérou", "Peru", "Perú", 23, 34);
			Insert("2025-PG", "Papua-Neuguinea", "Papua New Guinea", "Papouasie Nouvelle Guinée", "Pápua Új-Guinea", "Papúa Nueva Guinea", 40, 59);
			Insert("2025-PH", "Philippinen", "Philippines", "Philippines", "Fülöp-szigetek", "Filipinas", 28, 41);
			Insert("2025-PK", "Pakistan (im Übrigen)", "Pakistan (remaining)", "Pakistan (restant)", "Pakisztán (fennmaradó)", "Pakistán (restante)", 23, 24);
			Insert("2025-PK-ISLAMABAD", "Pakistan (Islamabad)", "Pakistan (Islamabad)", "Pakistan (Islamabad)", "Pakisztán (Islamabad)", "Pakistán (Islamabad)", 16, 23);
			Insert("2025-PL", "Polen (im Übrigen)", "Poland (remaining)", "Pologne (restant)", "Lengyelország (fennmaradó)", "Polonia (restante)", 23, 34);
			Insert("2025-PL-GDANSK", "Polen (Danzig)", "Poland (Gdansk)", "Pologne (Gdansk)", "Lengyelország (Gdansk)", "Polonia (Gdansk)", 20, 30);
			Insert("2025-PL-KRAKOW", "Polen (Krakau)", "Poland (Krakow)", "Pologne (Cracovie)", "Lengyelország (Krakkó)", "Polonia (Cracovia)", 18, 27);
			Insert("2025-PL-WARSAW", "Polen (Warschau)", "Poland (Warsaw)", "Pologne", "Lengyelországban (Varsó)", "Polonia (Varsovia)", 27, 40);
			Insert("2025-PL-WROCLAW", "Polen (Breslau)", "Poland (Wroclaw)", "Pologne (Wroclaw)", "Lengyelország (Wroclaw)", "Polonia (Wroclaw)", 23, 34);
			Insert("2025-PT", "Portugal", "Portugal", "Portugal", "Portugália", "Portugal", 21, 32);
			Insert("2025-PW", "Palau", "Palau", "Palau", "Palau", "Palaos", 34, 51);
			Insert("2025-PY", "Paraguay", "Paraguay", "Paraguay", "Paraguay", "Paraguay", 26, 39);
			Insert("2025-QA", "Katar", "Qatar", "Qatarien", "Katar", "Katar", 37, 56);
			Insert("2025-RO", "Rumänien (im Übrigen)", "Romania (remaining)", "Roumanie (restant)", "Románia (fennmaradó)", "Rumania (restante)", 18, 27);
			Insert("2025-RO-BUCHAREST", "Rumänien (Bukarest)", "Romania (Bucharest)", "Roumanie (Bucarest)", "Románia (Bukarest)", "Rumania (Bucarest)", 21, 32);
			Insert("2025-RS", "Serbien", "Serbia", "Serbie", "Szerbia", "Serbia", 18, 27);
			Insert("2025-RU", "Russland (im Übrigen)", "Russia (remaining)", "Russie (restant)", "Oroszország (fennmaradó)", "Rusia (restante)", 16, 24);
			Insert("2025-RU-MOSCOW", "Russland (Moskau)", "Russia (Moscow)", "Russie (Moscou)", "Oroszország (Moszkva)", "Rusia, Moscú)", 20, 30);
			Insert("2025-RU-SAINTPETERSBURG", "Russland (St. Petersburg)", "Russia (St. Petersburg)", "Russie (Saint-Pétersbourg)", "Oroszország (Szentpétervár)", "Rusia (San Petersburgo)", 19, 28);
			Insert("2025-RU-YEKATERINBURG", "Russland (Jekatarinburg)", "Russia (Jekatarinburg)", "Russie (Jekatarinburg)", "Oroszország (Jekatarinburg)", "Rusia (Ekaterimburgo)", 19, 28);
			Insert("2025-RW", "Ruanda", "Rwanda", "Rwanda", "Rwanda", "Ruanda", 29, 44);
			Insert("2025-SA", "Saudi-Arabien (im Übrigen)", "Saudi Arabia (remaining)", "Arabie saoudite (restant)", "Szaúd-Arábia (fennmaradó)", "Arabia Saudita (restante)", 37, 56);
			Insert("2025-SA-JEDDAH", "Saudi-Arabien (Djidda)", "Saudi Arabia (Jeddah)", "Arabie Saoudite (Jeddah)", "Szaúd-Arábia (Jeddah)", "Arabia Saudita (Jeddah)", 38, 57);
			Insert("2025-SA-RIYADH", "Saudi-Arabien (Riad)", "Saudi Arabia (Riyadh)", "Arabie saoudite (Riyad)", "Szaúd-Arábia (Rijád)", "Arabia Saudita (Riad)", 37, 56);
			Insert("2025-SD", "Sudan", "Sudan", "Soudan", "Szudán", "Sudán", 22, 33);
			Insert("2025-SE", "Schweden", "Sweden", "Sweden", "Svédország", "Suecia", 44, 66);
			Insert("2025-SG", "Singapur", "Singapore", "Singapour", "Singapore", "Singapur", 36, 54);
			Insert("2025-SI", "Slowenien", "Slovenia", "Slovénie", "Szlovénia", "Eslovenia", 25, 38);
			Insert("2025-SK", "Slowakische Republik", "Slovak Republic", "République slovaque", "Szlovák Köztársaság", "República Eslovaca", 22, 33);
			Insert("2025-SL", "Sierra Leone", "Sierra Leone", "Sierra Leone", "Sierra Leone", "Sierra Leona", 38, 57);
			Insert("2025-SM", "San Marino", "San Marino", "Saint-Marin", "San Marino", "San Marino", 23, 34);
			Insert("2025-SN", "Senegal", "Senegal", "Sénégal", "Szenegál", "Senegal", 28, 42);
			Insert("2025-SR", "Suriname", "Suriname", "Suriname", "Suriname", "Surinam", 30, 45);
			Insert("2025-SS", "Südsudan", "South Sudan", "Soudan du Sud", "Dél-Szudán", "Sudán del Sur", 34, 51);
			Insert("2025-ST", "São Tomé - Príncipe", "Sao Tome - Principe", "Sao Tomé - Principe", "Sao Tome - Principe", "Santo Tomé y Príncipe", 32, 47);
			Insert("2025-SV", "El Salvador", "El Salvador", "El Salvador", "El Salvador", "El Salvador", 44, 65);
			Insert("2025-SY", "Syrien", "Syria", "Syrie", "Szíria", "Siria", 25, 38);
			Insert("2025-TD", "Tschad", "Chad", "Tchad", "Murva", "Chad", 28, 42);
			Insert("2025-TG", "Togo", "Togo", "Togo", "Togo", "Ir", 26, 39);
			Insert("2025-TH", "Thailand", "Thailand", "Thaïlande", "Thaiföld", "Tailandia", 24, 36);
			Insert("2025-TJ", "Tadschikistan", "Tajikistan", "Tajikistan", "Tádzsikisztán", "Tayikistán", 18, 27);
			Insert("2025-TM", "Turkmenistan", "Turkmenistan", "Turkmenistan", "Turkmenistan", "Turkmenistán", 19, 28);
			Insert("2025-TN", "Tunesien", "Tunisia", "Tunisia", "Tunézia", "Túnez", 27, 40);
			Insert("2025-TO", "Tonga", "Tonga", "Tonga", "Tonga", "Tonga", 20, 29);
			Insert("2025-TR", "Türkei (im Übrigen)", "Turkey (remaining)", "Turquie (restant)", "Törökország (fennmaradó)", "Turquía (restante)", 16, 24);
			Insert("2025-TR-ANKARA", "Türkei (Ankara)", "Turkey (Ankara)", "Turquie (Ankara)", "Törökország (Ankara)", "Turquía (Ankara)", 21, 32);
			Insert("2025-TR-ISTANBUL", "Türkei (Istanbul)", "Turkey (Istanbul)", "Turquie (Istanbul)", "Törökország (Isztambul)", "Turquía (Estambul)", 17, 26);
			Insert("2025-TR-IZMIR", "Türkei (Izmir)", "Turkey (Izmir)", "Turquie (Izmir)", "Törökország (Izmir)", "Turquía (Esmirna)", 29, 44);
			Insert("2025-TT", "Trinidad und Tobago", "Trinidad and Tobago", "Trinité et Tobago", "Trinidad és Tobago", "Trinidad y Tobago", 44, 66);
			Insert("2025-TW", "Taiwan", "Taiwan", "Taiwan", "Taiwan", "Taiwán", 31, 46);
			Insert("2025-TZ", "Tansania", "Tanzania", "Tanzanie", "Tanzania", "Tanzania", 29, 44);
			Insert("2025-UA", "Ukraine", "Ukraine", "Ukraine", "Ukrajna", "Ucrania", 17, 26);
			Insert("2025-UG", "Uganda", "Uganda", "Ouganda", "Uganda", "Uganda", 28, 41);
			Insert("2025-US", "USA (im Übrigen)", "USA (remaining)", "USA (restant)", "USA (fennmaradó)", "Estados Unidos (restante)", 40, 59);
			Insert("2025-US-ATLANTA", "USA (Atlanta)", "USA (Atlanta)", "USA (Atlanta)", "USA (Atlanta)", "Estados Unidos (Atlanta)", 52, 77);
			Insert("2025-US-BOSTON", "USA (Boston)", "USA (Boston)", "USA (Boston)", "USA (Boston)", "Estados Unidos (Bostón)", 42, 63);
			Insert("2025-US-CHICAGO", "USA (Chicago)", "USA (Chicago)", "USA (Chicago)", "USA (Chicago)", "Estados Unidos (Chicago)", 44, 65);
			Insert("2025-US-HOUSTON", "USA (Houston)", "USA (Houston)", "USA (Houston)", "USA (Houston)", "Estados Unidos (Houston)", 41, 62);
			Insert("2025-US-LOSANGELES", "USA (Los Angeles)", "USA (Los Angeles)", "USA (Los Angeles)", "USA (Los Angeles)", "Estados Unidos (Los Ángeles)", 43, 64);
			Insert("2025-US-MIAMI", "USA (Miami)", "USA (Miami)", "USA (Miami)", "USA (Miami)", "Estados Unidos (Miami)", 44, 65);
			Insert("2025-US-NEWYORKCITY", "USA (New York City)", "USA (New York City)", "Etats-Unis (New York City)", "USA (New York City)", "Estados Unidos (Nueva York)", 44, 66);
			Insert("2025-US-SANFRANCISCO", "USA (San Francisco)", "USA (San Francisco)", "États-Unis (San Francisco)", "USA (San Francisco)", "Estados Unidos (San Francisco)", 40, 59);
			Insert("2025-UY", "Uruguay", "Uruguay", "Uruguay", "Uruguay", "Uruguay", 27, 40);
			Insert("2025-UZ", "Usbekistan", "Uzbekistan", "Uzbekistan", "Üzbegisztán", "Uzbekistán", 23, 34);
			Insert("2025-VA", "Vatikanstadt", "Vatican city", "Cité du vatican", "Vatikán város", "Ciudad del Vaticano", 32, 48);
			Insert("2025-VC", "St. Vincent und die Grenadinen", "St. Vincent and the Grenadines", "Saint Vincent et les Grenadines", "Szent Vincent és a Grenadine-szigetek", "San Vicente y las Granadinas", 30, 45);
			Insert("2025-VE", "Venezuela", "Venezuela", "Venezuela", "Venezuela", "Venezuela", 30, 45);
			Insert("2025-VN", "Vietnam", "Vietnam", "Viêt-Nam", "Vietnam", "Vietnam", 24, 36);
			Insert("2025-WS", "Samoa", "Samoa", "Samoa", "Szamoa", "Samoa", 26, 39);
			Insert("2025-XK", "Kosovo", "Kosovo", "Kosovo", "Koszovó", "Kosovo", 16, 24);
			Insert("2025-YE", "Jemen", "Yemen", "Yémen", "Jemen", "Yemen", 16, 24);
			Insert("2025-ZA", "Südafrika (im Übrigen)", "South Africa (remaining)", "Afrique du Sud (restant)", "Dél-Afrika (fennmaradó)", "Sudáfrica (restante)", 20, 29);
			Insert("2025-ZA-CAPETOWN", "Südafrika (Kapstadt)", "South Africa (Cape Town)", "Afrique du Sud (Cape Town)", "Dél-Afrika (Fokváros)", "Sudáfrica (Ciudad del Cabo)", 22, 33);
			Insert("2025-ZA-JOHANNESBURG", "Südafrika (Johannesburg)", "South Africa (Johannesburg)", "Afrique du Sud (Johannesburg)", "Dél-Afrika (Johannesburg)", "Sudáfrica (Johannesburgo)", 24, 36);
			Insert("2025-ZM", "Sambia", "Zambia", "Zambie", "Zambia", "Zambia", 25, 38);
			Insert("2025-ZW", "Simbabwe", "Zimbabwe", "Zimbabwe", "Zimbabwe", "Zimbabue", 30, 45);
			var helper = new UnicoreMigrationHelper(Database);
			helper.AddOrUpdateEntityAuthDataColumn<PerDiemAllowance>("LU", "PerDiemAllowance");
		}

		private void Insert(string value, string nameDe, string nameEn, string nameFr, string nameHu, string nameEs, decimal partialDayAmount, decimal allDayAmount, bool favorite = false, int sortOrder = 1000)
		{
			var year = value.Split('-')[0];
			if ((int)Database.ExecuteScalar($"SELECT COUNT(*) FROM [LU].[PerDiemAllowance] WHERE Value = '{value}' and Language = 'de'") == 0)
			{
				Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameDe}', 'de', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			}

			if ((int)Database.ExecuteScalar($"SELECT COUNT(*) FROM [LU].[PerDiemAllowance] WHERE Value = '{value}' and Language = 'en'") == 0)
			{
				Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameEn}', 'en', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			}

			if ((int)Database.ExecuteScalar($"SELECT COUNT(*) FROM [LU].[PerDiemAllowance] WHERE Value = '{value}' and Language = 'fr'") == 0)
			{
				Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameFr}', 'fr', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			}

			if ((int)Database.ExecuteScalar($"SELECT COUNT(*) FROM [LU].[PerDiemAllowance] WHERE Value = '{value}' and Language = 'hu'") == 0)
			{
				Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameHu}', 'hu', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			}

			if ((int)Database.ExecuteScalar($"SELECT COUNT(*) FROM [LU].[PerDiemAllowance] WHERE Value = '{value}' and Language = 'es'") == 0)
			{
				Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameEs}', 'es', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			}
		}
	}
}
