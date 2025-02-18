namespace Crm.PerDiem.Germany.Database
{
	using System.Data;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20211206133400)]
	public class UpdateTableLuPerDiemAllowance2022 : Migration
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

			Insert("2022-DE", "Deutschland", "Germany", "Allemagne", "Németország", 14, 28, true);
			Insert("2022-AT", "Österreich ", "Austria", "Autriche", "Ausztria", 27, 40, sortOrder: 1);
			Insert("2022-CH-GENEVA", "Schweiz (Genf)", "Switzerland (Geneva)", "Suisse (Genève)", "Svájc (Genf)", 44, 66, sortOrder: 2);
			Insert("2022-CH", "Schweiz (im Übrigen)", "Switzerland (remaining)", "Suisse (restant)", "Svájc (fennmaradó)", 43, 64, sortOrder: 3);
			Insert("2022-AD", "Andorra", "Andorra", "Andorre", "Andorra", 28, 41);
			Insert("2022-AE", "Vereinigte Arabische Emirate", "United Arab Emirates", "Emirats Arabes Unis", "Egyesült Arab Emírségek", 44, 65);
			Insert("2022-AF", "Afghanistan", "Afghanistan", "Afghanistan", "Afganisztán", 20, 30);
			Insert("2022-AG", "Antigua und Barbuda", "Antigua and Barbuda", "Antigua et Barbuda", "Antigua és Barbuda", 30, 45);
			Insert("2022-AL", "Albanien", "Albania", "Albanie", "Albánia", 18, 27);
			Insert("2022-AM", "Armenien", "Armenia", "Arménie", "Örményország", 16, 24);
			Insert("2022-AO", "Angola", "Angola", "Angola", "Angola", 35, 52);
			Insert("2022-AR", "Argentinien", "Argentina", "Argentine", "Argentína", 24, 35);
			Insert("2022-AU", "Australien (im Übrigen)", "Australia (remaining)", "Australie (restant)", "Ausztrália (fennmaradó)", 34, 51);
			Insert("2022-AU-CANBERRA", "Australien (Canberra)", "Australia (Canberra)", "Australie (Canberra)", "Ausztrália (Canberra)", 34, 51);
			Insert("2022-AU-SYDNEY", "Australien (Sydney)", "Australia (Sydney)", "Australie", "Ausztrália (Sydney)", 45, 68);
			Insert("2022-AZ", "Aserbaidschan", "Azerbaijan", "Azerbaïdjan", "Azerbajdzsán", 20, 30);
			Insert("2022-BA", "Bosnien und Herzegowina", "Bosnia and Herzegovina", "Bosnie et Herzégovine", "Bosznia és Hercegovina", 16, 23);
			Insert("2022-BB", "Barbados", "Barbados", "Barbade", "Barbados", 35, 52);
			Insert("2022-BD", "Bangladesch", "Bangladesh", "Bangladesh", "Bangladesben", 33, 50);
			Insert("2022-BE", "Belgien", "Belgium", "Belgique", "Belgium", 28, 42);
			Insert("2022-BF", "Burkina Faso", "Burkina Faso", "Burkina Faso", "Burkina Faso", 25, 38);
			Insert("2022-BG", "Bulgarien", "Bulgaria", "Bulgarie", "Bulgária", 15, 22);
			Insert("2022-BH", "Bahrain", "Bahrain", "Bahrain", "Bahrain", 30, 45);
			Insert("2022-BI", "Burundi", "Burundi", "Burundi", "Burundi", 24, 36);
			Insert("2022-BJ", "Benin", "Benin", "Bénin", "Benin", 35, 52);
			Insert("2022-BN", "Brunei", "Brunei", "Brunei", "Brunei", 35, 52);
			Insert("2022-BO", "Bolivien", "Bolivia", "Bolivie", "Bolívia", 20, 30);
			Insert("2022-BR", "Brasilien (im Übrigen)", "Brazil (remaining)", "Brésil (restant)", "Brazília (fennmaradó)", 34, 51);
			Insert("2022-BR-BRASILIA", "Brasilien (Brasilia)", "Brazil (Brasilia)", "Brésil (Brasilia)", "Brazília (Brazília)", 38, 57);
			Insert("2022-BR-RIODEJANEIRO", "Brasilien (Rio de Janeiro)", "Brazil (Rio de Janeiro)", "Brésil (Rio de Janeiro)", "Brazília (Rio de Janeiro)", 38, 57);
			Insert("2022-BR-SAOPAULO", "Brasilien (Sao Paulo)", "Brazil (Sao Paulo)", "Brésil (Sao Paulo)", "Brazília (Sao Paulo)", 36, 53);
			Insert("2022-BW", "Botsuana", "Botswana", "Botswana", "Botswana", 31, 46);
			Insert("2022-BY", "Weißrussland", "Belarus", "Belarus", "Belarus", 13, 20);
			Insert("2022-CA", "Kanada (im Übrigen)", "Canada (remaining)", "Canada (restant)", "Kanada (fennmaradó)", 32, 47);
			Insert("2022-CA-OTTAWA", "Kanada (Ottawa)", "Canada (Ottawa)", "Canada (Ottawa)", "Kanada (Ottawa)", 32, 47);
			Insert("2022-CA-TORONTO", "Kanada (Toronto)", "Canada (Toronto)", "Canada (Toronto)", "Kanada (Toronto)", 34, 51);
			Insert("2022-CA-VANCOUVER", "Kanada (Vancouver)", "Canada (Vancouver)", "Canada (Vancouver)", "Kanada (Vancouver)", 33, 50);
			Insert("2022-CD", "Kongo, Demokratische Republik", "Congo, Democratic Republic", "Congo, République Démocratique", "Kongói Demokratikus Köztársaság", 47, 70);
			Insert("2022-CF", "Zentralafrikanische Republik", "Central African Republic", "République centrafricaine", "Közép-afrikai Köztársaság", 31, 46);
			Insert("2022-CG", "Kongo, Republik", "Congo, Republic", "Congo, République", "Kongó, Köztársaság", 41, 62);
			Insert("2022-CI", "Republik Côte d’Ivoire", "Republic of Côte d’Ivoire", "République de Côte d’Ivoire", "Elefántcsontparti Köztársaság", 34, 51);
			Insert("2022-CL", "Chile", "Chile", "Chili", "Chile", 29, 44);
			Insert("2022-CM", "Kamerun", "Cameroon", "Cameroun", "Kamerun", 33, 50);
			Insert("2022-CN", "China (im Übrigen)", "China (remaining)", "Chine (restant)", "Kína (fennmaradó)", 32, 48);
			Insert("2022-CN-BEIJING", "China (Peking)", "China (Beijing)", "Chine (Beijing)", "Kína (Peking)", 20, 30);
			Insert("2022-CN-CHENGDU", "China (Chengdu)", "China (Chengdu)", "Chine (Chengdu)", "Kína (Chengdu)", 28, 41);
			Insert("2022-CN-GUANGZHOU", "China (Kanton)", "China (Canton)", "Chine (Canton)", "Kína (Canton)", 24, 36);
			Insert("2022-CN-HONGKONG", "China (Hongkong)", "China (Hong Kong)", "Chine (Hong Kong)", "Kína (Hong Kong)", 49, 74);
			Insert("2022-CN-SHANGHAI", "China (Shanghai)", "China (Shanghai)", "Chine (Shanghai)", "Kína (Sanghaj)", 39, 58);
			Insert("2022-CO", "Kolumbien", "Colombia", "Colombie", "Colombia", 31, 46);
			Insert("2022-CR", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", 32, 47);
			Insert("2022-CU", "Kuba", "Cuba", "Cuba", "Kuba", 31, 46);
			Insert("2022-CV", "Kap Verde", "Cape Verde", "Cap Vert", "Zöld-foki Köztársaság", 20, 30);
			Insert("2022-CY", "Zypern", "Cyprus", "Chypre", "Ciprus", 30, 45);
			Insert("2022-CZ", "Tschechische Republik", "Czech Republic", "République Tchèque", "Cseh Köztársaság", 24, 35);
			Insert("2022-DJ", "Dschibuti", "Djibouti", "Djibouti", "Djibouti", 44, 65);
			Insert("2022-DK", "Dänemark", "Denmark", "Danemark", "Dánia", 39, 58);
			Insert("2022-DM", "Dominica", "Dominica", "Dominica", "Dominika", 30, 45);
			Insert("2022-DO", "Dominikanische Republik", "Dominican Republic", "République Dominicaine", "Dominikai Köztársaság", 30, 45);
			Insert("2022-DZ", "Algerien", "Algeria", "Algérie", "Algéria", 34, 51);
			Insert("2022-EC", "Ecuador", "Ecuador", "Equateur", "Ecuador", 29, 44);
			Insert("2022-EE", "Estland", "Estonia", "Estonie", "Észtország", 20, 29);
			Insert("2022-EG", "Ägypten", "Egypt", "Egypte", "Egyiptom", 28, 41);
			Insert("2022-ER", "Eritrea", "Eritrea", "Érythrée", "Eritrea", 33, 50);
			Insert("2022-ES", "Spanien (im Übrigen)", "Spain (remaining)", "Espagne (restant)", "Spanyolország (fennmaradó)", 23, 34);
			Insert("2022-ES-BARCELONA", "Spanien (Barcelona)", "Spain (Barcelona)", "Espagne (Barcelone)", "Spanyolország (Barcelona)", 23, 34);
			Insert("2022-ES-CANARYISLANDS", "Spanien (Kanarische Inseln)", "Spain (Canary Islands)", "Espagne (îles Canaries)", "Spanyolország (Kanári-szigetek)", 27, 40);
			Insert("2022-ES-MADRID", "Spanien (Madrid)", "Spain (Madrid)", "Espagne (Madrid)", "Spanyolország (Madrid)", 27, 40);
			Insert("2022-ES-PALMADEMALLORCA", "Spanien (Palma de Mallorca)", "Spain (Palma de Mallorca)", "Espagne (Palma de Majorque)", "Spanyolország (Palma de Mallorca)", 24, 35);
			Insert("2022-ET", "Äthiopien", "Ethiopia", "Ethiopie", "Etiópia", 26, 39);
			Insert("2022-FI", "Finnland", "Finland", "Finlande", "Finnország", 33, 50);
			Insert("2022-FJ", "Fidschi", "Fiji", "Fidji", "Fidzsi-szigetek", 23, 34);
			Insert("2022-FM", "Mikronesien", "Micronesia", "Micronésie", "Mikronézia", 22, 33);
			Insert("2022-FR", "Frankreich (im Übrigen)", "France (remaining)", "France (restant)", "Franciaország (fennmaradó)", 29, 44);
			Insert("2022-FR-LYON", "Frankreich (Lyon)", "France (Lyon)", "France", "Franciaországban (Lyon)", 36, 53);
			Insert("2022-FR-MARSEILLE", "Frankreich (Marseille)", "France (Marseilles)", "France (Marseille)", "Franciaország (Marseille)", 31, 46);
			Insert("2022-FR-PARIS", "Frankreich (Paris)", "France (Paris)", "France (Paris)", "Franciaország (Párizs)", 39, 58);
			Insert("2022-FR-STRASBOURG", "Frankreich (Straßburg)", "France (Strasbourg)", "France (Strasbourg)", "Franciaország (Strasbourg)", 34, 51);
			Insert("2022-GA", "Gabun", "Gabon", "Gabon", "Gabon", 35, 52);
			Insert("2022-GB", "Großbrit. u. Nordirland (im Übrigen)", "Great Britain and Northern Ireland (remaining)", "Grande-Bretagne et Irlande du Nord (restant)", "Nagy-Britannia és Észak-Írország (fennmaradó)", 30, 45);
			Insert("2022-GB-LONDON", "Großbrit. u. Nordirland  (London)", "Great Britain and Northern Ireland (London)", "Grande-Bretagne et Irlande du Nord (Londres)", "Nagy-Britannia és Észak-Írország (London)", 41, 62);
			Insert("2022-GD", "Grenada", "Grenada", "Grenada", "Grenada", 30, 45);
			Insert("2022-GE", "Georgien", "Georgia", "Géorgie", "Grúzia", 24, 35);
			Insert("2022-GH", "Ghana", "Ghana", "Ghana", "Ghána", 31, 46);
			Insert("2022-GM", "Gambia", "Gambia", "Gambie", "Gambia", 27, 40);
			Insert("2022-GN", "Guinea", "Guinea", "Guinée", "Guinea", 31, 46);
			Insert("2022-GQ", "Äquatorialguinea", "Equatorial Guinea", "Guinée équatoriale", "Egyenlítői-Guinea", 24, 36);
			Insert("2022-GR", "Griechenland (im Übrigen)", "Greece (remaining)", "Grèce (restant)", "Görögország (fennmaradó)", 24, 36);
			Insert("2022-GR-ATHENS", "Griechenland (Athen)", "Greece (Athens)", "Grèce (Athènes)", "Görögország (Athén)", 31, 46);
			Insert("2022-GT", "Guatemala", "Guatemala", "Guatemala", "Guatemala", 23, 34);
			Insert("2022-GW", "Guinea-Bissau", "Guinea-Bissau", "Guinée-Bissau", "Bissau-Guinea", 16, 24);
			Insert("2022-GY", "Guyana", "Guyana", "Guyane", "Guyana", 30, 45);
			Insert("2022-HN", "Honduras", "Honduras", "Honduras", "Honduras", 32, 48);
			Insert("2022-HR", "Kroatien", "Croatia", "Croatie", "Horvátország", 24, 35);
			Insert("2022-HT", "Haiti", "Haiti", "Haïti", "Haiti", 39, 58);
			Insert("2022-HU", "Ungarn", "Hungary", "Hongrie", "Magyarország", 15, 22);
			Insert("2022-ID", "Indonesien", "Indonesia", "Indonésie", "Indonézia", 25, 38);
			Insert("2022-IE", "Irland", "Ireland", "Irlande", "Írország", 39, 58);
			Insert("2022-IL", "Israel", "Israel", "Israël", "Izrael", 44, 66);
			Insert("2022-IN", "Indien (im Übrigen)", "India (remaining)", "Inde (restant)", "India (fennmaradó)", 21, 32);
			Insert("2022-IN-CHENNAI", "Indien (Chennai)", "India (Chennai)", "Inde (Chennai)", "India (Chennai)", 21, 32);
			Insert("2022-IN-KOLKATA", "Indien (Kalkutta)", "India (Calcutta)", "Inde (Calcutta)", "India (Kalkutta)", 24, 35);
			Insert("2022-IN-MUMBAI", "Indien (Mumbai)", "India (Mumbai)", "Inde (Mumbai)", "India (Mumbai)", 33, 50);
			Insert("2022-IN-NEWDELHI", "Indien (Neu Delhi)", "India (New Delhi)", "Inde (New Delhi)", "India (Újdelhi)", 25, 38);
			Insert("2022-IR", "Iran", "Iran", "Iran", "Irán", 22, 33);
			Insert("2022-IS", "Island", "Iceland", "Islande", "Izland", 32, 47);
			Insert("2022-IT", "Italien (im Übrigen)", "Italy (remaining)", "Italie (restant)", "Olaszország (fennmaradó)", 27, 40);
			Insert("2022-IT-MILAN", "Italien (Mailand)", "Italy (Milan)", "Italie (Milan)", "Olaszország (Milánó)", 30, 45);
			Insert("2022-IT-ROME", "Italien (Rom)", "Italy (Rome)", "Italie (Rome)", "Olaszország (Róma)", 27, 40);
			Insert("2022-JM", "Jamaika", "Jamaica", "Jamaïque", "Jamaica", 38, 57);
			Insert("2022-JO", "Jordanien", "Jordan", "Jordanie", "Jordánia", 31, 46);
			Insert("2022-JP", "Japan (im Übrigen)", "Japan (remaining)", "Japon (restant)", "Japán (fennmaradó)", 35, 52);
			Insert("2022-JP-TOKYO", "Japan (Tokio)", "Japan (Tokyo)", "Japon (Tokyo)", "Japán (Tokió)", 44, 66);
			Insert("2022-KE", "Kenia", "Kenya", "Kenya", "Kenya", 34, 51);
			Insert("2022-KG", "Kirgisistan", "Kyrgyzstan", "Kyrgyzstan", "Kirgizisztán", 18, 27);
			Insert("2022-KH", "Kambodscha", "Cambodia", "Cambodge", "Kambodzsa", 25, 38);
			Insert("2022-KN", "St. Kitts und Nevis", "St. Kitts and Nevis", "Saint-Kitts-et-Nevis", "St. Kitts és Nevis", 30, 45);
			Insert("2022-KP", "Korea, Demokratische Volksrepublik", "Korea, Democratic People’s Republic", "Corée, République populaire démocratique", "Koreai Demokratikus Népköztársaság", 19, 28);
			Insert("2022-KR", "Korea, Republik", "Korea, Republic", "Corée, République", "Koreai Köztársaság", 32, 48);
			Insert("2022-KW", "Kuwait", "Kuwait", "Koweit", "Kuvait", 37, 56);
			Insert("2022-KZ", "Kasachstan", "Kazakhstan", "kazakhstan", "Kazahsztán", 30, 45);
			Insert("2022-LA", "Laos", "Laos", "Laos", "Laosz", 22, 33);
			Insert("2022-LB", "Libanon", "Lebanon", "Liban", "Libanon", 40, 59);
			Insert("2022-LC", "St. Lucia", "St. Lucia", "Sainte Lucie", "St. Lucia", 30, 45);
			Insert("2022-LI", "Liechtenstein", "Liechtenstein", "Liechtenstein", "Liechtenstein", 37, 56);
			Insert("2022-LK", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Srí Lanka", 28, 42);
			Insert("2022-LS", "Lesotho", "Lesotho", "Lesotho", "Lesotho", 16, 24);
			Insert("2022-LT", "Litauen", "Lithuania", "Lituanie", "Litvánia", 17, 26);
			Insert("2022-LU", "Luxemburg", "Luxembourg", "Luxembourg", "Luxemburg", 32, 47);
			Insert("2022-LV", "Lettland", "Latvia", "Lettonie", "Lettország", 24, 35);
			Insert("2022-LY", "Libyen", "Libya", "Libye", "Líbia", 42, 63);
			Insert("2022-MA", "Marokko", "Morocco", "Maroc", "Marokkó", 28, 42);
			Insert("2022-MC", "Monaco", "Monaco", "Monaco", "Monaco", 28, 42);
			Insert("2022-MD", "Moldau, Republik", "Moldova, Republic", "Moldavie, République", "Moldova, Köztársaság", 16, 24);
			Insert("2022-ME", "Montenegro", "Montenegro", "Monténégro", "Montenegró", 20, 29);
			Insert("2022-MG", "Madagaskar", "Madagascar", "Madagascar", "Madagaszkár", 23, 34);
			Insert("2022-MH", "Marshall Inseln", "Marshall Islands", "Iles Marshall", "Marshall-szigetek", 42, 63);
			Insert("2022-MK", "Mazedonien", "Macedonia", "Macédoine", "Macedónia", 20, 29);
			Insert("2022-ML", "Mali", "Mali", "Mali", "Mali", 25, 38);
			Insert("2022-MM", "Myanmar", "Myanmar", "Myanmar", "Myanmar", 24, 35);
			Insert("2022-MN", "Mongolei", "Mongolia", "Mongolie", "Mongólia", 18, 27);
			Insert("2022-MR", "Mauretanien", "Mauritania", "Mauritanie", "Mauritánia", 26, 39);
			Insert("2022-MT", "Malta", "Malta", "Malte", "Málta", 31, 46);
			Insert("2022-MU", "Mauritius", "Mauritius", "Ile Maurice", "Mauritius", 36, 54);
			Insert("2022-MV", "Malediven", "Maldives", "Maldives", "Maldív", 35, 52);
			Insert("2022-MW", "Malawi", "Malawi", "Malawi", "Malawi", 32, 47);
			Insert("2022-MX", "Mexiko", "Mexico", "Mexique", "Mexikó", 32, 48);
			Insert("2022-MY", "Malaysia", "Malaysia", "Malaisie", "Malaysia", 23, 34);
			Insert("2022-MZ", "Mosambik", "Mozambique", "Mozambique", "Mozambik", 25, 38);
			Insert("2022-NA", "Namibia", "Namibia", "Namibie", "Namíbia", 20, 30);
			Insert("2022-NE", "Niger", "Niger", "Niger", "Niger", 28, 42);
			Insert("2022-NG", "Nigeria", "Nigeria", "Nigeria", "Nigéria", 31, 46);
			Insert("2022-NI", "Nicaragua", "Nicaragua", "Nicaragua", "Nicaragua", 24, 36);
			Insert("2022-NL", "Niederlande", "Netherlands", "Pays-Bas", "Hollandia", 32, 47);
			Insert("2022-NO", "Norwegen", "Norway", "Norvège", "Norvégia", 53, 80);
			Insert("2022-NP", "Nepal", "Nepal", "Népal", "Nepál", 24, 36);
			Insert("2022-NZ", "Neuseeland", "New Zealand", "Nouvelle zélande", "Új-Zéland", 37, 56);
			Insert("2022-OM", "Oman", "Oman", "Oman", "Omán", 40, 60);
			Insert("2022-PA", "Panama", "Panama", "Panama", "Panama", 26, 39);
			Insert("2022-PE", "Peru", "Peru", "Pérou", "Peru", 23, 34);
			Insert("2022-PG", "Papua-Neuguinea", "Papua New Guinea", "Papouasie Nouvelle Guinée", "Pápua Új-Guinea", 40, 60);
			Insert("2022-PH", "Philippinen", "Philippines", "Philippines", "Fülöp-szigetek", 22, 33);
			Insert("2022-PK", "Pakistan (im Übrigen)", "Pakistan (remaining)", "Pakistan (restant)", "Pakisztán (fennmaradó)", 23, 24);
			Insert("2022-PK-ISLAMABAD", "Pakistan (Islamabad)", "Pakistan (Islamabad)", "Pakistan (Islamabad)", "Pakisztán (Islamabad)", 16, 23);
			Insert("2022-PL", "Polen (im Übrigen)", "Poland (remaining)", "Pologne (restant)", "Lengyelország (fennmaradó)", 20, 29);
			Insert("2022-PL-GDANSK", "Polen (Danzig)", "Poland (Gdansk)", "Pologne (Gdansk)", "Lengyelország (Gdansk)", 20, 30);
			Insert("2022-PL-KRAKOW", "Polen (Krakau)", "Poland (Krakow)", "Pologne (Cracovie)", "Lengyelország (Krakkó)", 18, 27);
			Insert("2022-PL-WARSAW", "Polen (Warschau)", "Poland (Warsaw)", "Pologne", "Lengyelországban (Varsó)", 20, 29);
			Insert("2022-PL-WROCLAW", "Polen (Breslau)", "Poland (Wroclaw)", "Pologne (Wroclaw)", "Lengyelország (Wroclaw)", 22, 33);
			Insert("2022-PT", "Portugal", "Portugal", "Portugal", "Portugália", 24, 36);
			Insert("2022-PW", "Palau", "Palau", "Palau", "Palau", 34, 51);
			Insert("2022-PY", "Paraguay", "Paraguay", "Paraguay", "Paraguay", 25, 38);
			Insert("2022-QA", "Katar", "Qatar", "Qatarien", "Katar", 37, 56);
			Insert("2022-RO", "Rumänien (im Übrigen)", "Romania (remaining)", "Roumanie (restant)", "Románia (fennmaradó)", 18, 27);
			Insert("2022-RO-BUCHAREST", "Rumänien (Bukarest)", "Romania (Bucharest)", "Roumanie (Bucarest)", "Románia (Bukarest)", 21, 32);
			Insert("2022-RS", "Serbien", "Serbia", "Serbie", "Szerbia", 13, 20);
			Insert("2022-RU", "Russland (im Übrigen)", "Russia (remaining)", "Russie (restant)", "Oroszország (fennmaradó)", 16, 24);
			Insert("2022-RU-MOSCOW", "Russland (Moskau)", "Russia (Moscow)", "Russie (Moscou)", "Oroszország (Moszkva)", 20, 30);
			Insert("2022-RU-SAINTPETERSBURG", "Russland (St. Petersburg)", "Russia (St. Petersburg)", "Russie (Saint-Pétersbourg)", "Oroszország (Szentpétervár)", 17, 26);
			Insert("2022-RU-YEKATERINBURG", "Russland (Jekatarinburg)", "Russia (Jekatarinburg)", "Russie (Jekatarinburg)", "Oroszország (Jekatarinburg)", 19, 28);
			Insert("2022-RW", "Ruanda", "Rwanda", "Rwanda", "Rwanda", 31, 46);
			Insert("2022-SA", "Saudi-Arabien (im Übrigen)", "Saudi Arabia (remaining)", "Arabie saoudite (restant)", "Szaúd-Arábia (fennmaradó)", 32, 48);
			Insert("2022-SA-JEDDAH", "Saudi-Arabien (Djidda)", "Saudi Arabia (Jeddah)", "Arabie Saoudite (Jeddah)", "Szaúd-Arábia (Jeddah)", 25, 38);
			Insert("2022-SA-RIYADH", "Saudi-Arabien (Riad)", "Saudi Arabia (Riyadh)", "Arabie saoudite (Riyad)", "Szaúd-Arábia (Rijád)", 32, 48);
			Insert("2022-SD", "Sudan", "Sudan", "Soudan", "Szudán", 22, 33);
			Insert("2022-SE", "Schweden", "Sweden", "Sweden", "Svédország", 33, 50);
			Insert("2022-SG", "Singapur", "Singapore", "Singapour", "Singapore", 36, 54);
			Insert("2022-SI", "Slowenien", "Slovenia", "Slovénie", "Szlovénia", 22, 33);
			Insert("2022-SK", "Slowakische Republik", "Slovak Republic", "République slovaque", "Szlovák Köztársaság", 16, 24);
			Insert("2022-SL", "Sierra Leone", "Sierra Leone", "Sierra Leone", "Sierra Leone", 32, 48);
			Insert("2022-SM", "San Marino", "San Marino", "Saint-Marin", "San Marino", 23, 34);
			Insert("2022-SN", "Senegal", "Senegal", "Sénégal", "Szenegál", 28, 42);
			Insert("2022-SR", "Suriname", "Suriname", "Suriname", "Suriname", 30, 45);
			Insert("2022-SS", "Südsudan", "South Sudan", "Soudan du Sud", "Dél-Szudán", 23, 34);
			Insert("2022-ST", "São Tomé – Príncipe", "Sao Tome - Principe", "Sao Tomé - Principe", "Sao Tome - Principe", 32, 47);
			Insert("2022-SV", "El Salvador", "El Salvador", "El Salvador", "El Salvador", 29, 44);
			Insert("2022-SY", "Syrien", "Syria", "Syrie", "Szíria", 25, 38);
			Insert("2022-TD", "Tschad", "Chad", "Tchad", "Murva", 43, 64);
			Insert("2022-TG", "Togo", "Togo", "Togo", "Togo", 26, 39);
			Insert("2022-TH", "Thailand", "Thailand", "Thaïlande", "Thaiföld", 25, 38);
			Insert("2022-TJ", "Tadschikistan", "Tajikistan", "Tajikistan", "Tádzsikisztán", 18, 27);
			Insert("2022-TM", "Turkmenistan", "Turkmenistan", "Turkmenistan", "Turkmenistan", 22, 33);
			Insert("2022-TN", "Tunesien", "Tunisia", "Tunisia", "Tunézia", 27, 40);
			Insert("2022-TO", "Tonga", "Tonga", "Tonga", "Tonga", 26, 39);
			Insert("2022-TR", "Türkei (im Übrigen)", "Turkey (remaining)", "Turquie (restant)", "Törökország (fennmaradó)", 17, 26);
			Insert("2022-TR-ISTANBUL", "Türkei (Istanbul)", "Turkey (Istanbul)", "Turquie (Istanbul)", "Törökország (Isztambul)", 17, 26);
			Insert("2022-TR-IZMIR", "Türkei (Izmir)", "Turkey (Izmir)", "Turquie (Izmir)", "Törökország (Izmir)", 20, 29);
			Insert("2022-TT", "Trinidad und Tobago", "Trinidad and Tobago", "Trinité et Tobago", "Trinidad és Tobago", 30, 45);
			Insert("2022-TW", "Taiwan", "Taiwan", "Taiwan", "Taiwan", 31, 46);
			Insert("2022-TZ", "Tansania", "Tanzania", "Tanzanie", "Tanzania", 32, 47);
			Insert("2022-UA", "Ukraine", "Ukraine", "Ukraine", "Ukrajna", 17, 26);
			Insert("2022-UG", "Uganda", "Uganda", "Ouganda", "Uganda", 28, 41);
			Insert("2022-US", "USA (im Übrigen)", "USA (remaining)", "USA (restant)", "USA (fennmaradó)", 34, 51);
			Insert("2022-US-ATLANTA", "USA (Atlanta)", "USA (Atlanta)", "USA (Atlanta)", "USA (Atlanta)", 41, 62);
			Insert("2022-US-BOSTON", "USA (Boston)", "USA (Boston)", "USA (Boston)", "USA (Boston)", 39, 58);
			Insert("2022-US-CHICAGO", "USA (Chicago)", "USA (Chicago)", "USA (Chicago)", "USA (Chicago)", 36, 54);
			Insert("2022-US-HOUSTON", "USA (Houston)", "USA (Houston)", "USA (Houston)", "USA (Houston)", 42, 63);
			Insert("2022-US-LOSANGELES", "USA (Los Angeles)", "USA (Los Angeles)", "USA (Los Angeles)", "USA (Los Angeles)", 37, 56);
			Insert("2022-US-MIAMI", "USA (Miami)", "USA (Miami)", "USA (Miami)", "USA (Miami)", 43, 64);
			Insert("2022-US-NEWYORKCITY", "USA (New York City)", "USA (New York City)", "Etats-Unis (New York City)", "USA (New York City)", 39, 58);
			Insert("2022-US-SANFRANCISCO", "USA (San Francisco)", "USA (San Francisco)", "États-Unis (San Francisco)", "USA (San Francisco)", 34, 51);
			Insert("2022-US-WASHINGTONDC", "USA (Washington, D.C.)", "USA (Washington, D.C.)", "États-Unis (Washington, D.C.)", "USA (Washington, D.C.)", 41, 62);
			Insert("2022-UY", "Uruguay", "Uruguay", "Uruguay", "Uruguay", 32, 48);
			Insert("2022-UZ", "Usbekistan", "Uzbekistan", "Uzbekistan", "Üzbegisztán", 23, 34);
			Insert("2022-VA", "Vatikanstadt", "Vatican city", "Cité du vatican", "Vatikán város", 35, 52);
			Insert("2022-VC", "St. Vincent und die Grenadinen", "St. Vincent and the Grenadines", "Saint Vincent et les Grenadines", "Szent Vincent és a Grenadine-szigetek", 30, 45);
			Insert("2022-VE", "Venezuela", "Venezuela", "Venezuela", "Venezuela", 30, 45);
			Insert("2022-VN", "Vietnam", "Vietnam", "Viêt-Nam", "Vietnam", 28, 41);
			Insert("2022-WS", "Samoa", "Samoa", "Samoa", "Szamoa", 20, 29);
			Insert("2022-XK", "Kosovo", "Kosovo", "Kosovo", "Koszovó", 16, 23);
			Insert("2022-YE", "Jemen", "Yemen", "Yémen", "Jemen", 16, 24);
			Insert("2022-ZA", "Südafrika (im Übrigen)", "South Africa (remaining)", "Afrique du Sud (restant)", "Dél-Afrika (fennmaradó)", 15, 22);
			Insert("2022-ZA-CAPETOWN", "Südafrika (Kapstadt)", "South Africa (Cape Town)", "Afrique du Sud (Cape Town)", "Dél-Afrika (Fokváros)", 18, 27);
			Insert("2022-ZA-JOHANNESBURG", "Südafrika (Johannesburg)", "South Africa (Johannesburg)", "Afrique du Sud (Johannesburg)", "Dél-Afrika (Johannesburg)", 20, 29);
			Insert("2022-ZM", "Sambia", "Zambia", "Zambie", "Zambia", 24, 36);
			Insert("2022-ZW", "Simbabwe", "Zimbabwe", "Zimbabwe", "Zimbabwe", 30, 45);
		}

		private void Insert(string value, string nameDe, string nameEn, string nameFr, string nameHu, decimal partialDayAmount, decimal allDayAmount, bool favorite = false, int sortOrder = 1000)
		{
			string year = value.Split('-')[0];
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameDe}', 'de', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameEn}', 'en', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameFr}', 'fr', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
			Database.ExecuteNonQuery($"INSERT INTO LU.PerDiemAllowance (Value, Name, Language, AllDayAmount, PartialDayAmount, CurrencyKey, ValidFrom, ValidTo, Favorite, SortOrder) VALUES ('{value}', '{nameHu}', 'hu', {allDayAmount}, {partialDayAmount}, 'EUR', '{year}-01-01T00:00:00', '{year}-12-31T23:59:59', {(favorite ? "1" : "0")}, {sortOrder})");
		}
	}
}