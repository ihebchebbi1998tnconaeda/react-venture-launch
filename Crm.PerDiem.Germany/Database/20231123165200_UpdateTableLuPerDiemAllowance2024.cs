namespace Crm.PerDiem.Germany.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	using Crm.Library.Data.MigratorDotNet.Migrator.Helper;
	using Crm.PerDiem.Germany.Model.Lookups;

	[Migration(20231123165200)]
	public class UpdateTableLuPerDiemAllowance2024 : Migration
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

			Insert("2024-DE", "Deutschland", "Germany", "Allemagne", "Németország", "Alemania", 14, 28, true);
			Insert("2024-AT", "Österreich ", "Austria", "Autriche", "Ausztria", "Austria", 33, 50, sortOrder: 1);
			Insert("2024-CH-GENEVA", "Schweiz (Genf)", "Switzerland (Geneva)", "Suisse (Genève)", "Svájc (Genf)", "Suiza (Ginebra)", 44, 66, sortOrder: 2);
			Insert("2024-CH", "Schweiz (im Übrigen)", "Switzerland (remaining)", "Suisse (restant)", "Svájc (fennmaradó)", "Suiza (restante)", 43, 64, sortOrder: 3);
			Insert("2024-AD", "Andorra", "Andorra", "Andorre", "Andorra", "Andorra", 28, 41);
			Insert("2024-AE", "Vereinigte Arabische Emirate", "United Arab Emirates", "Emirats Arabes Unis", "Egyesült Arab Emírségek", "Emiratos Árabes Unidos", 44, 65);
			Insert("2024-AF", "Afghanistan", "Afghanistan", "Afghanistan", "Afganisztán", "Afganistán", 20, 30);
			Insert("2024-AG", "Antigua und Barbuda", "Antigua and Barbuda", "Antigua et Barbuda", "Antigua és Barbuda", "Antigua y Barbuda", 30, 45);
			Insert("2024-AL", "Albanien", "Albania", "Albanie", "Albánia", "Albania", 18, 27);
			Insert("2024-AM", "Armenien", "Armenia", "Arménie", "Örményország", "Armenia", 16, 24);
			Insert("2024-AO", "Angola", "Angola", "Angola", "Angola", "Angola", 35, 52);
			Insert("2024-AR", "Argentinien", "Argentina", "Argentine", "Argentína", "Argentina", 24, 35);
			Insert("2024-AU", "Australien (im Übrigen)", "Australia (remaining)", "Australie (restant)", "Ausztrália (fennmaradó)", "Australia (restante)", 38, 57);
			Insert("2024-AU-CANBERRA", "Australien (Canberra)", "Australia (Canberra)", "Australie (Canberra)", "Ausztrália (Canberra)", "Australia (Canberra)", 49, 74);
			Insert("2024-AU-SYDNEY", "Australien (Sydney)", "Australia (Sydney)", "Australie", "Ausztrália (Sydney)", "Australia (Sídney)", 38, 57);
			Insert("2024-AZ", "Aserbaidschan", "Azerbaijan", "Azerbaïdjan", "Azerbajdzsán", "Azerbaiyán", 29, 44);
			Insert("2024-BA", "Bosnien und Herzegowina", "Bosnia and Herzegovina", "Bosnie et Herzégovine", "Bosznia és Hercegovina", "Bosnia y Herzegovina", 16, 23);
			Insert("2024-BB", "Barbados", "Barbados", "Barbade", "Barbados", "Barbados", 36, 54);
			Insert("2024-BD", "Bangladesch", "Bangladesh", "Bangladesh", "Bangladesben", "Bangladesh", 33, 50);
			Insert("2024-BE", "Belgien", "Belgium", "Belgique", "Belgium", "Bélgica", 40, 59);
			Insert("2024-BF", "Burkina Faso", "Burkina Faso", "Burkina Faso", "Burkina Faso", "Burkina Faso", 25, 38);
			Insert("2024-BG", "Bulgarien", "Bulgaria", "Bulgarie", "Bulgária", "Bulgaria", 15, 22);
			Insert("2024-BH", "Bahrain", "Bahrain", "Bahrain", "Bahrain", "Bahréin", 32, 48);
			Insert("2024-BI", "Burundi", "Burundi", "Burundi", "Burundi", "Burundi", 24, 36);
			Insert("2024-BJ", "Benin", "Benin", "Bénin", "Benin", "Benín", 35, 52);
			Insert("2024-BN", "Brunei", "Brunei", "Brunei", "Brunei", "Brunéi", 35, 52);
			Insert("2024-BO", "Bolivien", "Bolivia", "Bolivie", "Bolívia", "bolivia", 31, 46);
			Insert("2024-BR", "Brasilien (im Übrigen)", "Brazil (remaining)", "Brésil (restant)", "Brazília (fennmaradó)", "Brasil (restante)", 31, 46);
			Insert("2024-BR-BRASILIA", "Brasilien (Brasilia)", "Brazil (Brasilia)", "Brésil (Brasilia)", "Brazília (Brazília)", "Brasil", 34, 51);
			Insert("2024-BR-RIODEJANEIRO", "Brasilien (Rio de Janeiro)", "Brazil (Rio de Janeiro)", "Brésil (Rio de Janeiro)", "Brazília (Rio de Janeiro)", "Brasil (Río de Janeiro)", 46, 69);
			Insert("2024-BR-SAOPAULO", "Brasilien (Sao Paulo)", "Brazil (Sao Paulo)", "Brésil (Sao Paulo)", "Brazília (Sao Paulo)", "Brasil (São Paulo)", 31, 46);
			Insert("2024-BW", "Botsuana", "Botswana", "Botswana", "Botswana", "Botsuana", 31, 46);
			Insert("2024-BY", "Weißrussland", "Belarus", "Belarus", "Belarus", "Bielorrusia", 13, 20);
			Insert("2024-CA", "Kanada (im Übrigen)", "Canada (remaining)", "Canada (restant)", "Kanada (fennmaradó)", "Canadá (restante)", 36, 54);
			Insert("2024-CA-OTTAWA", "Kanada (Ottawa)", "Canada (Ottawa)", "Canada (Ottawa)", "Kanada (Ottawa)", "Canadá (Ottawa)", 41, 62);
			Insert("2024-CA-TORONTO", "Kanada (Toronto)", "Canada (Toronto)", "Canada (Toronto)", "Kanada (Toronto)", "Canadá (Toronto)", 36, 54);
			Insert("2024-CA-VANCOUVER", "Kanada (Vancouver)", "Canada (Vancouver)", "Canada (Vancouver)", "Kanada (Vancouver)", "Canadá (Vancouver)", 42, 63);
			Insert("2024-CF", "Zentralafrikanische Republik", "Central African Republic", "République centrafricaine", "Közép-afrikai Köztársaság", "República Centroafricana", 36, 53);
			Insert("2024-CI", "Republik Côte d''Ivoire", "Republic of Côte d''Ivoire", "République de Côte d''Ivoire", "Elefántcsontparti Köztársaság", "República de Costa de Marfil", 34, 51);
			Insert("2024-CL", "Chile", "Chile", "Chili", "Chile", "Chile", 29, 44);
			Insert("2024-CM", "Kamerun", "Cameroon", "Cameroun", "Kamerun", "Camerún", 37, 56);
			Insert("2024-CN", "China (im Übrigen)", "China (remaining)", "Chine (restant)", "Kína (fennmaradó)", "China (restante)", 32, 48);
			Insert("2024-CN-BEIJING", "China (Peking)", "China (Beijing)", "Chine (Beijing)", "Kína (Peking)", "China (Pekín)", 20, 30);
			Insert("2024-CN-CHENGDU", "China (Chengdu)", "China (Chengdu)", "Chine (Chengdu)", "Kína (Chengdu)", "China (Chengdú)", 28, 41);
			Insert("2024-CN-GUANGZHOU", "China (Kanton)", "China (Canton)", "Chine (Canton)", "Kína (Canton)", "China (Cantón)", 24, 36);
			Insert("2024-CN-HONGKONG", "China (Hongkong)", "China (Hong Kong)", "Chine (Hong Kong)", "Kína (Hong Kong)", "China (Hong Kong)", 48, 71);
			Insert("2024-CN-SHANGHAI", "China (Shanghai)", "China (Shanghai)", "Chine (Shanghai)", "Kína (Sanghaj)", "China (Shanghái)", 39, 58);
			Insert("2024-CO", "Kolumbien", "Colombia", "Colombie", "Colombia", "Colombia", 31, 46);
			Insert("2024-CR", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", 32, 47);
			Insert("2024-CU", "Kuba", "Cuba", "Cuba", "Kuba", "Cuba", 34, 51);
			Insert("2024-CV", "Kap Verde", "Cape Verde", "Cap Vert", "Zöld-foki Köztársaság", "Cabo Verde", 25, 38);
			Insert("2024-CY", "Zypern", "Cyprus", "Chypre", "Ciprus", "Chipre", 28, 42);
			Insert("2024-CZ", "Tschechische Republik", "Czech Republic", "République Tchèque", "Cseh Köztársaság", "República Checa", 21, 32);
			Insert("2024-DJ", "Dschibuti", "Djibouti", "Djibouti", "Djibouti", "Yibuti", 52, 77);
			Insert("2024-DK", "Dänemark", "Denmark", "Danemark", "Dánia", "Dinamarca", 50, 75);
			Insert("2024-DM", "Dominica", "Dominica", "Dominica", "Dominika", "república dominicana", 30, 45);
			Insert("2024-DO", "Dominikanische Republik", "Dominican Republic", "République Dominicaine", "Dominikai Köztársaság", "República Dominicana", 33, 50);
			Insert("2024-DZ", "Algerien", "Algeria", "Algérie", "Algéria", "Argelia", 32, 47);
			Insert("2024-EC", "Ecuador", "Ecuador", "Equateur", "Ecuador", "Ecuador", 18, 27);
			Insert("2024-EE", "Estland", "Estonia", "Estonie", "Észtország", "Estonia", 20, 29);
			Insert("2024-EG", "Ägypten", "Egypt", "Egypte", "Egyiptom", "Egipto", 33, 50);
			Insert("2024-ER", "Eritrea", "Eritrea", "Érythrée", "Eritrea", "Eritrea", 33, 50);
			Insert("2024-ES", "Spanien (im Übrigen)", "Spain (remaining)", "Espagne (restant)", "Spanyolország (fennmaradó)", "España (restante)", 23, 34);
			Insert("2024-ES-BARCELONA", "Spanien (Barcelona)", "Spain (Barcelona)", "Espagne (Barcelone)", "Spanyolország (Barcelona)", "España (Barcelona)", 23, 34);
			Insert("2024-ES-CANARYISLANDS", "Spanien (Kanarische Inseln)", "Spain (Canary Islands)", "Espagne (îles Canaries)", "Spanyolország (Kanári-szigetek)", "España (Islas Canarias)", 24, 36);
			Insert("2024-ES-MADRID", "Spanien (Madrid)", "Spain (Madrid)", "Espagne (Madrid)", "Spanyolország (Madrid)", "España (Madrid)", 28, 42);
			Insert("2024-ES-PALMADEMALLORCA", "Spanien (Palma de Mallorca)", "Spain (Palma de Mallorca)", "Espagne (Palma de Majorque)", "Spanyolország (Palma de Mallorca)", "España (Palma de Mallorca)", 29, 44);
			Insert("2024-ET", "Äthiopien", "Ethiopia", "Ethiopie", "Etiópia", "Etiopía", 26, 39);
			Insert("2024-FI", "Finnland", "Finland", "Finlande", "Finnország", "Finlandia", 36, 54);
			Insert("2024-FJ", "Fidschi", "Fiji", "Fidji", "Fidzsi-szigetek", "Fiyi", 21, 32);
			Insert("2024-FM", "Mikronesien", "Micronesia", "Micronésie", "Mikronézia", "Micronesia", 22, 33);
			Insert("2024-FR", "Frankreich (im Übrigen)", "France (remaining)", "France (restant)", "Franciaország (fennmaradó)", "Francia (restante)", 36, 53);
			Insert("2024-FR-LYON", "Frankreich (Lyon)", "France (Lyon)", "France", "Franciaországban (Lyon)", "Francia (Lyón)", 36, 53);
			Insert("2024-FR-MARSEILLE", "Frankreich (Marseille)", "France (Marseilles)", "France (Marseille)", "Franciaország (Marseille)", "Francia (Marsella)", 31, 46);
			Insert("2024-FR-PARIS", "Frankreich (Paris)", "France (Paris)", "France (Paris)", "Franciaország (Párizs)", "Francia (París)", 39, 58);
			Insert("2024-FR-STRASBOURG", "Frankreich (Straßburg)", "France (Strasbourg)", "France (Strasbourg)", "Franciaország (Strasbourg)", "Francia (Estrasburgo)", 34, 51);
			Insert("2024-GA", "Gabun", "Gabon", "Gabon", "Gabon", "Gabón", 35, 52);
			Insert("2024-GB", "Großbrit. u. Nordirland (im Übrigen)", "Great Britain and Northern Ireland (remaining)", "Grande-Bretagne et Irlande du Nord (restant)", "Nagy-Britannia és Észak-Írország (fennmaradó)", "Gran Bretaña e Irlanda del Norte (restantes)", 35, 52);
			Insert("2024-GB-LONDON", "Großbrit. u. Nordirland  (London)", "Great Britain and Northern Ireland (London)", "Grande-Bretagne et Irlande du Nord (Londres)", "Nagy-Britannia és Észak-Írország (London)", "Gran Bretaña e Irlanda del Norte (Londres)", 44, 66);
			Insert("2024-GD", "Grenada", "Grenada", "Grenada", "Grenada", "Granada", 30, 45);
			Insert("2024-GE", "Georgien", "Georgia", "Géorgie", "Grúzia", "Georgia", 30, 45);
			Insert("2024-GH", "Ghana", "Ghana", "Ghana", "Ghána", "Ghana", 31, 46);
			Insert("2024-GM", "Gambia", "Gambia", "Gambie", "Gambia", "Gambia", 27, 40);
			Insert("2024-GN", "Guinea", "Guinea", "Guinée", "Guinea", "Guinea", 40, 59);
			Insert("2024-GQ", "Äquatorialguinea", "Equatorial Guinea", "Guinée équatoriale", "Egyenlítoi-Guinea", "Guinea Ecuatorial", 28, 42);
			Insert("2024-GR", "Griechenland (im Übrigen)", "Greece (remaining)", "Grèce (restant)", "Görögország (fennmaradó)", "Grecia (restante)", 24, 36);
			Insert("2024-GR-ATHENS", "Griechenland (Athen)", "Greece (Athens)", "Grèce (Athènes)", "Görögország (Athén)", "Grecia (Atenas)", 27, 40);
			Insert("2024-GT", "Guatemala", "Guatemala", "Guatemala", "Guatemala", "Guatemala", 23, 34);
			Insert("2024-GW", "Guinea-Bissau", "Guinea-Bissau", "Guinée-Bissau", "Bissau-Guinea", "Guinea-Bisáu", 21, 32);
			Insert("2024-GY", "Guyana", "Guyana", "Guyane", "Guyana", "Guayana", 30, 45);
			Insert("2024-HN", "Honduras", "Honduras", "Honduras", "Honduras", "Honduras", 38, 57);
			Insert("2024-HR", "Kroatien", "Croatia", "Croatie", "Horvátország", "Croacia", 24, 35);
			Insert("2024-HT", "Haiti", "Haiti", "Haïti", "Haiti", "Haití", 39, 58);
			Insert("2024-HU", "Ungarn", "Hungary", "Hongrie", "Magyarország", "Hungría", 21, 32);
			Insert("2024-ID", "Indonesien", "Indonesia", "Indonésie", "Indonézia", "Indonesia", 25, 38);
			Insert("2024-IE", "Irland", "Ireland", "Irlande", "Írország", "Irlanda", 39, 58);
			Insert("2024-IL", "Israel", "Israel", "Israël", "Izrael", "Israel", 44, 66);
			Insert("2024-IN", "Indien (im Übrigen)", "India (remaining)", "Inde (restant)", "India (fennmaradó)", "India (restante)", 21, 32);
			Insert("2024-IN-CHENNAI", "Indien (Chennai)", "India (Chennai)", "Inde (Chennai)", "India (Chennai)", "India (Chennai)", 21, 32);
			Insert("2024-IN-KOLKATA", "Indien (Kalkutta)", "India (Calcutta)", "Inde (Calcutta)", "India (Kalkutta)", "India (Calcuta)", 24, 35);
			Insert("2024-IN-MUMBAI", "Indien (Mumbai)", "India (Mumbai)", "Inde (Mumbai)", "India (Mumbai)", "India (Bombay)", 33, 50);
			Insert("2024-IN-NEWDELHI", "Indien (Neu Delhi)", "India (New Delhi)", "Inde (New Delhi)", "India (Újdelhi)", "India (Nueva Delhi)", 25, 38);
			Insert("2024-IR", "Iran", "Iran", "Iran", "Irán", "Irán", 22, 33);
			Insert("2024-IS", "Island", "Iceland", "Islande", "Izland", "Islandia", 41, 62);
			Insert("2024-IT", "Italien (im Übrigen)", "Italy (remaining)", "Italie (restant)", "Olaszország (fennmaradó)", "Italia (restante)", 28, 42);
			Insert("2024-IT-MILAN", "Italien (Mailand)", "Italy (Milan)", "Italie (Milan)", "Olaszország (Milánó)", "Italia (Milán)", 28, 42);
			Insert("2024-IT-ROME", "Italien (Rom)", "Italy (Rome)", "Italie (Rome)", "Olaszország (Róma)", "Italia (Roma)", 32, 48);
			Insert("2024-JM", "Jamaika", "Jamaica", "Jamaïque", "Jamaica", "Jamaica", 38, 57);
			Insert("2024-JO", "Jordanien", "Jordan", "Jordanie", "Jordánia", "Jordán", 38, 57);
			Insert("2024-JP", "Japan (im Übrigen)", "Japan (remaining)", "Japon (restant)", "Japán (fennmaradó)", "Japón (restante)", 35, 52);
			Insert("2024-JP-TOKYO", "Japan (Tokio)", "Japan (Tokyo)", "Japon (Tokyo)", "Japán (Tokió)", "Japón (Tokio)", 33, 50);
			Insert("2024-KE", "Kenia", "Kenya", "Kenya", "Kenya", "Kenia", 34, 51);
			Insert("2024-KG", "Kirgisistan", "Kyrgyzstan", "Kyrgyzstan", "Kirgizisztán", "Kirguistán", 18, 27);
			Insert("2024-KH", "Kambodscha", "Cambodia", "Cambodge", "Kambodzsa", "Camboya", 25, 38);
			Insert("2024-KN", "St. Kitts und Nevis", "St. Kitts and Nevis", "Saint-Kitts-et-Nevis", "St. Kitts és Nevis", "San Cristóbal y Nieves", 30, 45);
			Insert("2024-KW", "Kuwait", "Kuwait", "Koweit", "Kuvait", "Kuwait", 37, 56);
			Insert("2024-KZ", "Kasachstan", "Kazakhstan", "kazakhstan", "Kazahsztán", "Kazajstán", 30, 45);
			Insert("2024-LA", "Laos", "Laos", "Laos", "Laosz", "Laos", 24, 35);
			Insert("2024-LB", "Libanon", "Lebanon", "Liban", "Libanon", "Líbano", 46, 69);
			Insert("2024-LC", "St. Lucia", "St. Lucia", "Sainte Lucie", "St. Lucia", "Santa Lucía", 30, 45);
			Insert("2024-LI", "Liechtenstein", "Liechtenstein", "Liechtenstein", "Liechtenstein", "Liechtenstein", 37, 56);
			Insert("2024-LK", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Srí Lanka", "Sri Lanka", 24, 36);
			Insert("2024-LS", "Lesotho", "Lesotho", "Lesotho", "Lesotho", "Lesoto", 19, 28);
			Insert("2024-LT", "Litauen", "Lithuania", "Lituanie", "Litvánia", "Lituania", 17, 26);
			Insert("2024-LU", "Luxemburg", "Luxembourg", "Luxembourg", "Luxemburg", "Luxemburgo", 42, 63);
			Insert("2024-LV", "Lettland", "Latvia", "Lettonie", "Lettország", "Letonia", 24, 35);
			Insert("2024-LY", "Libyen", "Libya", "Libye", "Líbia", "Libia", 42, 63);
			Insert("2024-MA", "Marokko", "Morocco", "Maroc", "Marokkó", "Marruecos", 28, 41);
			Insert("2024-MC", "Monaco", "Monaco", "Monaco", "Monaco", "Mónaco", 35, 52);
			Insert("2024-ME", "Montenegro", "Montenegro", "Monténégro", "Montenegró", "Montenegro", 21, 32);
			Insert("2024-MG", "Madagaskar", "Madagascar", "Madagascar", "Madagaszkár", "Madagascar", 22, 33);
			Insert("2024-MH", "Marshall Inseln", "Marshall Islands", "Iles Marshall", "Marshall-szigetek", "Islas Marshall", 42, 63);
			Insert("2024-MK", "Nordmazedonien", "North Macedonia", "Macédoine du Nord", "Észak-Macedónia", "Macedonia del Norte", 18, 27);
			Insert("2024-ML", "Mali", "Mali", "Mali", "Mali", "Malí", 25, 38);
			Insert("2024-MM", "Myanmar", "Myanmar", "Myanmar", "Myanmar", "Birmania", 24, 35);
			Insert("2024-MN", "Mongolei", "Mongolia", "Mongolie", "Mongólia", "Mongolia", 16, 23);
			Insert("2024-MR", "Mauretanien", "Mauritania", "Mauritanie", "Mauritánia", "Mauritania", 24, 35);
			Insert("2024-MT", "Malta", "Malta", "Malte", "Málta", "Malta", 31, 46);
			Insert("2024-MU", "Mauritius", "Mauritius", "Ile Maurice", "Mauritius", "Mauricio", 29, 44);
			Insert("2024-MV", "Malediven", "Maldives", "Maldives", "Maldív", "Maldivas", 35, 52);
			Insert("2024-MW", "Malawi", "Malawi", "Malawi", "Malawi", "Malaui", 28, 41);
			Insert("2024-MX", "Mexiko", "Mexico", "Mexique", "Mexikó", "México", 32, 48);
			Insert("2024-MY", "Malaysia", "Malaysia", "Malaisie", "Malaysia", "Malasia", 24, 36);
			Insert("2024-MZ", "Mosambik", "Mozambique", "Mozambique", "Mozambik", "Mozambique", 34, 51);
			Insert("2024-NA", "Namibia", "Namibia", "Namibie", "Namíbia", "Namibia", 20, 30);
			Insert("2024-NE", "Niger", "Niger", "Niger", "Niger", "Níger", 28, 42);
			Insert("2024-NG", "Nigeria", "Nigeria", "Nigeria", "Nigéria", "Nigeria", 31, 46);
			Insert("2024-NI", "Nicaragua", "Nicaragua", "Nicaragua", "Nicaragua", "Nicaragua", 31, 46);
			Insert("2024-NL", "Niederlande", "Netherlands", "Pays-Bas", "Hollandia", "Países Bajos", 32, 47);
			Insert("2024-NO", "Norwegen", "Norway", "Norvège", "Norvégia", "Noruega", 50, 75);
			Insert("2024-NP", "Nepal", "Nepal", "Népal", "Nepál", "Nepal", 24, 36);
			Insert("2024-NZ", "Neuseeland", "New Zealand", "Nouvelle zélande", "Új-Zéland", "Nueva Zelanda", 39, 58);
			Insert("2024-OM", "Oman", "Oman", "Oman", "Omán", "Omán", 43, 64);
			Insert("2024-PA", "Panama", "Panama", "Panama", "Panama", "Panamá", 28, 41);
			Insert("2024-PE", "Peru", "Peru", "Pérou", "Peru", "Perú", 23, 34);
			Insert("2024-PG", "Papua-Neuguinea", "Papua New Guinea", "Papouasie Nouvelle Guinée", "Pápua Új-Guinea", "Papúa Nueva Guinea", 40, 59);
			Insert("2024-PH", "Philippinen", "Philippines", "Philippines", "Fülöp-szigetek", "Filipinas", 28, 41);
			Insert("2024-PK", "Pakistan (im Übrigen)", "Pakistan (remaining)", "Pakistan (restant)", "Pakisztán (fennmaradó)", "Pakistán (restante)", 23, 24);
			Insert("2024-PK-ISLAMABAD", "Pakistan (Islamabad)", "Pakistan (Islamabad)", "Pakistan (Islamabad)", "Pakisztán (Islamabad)", "Pakistán (Islamabad)", 16, 23);
			Insert("2024-PL", "Polen (im Übrigen)", "Poland (remaining)", "Pologne (restant)", "Lengyelország (fennmaradó)", "Polonia (restante)", 20, 29);
			Insert("2024-PL-GDANSK", "Polen (Danzig)", "Poland (Gdansk)", "Pologne (Gdansk)", "Lengyelország (Gdansk)", "Polonia (Gdansk)", 20, 30);
			Insert("2024-PL-KRAKOW", "Polen (Krakau)", "Poland (Krakow)", "Pologne (Cracovie)", "Lengyelország (Krakkó)", "Polonia (Cracovia)", 18, 27);
			Insert("2024-PL-WARSAW", "Polen (Warschau)", "Poland (Warsaw)", "Pologne", "Lengyelországban (Varsó)", "Polonia (Varsovia)", 20, 29);
			Insert("2024-PL-WROCLAW", "Polen (Breslau)", "Poland (Wroclaw)", "Pologne (Wroclaw)", "Lengyelország (Wroclaw)", "Polonia (Wroclaw)", 22, 33);
			Insert("2024-PT", "Portugal", "Portugal", "Portugal", "Portugália", "Portugal", 21, 32);
			Insert("2024-PW", "Palau", "Palau", "Palau", "Palau", "Palaos", 34, 51);
			Insert("2024-PY", "Paraguay", "Paraguay", "Paraguay", "Paraguay", "Paraguay", 26, 39);
			Insert("2024-QA", "Katar", "Qatar", "Qatarien", "Katar", "Katar", 37, 56);
			Insert("2024-RO", "Rumänien (im Übrigen)", "Romania (remaining)", "Roumanie (restant)", "Románia (fennmaradó)", "Rumania (restante)", 18, 27);
			Insert("2024-RO-BUCHAREST", "Rumänien (Bukarest)", "Romania (Bucharest)", "Roumanie (Bucarest)", "Románia (Bukarest)", "Rumania (Bucarest)", 21, 32);
			Insert("2024-RS", "Serbien", "Serbia", "Serbie", "Szerbia", "Serbia", 18, 27);
			Insert("2024-RU", "Russland (im Übrigen)", "Russia (remaining)", "Russie (restant)", "Oroszország (fennmaradó)", "Rusia (restante)", 16, 24);
			Insert("2024-RU-MOSCOW", "Russland (Moskau)", "Russia (Moscow)", "Russie (Moscou)", "Oroszország (Moszkva)", "Rusia, Moscú)", 20, 30);
			Insert("2024-RU-SAINTPETERSBURG", "Russland (St. Petersburg)", "Russia (St. Petersburg)", "Russie (Saint-Pétersbourg)", "Oroszország (Szentpétervár)", "Rusia (San Petersburgo)", 17, 26);
			Insert("2024-RU-YEKATERINBURG", "Russland (Jekatarinburg)", "Russia (Jekatarinburg)", "Russie (Jekatarinburg)", "Oroszország (Jekatarinburg)", "Rusia (Ekaterimburgo)", 19, 28);
			Insert("2024-RW", "Ruanda", "Rwanda", "Rwanda", "Rwanda", "Ruanda", 29, 44);
			Insert("2024-SA", "Saudi-Arabien (im Übrigen)", "Saudi Arabia (remaining)", "Arabie saoudite (restant)", "Szaúd-Arábia (fennmaradó)", "Arabia Saudita (restante)", 37, 56);
			Insert("2024-SA-JEDDAH", "Saudi-Arabien (Djidda)", "Saudi Arabia (Jeddah)", "Arabie Saoudite (Jeddah)", "Szaúd-Arábia (Jeddah)", "Arabia Saudita (Jeddah)", 38, 57);
			Insert("2024-SA-RIYADH", "Saudi-Arabien (Riad)", "Saudi Arabia (Riyadh)", "Arabie saoudite (Riyad)", "Szaúd-Arábia (Rijád)", "Arabia Saudita (Riad)", 37, 56);
			Insert("2024-SD", "Sudan", "Sudan", "Soudan", "Szudán", "Sudán", 22, 33);
			Insert("2024-SE", "Schweden", "Sweden", "Sweden", "Svédország", "Suecia", 44, 66);
			Insert("2024-SG", "Singapur", "Singapore", "Singapour", "Singapore", "Singapur", 36, 54);
			Insert("2024-SI", "Slowenien", "Slovenia", "Slovénie", "Szlovénia", "Eslovenia", 25, 38);
			Insert("2024-SK", "Slowakische Republik", "Slovak Republic", "République slovaque", "Szlovák Köztársaság", "República Eslovaca", 22, 33);
			Insert("2024-SL", "Sierra Leone", "Sierra Leone", "Sierra Leone", "Sierra Leone", "Sierra Leona", 38, 57);
			Insert("2024-SM", "San Marino", "San Marino", "Saint-Marin", "San Marino", "San Marino", 23, 34);
			Insert("2024-SN", "Senegal", "Senegal", "Sénégal", "Szenegál", "Senegal", 28, 42);
			Insert("2024-SR", "Suriname", "Suriname", "Suriname", "Suriname", "Surinam", 30, 45);
			Insert("2024-SS", "Südsudan", "South Sudan", "Soudan du Sud", "Dél-Szudán", "Sudán del Sur", 34, 51);
			Insert("2024-ST", "São Tomé - Príncipe", "Sao Tome - Principe", "Sao Tomé - Principe", "Sao Tome - Principe", "Santo Tomé y Príncipe", 32, 47);
			Insert("2024-SV", "El Salvador", "El Salvador", "El Salvador", "El Salvador", "El Salvador", 44, 65);
			Insert("2024-SY", "Syrien", "Syria", "Syrie", "Szíria", "Siria", 25, 38);
			Insert("2024-TD", "Tschad", "Chad", "Tchad", "Murva", "Chad", 28, 42);
			Insert("2024-TG", "Togo", "Togo", "Togo", "Togo", "Ir", 26, 39);
			Insert("2024-TH", "Thailand", "Thailand", "Thaïlande", "Thaiföld", "Tailandia", 25, 38);
			Insert("2024-TJ", "Tadschikistan", "Tajikistan", "Tajikistan", "Tádzsikisztán", "Tayikistán", 18, 27);
			Insert("2024-TM", "Turkmenistan", "Turkmenistan", "Turkmenistan", "Turkmenistan", "Turkmenistán", 22, 33);
			Insert("2024-TN", "Tunesien", "Tunisia", "Tunisia", "Tunézia", "Túnez", 27, 40);
			Insert("2024-TO", "Tonga", "Tonga", "Tonga", "Tonga", "Tonga", 26, 39);
			Insert("2024-TR", "Türkei (im Übrigen)", "Turkey (remaining)", "Turquie (restant)", "Törökország (fennmaradó)", "Turquía (restante)", 17, 26);
			Insert("2024-TR-ISTANBUL", "Türkei (Istanbul)", "Turkey (Istanbul)", "Turquie (Istanbul)", "Törökország (Isztambul)", "Turquía (Estambul)", 17, 26);
			Insert("2024-TR-IZMIR", "Türkei (Izmir)", "Turkey (Izmir)", "Turquie (Izmir)", "Törökország (Izmir)", "Turquía (Esmirna)", 20, 29);
			Insert("2024-TT", "Trinidad und Tobago", "Trinidad and Tobago", "Trinité et Tobago", "Trinidad és Tobago", "Trinidad y Tobago", 44, 66);
			Insert("2024-TW", "Taiwan", "Taiwan", "Taiwan", "Taiwan", "Taiwán", 31, 46);
			Insert("2024-TZ", "Tansania", "Tanzania", "Tanzanie", "Tanzania", "Tanzania", 29, 44);
			Insert("2024-UA", "Ukraine", "Ukraine", "Ukraine", "Ukrajna", "Ucrania", 17, 26);
			Insert("2024-UG", "Uganda", "Uganda", "Ouganda", "Uganda", "Uganda", 28, 41);
			Insert("2024-US", "USA (im Übrigen)", "USA (remaining)", "USA (restant)", "USA (fennmaradó)", "Estados Unidos (restante)", 40, 59);
			Insert("2024-US-ATLANTA", "USA (Atlanta)", "USA (Atlanta)", "USA (Atlanta)", "USA (Atlanta)", "Estados Unidos (Atlanta)", 52, 77);
			Insert("2024-US-BOSTON", "USA (Boston)", "USA (Boston)", "USA (Boston)", "USA (Boston)", "Estados Unidos (Bostón)", 42, 63);
			Insert("2024-US-CHICAGO", "USA (Chicago)", "USA (Chicago)", "USA (Chicago)", "USA (Chicago)", "Estados Unidos (Chicago)", 44, 65);
			Insert("2024-US-HOUSTON", "USA (Houston)", "USA (Houston)", "USA (Houston)", "USA (Houston)", "Estados Unidos (Houston)", 41, 62);
			Insert("2024-US-LOSANGELES", "USA (Los Angeles)", "USA (Los Angeles)", "USA (Los Angeles)", "USA (Los Angeles)", "Estados Unidos (Los Ángeles)", 43, 64);
			Insert("2024-US-MIAMI", "USA (Miami)", "USA (Miami)", "USA (Miami)", "USA (Miami)", "Estados Unidos (Miami)", 44, 65);
			Insert("2024-US-NEWYORKCITY", "USA (New York City)", "USA (New York City)", "Etats-Unis (New York City)", "USA (New York City)", "Estados Unidos (Nueva York)", 44, 66);
			Insert("2024-US-SANFRANCISCO", "USA (San Francisco)", "USA (San Francisco)", "États-Unis (San Francisco)", "USA (San Francisco)", "Estados Unidos (San Francisco)", 40, 59);
			Insert("2024-UY", "Uruguay", "Uruguay", "Uruguay", "Uruguay", "Uruguay", 32, 48);
			Insert("2024-UZ", "Usbekistan", "Uzbekistan", "Uzbekistan", "Üzbegisztán", "Uzbekistán", 23, 34);
			Insert("2024-VA", "Vatikanstadt", "Vatican city", "Cité du vatican", "Vatikán város", "Ciudad del Vaticano", 32, 48);
			Insert("2024-VC", "St. Vincent und die Grenadinen", "St. Vincent and the Grenadines", "Saint Vincent et les Grenadines", "Szent Vincent és a Grenadine-szigetek", "San Vicente y las Granadinas", 30, 45);
			Insert("2024-VE", "Venezuela", "Venezuela", "Venezuela", "Venezuela", "Venezuela", 30, 45);
			Insert("2024-VN", "Vietnam", "Vietnam", "Viêt-Nam", "Vietnam", "Vietnam", 28, 41);
			Insert("2024-WS", "Samoa", "Samoa", "Samoa", "Szamoa", "Samoa", 26, 39);
			Insert("2024-XK", "Kosovo", "Kosovo", "Kosovo", "Koszovó", "Kosovo", 16, 24);
			Insert("2024-YE", "Jemen", "Yemen", "Yémen", "Jemen", "Yemen", 16, 24);
			Insert("2024-ZA", "Südafrika (im Übrigen)", "South Africa (remaining)", "Afrique du Sud (restant)", "Dél-Afrika (fennmaradó)", "Sudáfrica (restante)", 20, 29);
			Insert("2024-ZA-CAPETOWN", "Südafrika (Kapstadt)", "South Africa (Cape Town)", "Afrique du Sud (Cape Town)", "Dél-Afrika (Fokváros)", "Sudáfrica (Ciudad del Cabo)", 22, 33);
			Insert("2024-ZA-JOHANNESBURG", "Südafrika (Johannesburg)", "South Africa (Johannesburg)", "Afrique du Sud (Johannesburg)", "Dél-Afrika (Johannesburg)", "Sudáfrica (Johannesburgo)", 24, 36);
			Insert("2024-ZM", "Sambia", "Zambia", "Zambie", "Zambia", "Zambia", 25, 38);
			Insert("2024-ZW", "Simbabwe", "Zimbabwe", "Zimbabwe", "Zimbabwe", "Zimbabue", 30, 45);
			var helper = new UnicoreMigrationHelper(Database);
			helper.AddOrUpdateEntityAuthDataColumn<PerDiemAllowance>("LU", "PerDiemAllowance");
		}

		private void Insert(string value, string nameDe, string nameEn, string nameFr, string nameHu, string nameEs, decimal partialDayAmount, decimal allDayAmount, bool favorite = false, int sortOrder = 1000)
		{
			string year = value.Split('-')[0];
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameDe}', 'de', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameEn}', 'en', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameFr}', 'fr', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameHu}', 'hu', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameEs}', 'es', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
		}
	}
}
